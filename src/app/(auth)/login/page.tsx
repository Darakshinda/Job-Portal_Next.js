"use client";

import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/validator";
import LoginFormInput from "@/Components/Forms/LoginFormInput";
import { useRouter } from "next/navigation";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbBriefcaseFilled } from "react-icons/tb";
import { MdPersonSearch } from "react-icons/md";
import Cookies from "js-cookie";

type Schema = z.infer<typeof loginFormSchema>;

const Login = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const Router = useRouter();

  const signupLinks = [
    {
      title: "Explore Jobs",
      subtitle: "Signup as a Talent",
      href: "signup-seeker",
      icon: <MdPersonSearch size={24} className="text-indigo-600 inline" />,
    },
    {
      title: "Hire Talent",
      subtitle: "Signup as a Recruiter",
      href: "signup-recruiter",
      icon: <TbBriefcaseFilled size={22} className="text-indigo-600 inline" />,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: Schema) => {
    const { username, password } = data;
    // console.log(username, password);

    try {
      const response = await axios.post(`${baseurl}/accounts/login/`, {
        username,
        password,
      });

      const { access, refresh } = response.data;

      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Save the tokens in localStorage or cookies
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Show success message
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      // Redirect to the appropriate dashboard
      const axiosInstance = axios.create({
        baseURL: baseurl,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      axiosInstance
        .get("/accounts/profile")
        .then((response) => {
          localStorage.setItem("account_type", response.data.account_type);
          Cookies.set("token", access, {
            expires: expires,
            sameSite: "strict",
            httpOnly: false,
          });
          Cookies.set("account_type", response.data.account_type, {
            expires: expires,
            sameSite: "strict",
            httpOnly: false,
          });
          if (response.data.account_type === "job_seeker") {
            Router.push("/seeker-dashboard");
          } else {
            Router.push(`/dashboard`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen grid bg-login bg-cover bg-no-repeat bg-center md:py-8 md:px-12 sm:py-4 sm:px-6">
      <div className="flex-1 grid md:grid-flow-col md:grid-cols-[55%,45%] max-[400px]:border-2 border-[10px] border-white sm:rounded-[2rem] bg-transparent">
        {/* Left side with transparent background */}
        <div className="w-full h-full rounded-3xl overflow-hidden">
          <div className="h-full grid place-items-center bg-black bg-opacity-35 rounded-3xl overflow-hidden">
            <div className="flex flex-col sm:gap-10 gap-6 items-center justify-center w-full max-md:my-16 text-white font-Insomatte">
              <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl px-4 text-center">
                Tech hiring done <span className="text-[#c900af]">right</span>
              </h1>

              <div className="xl:text-3xl lg:text-2xl md:text-xl text-center w-full space-y-4 px-6">
                Dream talent. Top companies. Building tomorrow.
              </div>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col items-center justify-center lg:p-8 md:p-5 sm:p-4 p-3 bg-white">
          <h1 className="md:text-4xl text-3xl font-bold md:mb-2 max-md:my-6 font-Insomatte text-center capitalize text-gray-800 whitespace-nowrap">
            Welcome Back
          </h1>
          <p className="sm:text-sm text-xs md:mb-10 mb-6 text-gray-400">
            Enter your credentials to access your account
          </p>

          {/* Login form */}
          <form
            className="w-full max-w-lg space-y-5 xl:px-10 px-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LoginFormInput
              id="username"
              label="Username"
              type="text"
              register={register}
              errors={errors.username}
              name="username"
              placeholder="John Doe"
              icon={<FaUserAstronaut />}
              req={true}
              cls="peer py-3 px-4 ps-11 block w-full bg-gray-200 rounded-lg outline-none focus:outline-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none placeholder:text-gray-400"
            />

            <LoginFormInput
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors.password}
              name="password"
              placeholder="••••••••"
              icon={<RiLockPasswordLine />}
              req={true}
              cls="peer py-3 px-4 ps-11 block w-full bg-gray-200 rounded-lg outline-none focus:outline-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none placeholder:text-gray-400"
            />

            <div className="mt-2 block text-right">
              <Link
                href="/reset-password"
                className="text-primary-500 cursor-pointer hover:underline hover:text-primary-700 outline-none focus:outline-none focus-visible:underline focus-visible:text-primary-700 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="justify-center text-center">
              <button
                className="w-full bg-primary-700/85 font-RadioGrotesk tracking-wide text-white text-lg py-2 active:scale-90 hover:bg-primary-700 rounded-lg transition duration-150 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75 focus-visible:scale-95"
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <h2 className="mt-8 text-primary-500 font-semibold">
            Don&apos;t have an account?
          </h2>
          <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
            {signupLinks.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 group  relative w-52 h-12 whitespace-nowrap overflow-hidden"
                >
                  {link.icon}
                  <span className="inline-block w-full text-center text-base transform group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-300">
                    {link.title}
                  </span>
                  <span className="inline-block w-full text-center text-base opacity-0 transform -translate-x-full translate-y-full group-hover:text-sm group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    {link.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
