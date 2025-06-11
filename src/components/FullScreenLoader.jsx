export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-white/35 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 150"
          className="w-32 h-32"
        >
          <path
            fill="none"
            stroke="#FB923C"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="300 385"
            strokeDashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}
