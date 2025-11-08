import React from "react";

function LandingPage({ onStart }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200 text-center">
        {/* Header Icon */}
        <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Workplace Risk Assessment Request
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Welcome! This tool helps you request a formal risk assessment for your
          workplace. Please provide the necessary details in the following form.
        </p>

        <button
          onClick={onStart}
          className="inline-block w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Start Request
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
