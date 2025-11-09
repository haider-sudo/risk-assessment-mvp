function ConfirmationPage({ submissionData, onBack }) {
  if (!submissionData) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 text-center">
        <p>No submission data found.</p>
        <button onClick={onBack} className="text-blue-600 hover:underline mt-4">
          Go Back Home
        </button>
      </div>
    );
  }

  // Format the date for better readability
  const formattedDate = new Date(submissionData.timestamp).toLocaleString();

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10">
        <div className="text-center">
          <span className="text-6xl" role="img" aria-label="Checkmark">
            ✅
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-4">
            Request Submitted Successfully!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you, {submissionData.contactPerson}. Your request (ID:{" "}
            {submissionData.id}) has been received.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 my-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>Company:</strong> {submissionData.companyName}
            </li>
            <li>
              <strong>Location:</strong> {submissionData.location}
            </li>
            <li>
              <strong>Activity:</strong> {submissionData.activity}
            </li>
            <li>
              <strong>Contact:</strong> {submissionData.contactPerson} (
              {submissionData.email})
            </li>
            <li>
              <strong>Submitted On:</strong> {formattedDate}
            </li>
          </ul>
        </div>

        <a
          href={`http://localhost:3001/api/report/${submissionData.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mb-4"
        >
          <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Download PDF Summary
          </button>
        </a>

        <button
          onClick={onBack}
          className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-700 transition duration-300"
        >
          Submit Another Request
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
