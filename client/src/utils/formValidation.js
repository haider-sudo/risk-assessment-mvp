const validateRequestForm = (formData) => {
  const newErrors = {};

  if (!formData.companyName.trim()) {
    newErrors.companyName = 'Company name is required.';
  }
  if (!formData.contactPerson.trim()) {
    newErrors.contactPerson = 'Contact person is required.';
  }
  if (!formData.location.trim()) {
    newErrors.location = 'Job site location is required.';
  }
  if (!formData.timeframe) {
    newErrors.timeframe = 'Preferred timeframe is required.';
  }

  // Email Validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid. Please enter a valid email.';
  }

  return newErrors;
};

export default validateRequestForm;