// client/src/components/AdminPage.js (New File)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/requests');
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2>Admin Panel: All Requests ({requests.length})</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Date</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.companyName}</td>
              <td>{req.contactPerson}</td>
              <td>{new Date(req.timestamp).toLocaleDateString()}</td>
              <td>
                <a href={`http://localhost:3001/api/report/${req.id}`} target="_blank">
                  Download PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminPage;