import { useState } from "react";
import axios from "axios";
import { default_from_data } from "../common/constants";
import validateRequestForm from "../utils/formValidation";

function RequestForm({ onBack, onSuccess }) {
  const [formData, setFormData] = useState(default_from_data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError] = useState(null);

//   const localApiUrl = process.env.REACT_APP_LOCAL_API_URL;
// const liveApiUrl = process.env.REACT_APP_LIVE_API_URL;

const API_BASE_URL = 'https://risk-assessment-mvp.onrender.com'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateRequestForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/submit`, formData);

      console.log("Server response:", response.data);
      onSuccess(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200">
      <div className="relative mb-8 text-center">
        <button
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-gray-900">
          New Assessment Request
        </h2>
        <p className="text-gray-600 mt-2">
          Please fill out all fields to the best of your ability.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Acme Corp"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select an industry
            </option>
            <option value="manufacturing">Manufacturing</option>
            <option value="construction">Construction</option>
            <option value="healthcare">Healthcare</option>
            <option value="technology">Technology</option>
            <option value="retail">Retail</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Site Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., 123 Main St, Springfield"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactPerson"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Person <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.contactPerson ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Jane Doe"
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., jane.doe@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="activity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type of Activity to Assess
          </label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Operating heavy machinery, chemical handling"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="hazards"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Specific Hazards (Observed or Potential)
          </label>
          <textarea
            id="hazards"
            name="hazards"
            value={formData.hazards}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Unguarded equipment, poor ventilation, trip hazards"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="timeframe"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Timeframe (Start Date) <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="timeframe"
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.timeframe ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.timeframe && (
            <p className="text-red-500 text-sm mt-1">{errors.timeframe}</p>
          )}
        </div>

        <div className="mt-8 border-t pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>

          {/* --- NEW: Display for general server errors --- */}
          {submitError && (
            <p className="text-red-500 text-center mt-4">{submitError}</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
