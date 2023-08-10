const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

const { connectDatabase } = require("./config/database");
connectDatabase();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoute");
const likeRoutes = require("./routes/likeRoute");
const authRoutes = require("./routes/authRoutes");
const { isLoggedIn } = require("./middlewares/isLoggedIn");

const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);

app.get("/auth", isLoggedIn, (req, res) => {
  res.json({ success: true, message: "You are authenticated", user: req.user });
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
