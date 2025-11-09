import React, { useState } from "react";

import LandingPage from "./components/LandingPage";
import RequestForm from "./components/RequestForm";
import ConfirmationPage from "./components/ConfirmationPage";
import AdminPage from "./components/AdminPage";

export default function App() {

const [pageState, setPageState] = useState({
    page: 'landing',  // 'landing', 'form', 'confirmation', or 'admin'
    data: null      
  });

  const handleSuccess = (submissionData) => {
    setPageState({ page: 'confirmation', data: submissionData });
  };

  const goHome = () => {
    setPageState({ page: 'landing', data: null });
  };
  
  const showAdmin = () => {
    setPageState({ page: 'admin', data: null });
  };
  
  let content;
  if (pageState.page === 'landing') {
    content = <LandingPage onStart={() => setPageState({ page: 'form', data: null })} onAdminClick={showAdmin} />;
  } else if (pageState.page === 'form') {
    content = <RequestForm onBack={goHome} onSuccess={handleSuccess} />;
  } else if (pageState.page === 'confirmation') {
    content = <ConfirmationPage submissionData={pageState.data} onBack={goHome} />;
  } else if (pageState.page === 'admin') {
    content = <AdminPage onBack={goHome} />;
  }

  return (
    <div className="font-inter bg-gray-50 min-h-screen w-full flex items-center justify-center py-12">
      {content}
    </div>
  );
}
