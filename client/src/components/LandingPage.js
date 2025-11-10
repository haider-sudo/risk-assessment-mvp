function LandingPage({ onStart, onAdminClick }) {
  return (
    // Use min-h-screen and flex utils to center the card perfectly
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="max-w-xl w-full bg-white p-10 sm:p-12 rounded-2xl shadow-2xl text-center">
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

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Workplace Risk Assessment Request
        </h1>

        <p className="text-base text-gray-600 mb-8">
          Welcome! This tool helps you request a formal risk assessment for your
          workplace. Please provide the necessary details in the following form.
        </p>
        <button
          onClick={onStart}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg
                     hover:bg-blue-700 hover:-translate-y-1 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-300 ease-in-out"
        >
          Start Request
        </button>
        <button
          onClick={onAdminClick}
          className="w-full mt-4 bg-transparent text-gray-600 font-semibold py-2 px-4 rounded-lg 
                     hover:bg-gray-100 hover:text-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
                     transition-colors duration-200"
        >
          View Admin Panel
        </button>
      </div>
    </div>
  );
}


export default LandingPage;
