import React, { useState } from "react";

import LandingPage from "./components/LandingPage";
import RequestForm from "./components/RequestForm";
import ConfirmationPage from "./components/ConfirmationPage";

export default function App() {

  const [pageState, setPageState] = useState({
    page: 'landing',  // 'landing', 'form', or 'confirmation'
    data: null      // Holds submission data for the confirmation page
  });

   const handleSuccess = (submissionData) => {
    setPageState({
      page: 'confirmation',
      data: submissionData
    });
  };

   // Function to go back to the start
  const goHome = () => {
    setPageState({
      page: 'landing',
      data: null
    });
  };
  
  // Render logic to show the correct page
  let content;
  if (pageState.page === 'landing') {
    content = <LandingPage onStart={() => setPageState({ page: 'form', data: null })} />;
  } else if (pageState.page === 'form') {
    content = <RequestForm onBack={goHome} onSuccess={handleSuccess} />;
  } else {
    content = <ConfirmationPage submissionData={pageState.data} onBack={goHome} />;
  }

  return (
    <div className="font-inter bg-gray-50 min-h-screen w-full flex items-center justify-center py-12">
      {content}
    </div>
  );

  // return (
  //   <div className="bg-gray-50 min-h-screen text-gray-900 font-inter">

  //     <div className="container mx-auto p-4 sm:p-6 lg:p-8">
  //       {currentPage === "landing" && (
  //         <LandingPage onStart={() => setCurrentPage("form")} />
  //       )}

  //       {currentPage === "form" && (
  //         <RequestForm onBack={() => setCurrentPage("landing")} />
  //       )}
  //     </div>
  //   </div>
  // );
}
