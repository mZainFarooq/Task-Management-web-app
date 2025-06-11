import { useForm } from "react-hook-form";
import FullScreenLoader from "../components/FullScreenLoader";
import { useState } from "react";
import { handleSignInwithEmailandPassword } from "../firebase/authHandling";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    handleSignInwithEmailandPassword(setLoading, data, dispatch);
    reset();
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="bg-[#FFF7F0] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-[#FFE8D6]">
          <h2 className="text-2xl font-bold text-[#7B341E] text-center">
            Welcome Back 😊
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.email ? "border-red-500" : "border-[#FCD9B8]"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#7B341E]">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] ${
                  errors.password ? "border-red-500" : "border-[#FCD9B8]"
                }`}
                placeholder="••••••••"
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-[#7B341E]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#F97316] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
