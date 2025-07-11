import React, { useEffect } from "react";

const Alert = ({ message, isAlert, setIsAlert, waitTime = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlert(false);
    }, waitTime);
    return () => clearTimeout(timer);
  }, [setIsAlert]);

  if (!isAlert) return null;

return (
    <div
        role="status"
        className="fixed top-4 left-1/2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-w-md transform -translate-x-1/2 bg-gradient-to-r from-green-400 via-green-500 to-green -600 text-white px-4 py-3 shadow-lg rounded-lg flex items-center z-50 animate-slideDown"
    >
        <svg
            className="animate-spin h-6 w-6 mr-3 shrink-0 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
        <span className="font-semibold text-sm sm:text-base md:text-lg">
            {message}...
        </span>
    </div>
);
};

export default Alert;
