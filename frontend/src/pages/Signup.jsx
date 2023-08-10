import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the backend with the form data
    axios
      .post(`${BACKEND_URL}/api/user/signup`, formData)
      .then((response) => {
        console.log("response:", response);
        // Redirect to the homepage
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  return (
    <div className="h-screen bg-[#faf0fa] flex items-center justify-center">
      <div className="bg-[#FFDEDF] p-5 rounded-md lg:w-[40%] md:w-[70%] sm:w-[90%] xm:w[95%] ">
        <div className="text-center text-[35px] font-bold">Sign Up</div>
        <div className="flex flex-col gap-1 mt-10">
          <p className="font-semibold">Username</p>

          <input
            type="text"
            placeholder="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="rounded-md p-2 outline-none focus:shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <p className="font-semibold">Email</p>
          <input
            type="email"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="rounded-md p-2 outline-none focus:shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <p className="font-semibold">Password</p>
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="rounded-md p-2 outline-none focus:shadow-lg"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            className="text-center rounded-lg hover:scale-95 shadow-lg hover:shadow-xl p-3 bg-[#C76FCF] text-white text-[20px] font-semibold w-full transition-all duration-200"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-7 flex justify-center">
          <Link to="/login">
            <p className="cursor-pointer hover:underline">
              Already have an Account ?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
