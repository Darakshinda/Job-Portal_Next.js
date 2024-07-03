// pages/login.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { TextInput } from "../../stories/TextInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Please fill out this field");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please fill out this field");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      // Handle login logic here
      console.log("Form submitted");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with background image */}
      <div
        className="bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F3fde73c38faef18e5434cf9455ec5a40.cdn.bubble.io%2Ff1704732313963x218945147801060450%2FLogin%2520page%2520bg.png?w=2048&h=&auto=compress&dpr=1.25&fit=max')",
          backgroundRepeat: "no-repeat",
          width: "55%",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white pt-4 pr-4 pl-4 pb-12">
          <div className="absolute left-32 top-20 text-white text-4xl">
            <strong>CodeUnity</strong>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl">
              <strong>
                Tech hiring done <span style={{ color: "#c900af" }}>right</span>
              </strong>
            </h1>
            <h3 className="text-3xl text-center mt-4">
              Dream talent. Top companies. Building tomorrow.
            </h3>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-12 text-center">Login</h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email*
            </label>
            <TextInput
              keyy="email"
              cls={`w-full p-3 border rounded-lg focus:outline-none ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500`}
              placeholder="Enter your email"
              val={email}
              onChange={(key: string, value: string) => setEmail(value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password*
            </label>
            <TextInput
              keyy="password"
              cls={`w-full p-3 border rounded-lg focus:outline-none ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500`}
              placeholder="Enter your password"
              val={password}
              onChange={(key: string, value: string) => setPassword(value)}
              type="password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-6 flex justify-end">
            <p className="text-black-400 cursor-pointer">Forgot Password?</p>
          </div>
          <div className="justify-center text-center">
            <button
              className="w-1/4 bg-black text-white p-3 rounded-lg hover:bg-black-600 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <h2 className="mt-8 text-black-600">Don't have an account?</h2>
        <div className="flex mt-4 space-x-10">
          <Link href="/Signup-seeker">
          <button className="flex-1 bg-white border border-black rounded-lg text-black p-4 rounded-lg hover:border-pink-500 hover:bg-white transition duration-300 whitespace-nowrap">
            <div>
              <h2 className="text-lg font-bold">Explore Jobs</h2>
              <h5 className="text-sm text-gray-600">Signup as a Talent</h5>
            </div>
          </button>
          </Link>
          <Link href="/Signup-recruiter">
            <button className="flex-1 bg-white border border-black rounded-lg text-black p-4 rounded-lg hover:border-pink-500 hover:bg-white transition duration-300 whitespace-nowrap">
              <div>
                <h2 className="text-lg font-bold">Hire Talent</h2>
                <h5 className="text-sm text-gray-600">Signup as Recruiter</h5>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;