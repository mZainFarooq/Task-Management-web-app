import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <nav className="w-full bg-white border-b border-[#FFE8D6] px-8 py-2 flex items-center justify-between shadow-md">
      <Link to={"/"}>
        <div className="text-[#7B341E] cursor-pointer font-extrabold text-xl tracking-wider select-none font-sans">
          Taskify
          <span className="ml-1 text-[#FB923C]">.</span>
        </div>
      </Link>

      {user ? (
        <Link to="/profile">
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FB923C] to-[#F97316] flex items-center justify-center 
              text-white font-semibold text-lg select-none cursor-pointer
              shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out uppercase"
            title="User Profile"
          >
            {user.fullname.slice(0, 1)}
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          {currentPath === "/signin" ? (
            <Link
              to="/signup"
              className="bg-transparent border border-[#FB923C] text-[#FB923C] font-semibold px-5 py-2 rounded-lg transition hover:bg-[#FB923C] hover:text-white"
            >
              Sign Up
            </Link>
          ) : (
            <Link
              to={user ? "/tasks" : "/signin"}
              className="bg-[#FB923C] hover:bg-[#F97316] text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              {user ? "Get Started" : "Sign In"}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
