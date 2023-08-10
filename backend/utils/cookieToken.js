const jwt = require("jsonwebtoken");

const cookieToken = (user, res) => {
  // const token = getJwtToken(user.id);

  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Cannot create cookie" });
  }
};

module.exports = cookieToken;
