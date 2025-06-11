import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7F0] px-4 text-center">
      <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-[#FB923C] leading-none">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-[#7B341E] mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-[#A16207] mb-6 max-w-md">
        The page you're looking for doesn't exist or might have been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#FB923C] hover:bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}
