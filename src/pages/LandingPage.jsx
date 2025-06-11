import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex flex-col justify-between">
      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-12 max-w-7xl mx-auto gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#7B341E] leading-tight">
            Organize Your Work, <br /> Stay Focused.
          </h1>
          <p className="text-[#A16207] text-lg max-w-md mx-auto md:mx-0">
            Taskify helps you manage your tasks efficiently and boosts
            productivity with a clean and modern interface.
          </p>
          {!user ? (
            <Link
              to="/signup"
              className="inline-block bg-[#FB923C] hover:bg-[#F97316] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Create Your Account
            </Link>
          ) : (
            <Link
              to="/tasks"
              className="bg-[#FB923C] hover:bg-[#F97316] text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Image or Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://illustrations.popsy.co/amber/to-do-list.svg"
            alt="Task Management"
            className="w-full max-w-md mx-auto mb-10"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[#A16207] py-6 border-t border-[#FFE8D6] text-sm">
        © 2025 Taskify. Built with ❤️ by Zainfarooq
      </footer>
    </div>
  );
}
