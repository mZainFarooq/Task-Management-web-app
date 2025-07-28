import { useForm } from "react-hook-form";
import { useState } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import { handleSignUpwithEmailandPassword } from "../firebase/authHandling";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleSignUpwithEmailandPassword(setLoading, data, dispatch);
    reset();
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-[#FFE8D6]">
          <h2 className="text-2xl font-bold text-[#7B341E] text-center">
            Create Account 📝
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.username ? "border-red-500" : "border-[#FCD9B8] border"
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.fullname ? "border-red-500" : "border-[#FCD9B8] border"
                }`}
              />
              {errors.fullname && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.email ? "border-red-500" : "border-[#FCD9B8] border"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "At least 6 characters",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.password ? "border-red-500" : "border-[#FCD9B8] border"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FB923C] text-white py-2 rounded-lg hover:bg-[#F97316] transition disabled:opacity-60"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-[#7B341E]">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#F97316] font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
