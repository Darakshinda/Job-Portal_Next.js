"use client";

import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { TextInput } from "@/stories/TextInput";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="min-h-screen flex bg-white md:flex-row flex-col">
      {/* Left side with background image */}
      <div className="flex-1 bg-login bg-cover bg-center ">
        <div className="flex items-center justify-center bg-black bg-opacity-30 text-white p-0 h-full">
          <div className="flex flex-col items-center justify-center w-full max-md:my-16">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-bold px-4 text-center">
              Tech hiring done <span className="text-[#c900af]">right</span>
            </h1>

            <div className="xl:text-3xl lg:text-2xl md:text-xl text-center mt-12 w-full space-y-4 px-6">
              Dream talent. Top companies. Building tomorrow.
              {/* <p className="text-left">
                Dream talent
              </p>
              <p className="text-center">
                Top companies
              </p>
              <p className="text-right">
                Build tomorrow
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex flex-col items-center justify-center sm:p-4 md:p-8 p-3">
        <h1 className="md:text-5xl text-3xl font-bold md:mb-12 max-md:my-6 text-center">
          Login
        </h1>

        {/* Login form */}
        <form
          className="w-full max-w-md space-y-6"
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
          />

          <div className="my-4 block text-right">
            <Link
              href="/reset-password"
              className="text-primary-500 cursor-pointer hover:underline hover:text-primary-700 outline-none focus:outline-none focus-visible:underline focus-visible:text-primary-700 text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="justify-center text-center">
            <button
              className="w-full bg-primary-700/85 text-white text-lg py-2 active:scale-90 hover:bg-primary-700 rounded-lg transition duration-300 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-opacity-75 focus-visible:scale-95"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <h2 className="mt-8 text-primary-500 font-semibold">
          Don&apos;t have an account?
        </h2>
        <div className="flex flex-col mt-6 gap-4">
          <Link
            href="/signup-seeker"
            className="py-3 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 group w-60 relative h-12 whitespace-nowrap overflow-hidden max-w-fit"
          >
            <MdPersonSearch size={24} className="text-indigo-600 inline" />
            <span className="inline-block w-full text-center text-base transform group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-300">
              Explore Jobs
            </span>
            <span className="inline-block w-full text-center text-base opacity-0 transform -translate-x-full translate-y-full group-hover:text-sm group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              Signup as a Talent
            </span>
          </Link>

          <Link
            href="/signup-recruiter"
            className="py-3 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 group w-60 relative h-12 whitespace-nowrap overflow-hidden max-w-fit"
          >
            <TbBriefcaseFilled size={22} className="text-indigo-600 inline" />
            <span className="inline-block w-full text-center text-base group-hover:-translate-y-8 group-hover:opacity-0 transition-all duration-300">
              Hire Talent
            </span>
            <span className="inline-block w-full text-center text-base opacity-0 -translate-x-full translate-y-full group-hover:text-sm group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              Signup as Recruiter
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
