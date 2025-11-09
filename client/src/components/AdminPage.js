// client/src/components/AdminPage.js (New File)
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://risk-assessment-mvp.onrender.com';

function AdminPage({onBack}) {
 const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE_URL}/api/requests`);
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to fetch requests. Is the server running?");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []); // Runs once on component mount

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Admin Panel: All Requests</h2>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            &larr; Back to Home
          </button>
        </div>
        
        {loading && <p className="text-center">Loading requests...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No submissions found. Submit one to see it here!
                    </td>
                  </tr>
                )}
                {requests.map(req => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.companyName}</div>
                      <div className="text-sm text-gray-500">{req.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{req.contactPerson}</div>
                      <div className="text-sm text-gray-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(req.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowciwrap text-sm text-gray-500">{req.activity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        href={`${API_BASE_URL}/api/report/${req.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
export default AdminPage;