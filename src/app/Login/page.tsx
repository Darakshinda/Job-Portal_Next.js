// pages/login.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { TextInput } from "../../stories/TextInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const alreadyLoggedIn = async () => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (access_token && refresh_token) {
      const axiosInstance = axios.create({
        baseURL: baseurl,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      axiosInstance.get('/accounts/profile')
        .then((response) => {
          if (response.data.account_type === 'job_seeker') {
            router.push('/seeker-dashboard');
          } else {
            router.push(`/hirerDash/${response.data.first_name}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!username) {
      setUsernameError("Please fill out this field");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Please fill out this field");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await axios.post(`${baseurl}/accounts/login/`, {
          username,
          password
        });

        const { access, refresh } = response.data;

        // Save the tokens in localStorage or cookies
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Show success message
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 6000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          // Redirect to the homepage
          const axiosInstance = axios.create({
            baseURL: baseurl,
            headers: {
              Authorization: `Bearer ${access}`
            }
          })
          axiosInstance.get('/accounts/profile')
            .then((response) => {
              if (response.data.account_type === 'job_seeker') {
                router.push('/seeker-dashboard');
              } else {
                router.push(`/hirerDash/${response.data.first_name}`);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });

        console.log("Logged in successfully");
      } catch (error) {
        setAuthError("Invalid username or password");
      }
    }
  };

  useEffect(() => {
    alreadyLoggedIn();
  }, []);

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
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <TextInput
              keyy="username"
              cls={`w-full p-3 border rounded-lg focus:outline-none ${
                usernameError ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500`}
              placeholder="Enter your username"
              val={username}
              onChange={(key: string, value: string) => setUsername(value)}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
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
          {authError && (
            <p className="text-red-500 text-sm mb-4">{authError}</p>
          )}
          <div className="mb-6 flex justify-end">
            <Link href={'/reset-password'} className="text-black cursor-pointer">Forgot Password?</Link>
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
            <button className="flex-1 bg-white border border-black rounded-lg text-black p-4 hover:border-pink-500 hover:bg-white transition duration-300 whitespace-nowrap">
              <div>
                <h2 className="text-lg font-bold">Explore Jobs</h2>
                <h5 className="text-sm text-gray-600">Signup as a Talent</h5>
              </div>
            </button>
          </Link>
          <Link href="/Signup-recruiter">
            <button className="flex-1 bg-white border border-black rounded-lg text-black p-4 hover:border-pink-500 hover:bg-white transition duration-300 whitespace-nowrap">
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
