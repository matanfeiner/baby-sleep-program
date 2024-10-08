import React, { useState, useEffect } from 'react';
import ParentBabyNameInput from './components/ParentBabyNameInput';
import BabySleepDevelopmentForm from './components/BabySleepDevelopmentForm';
import BabyMilestoneQuestion from './components/BabyMilestoneQuestion';
import BabySleepImprovementPrediction from './components/BabySleepImprovementPrediction';
import UpdatedBabySleepPlanCheckout from './components/UpdatedBabySleepPlanCheckout';
import ParentBabyWellnessDashboard from './components/ParentBabyWellnessDashboard';
import BabySleepPlanLoading from './components/BabySleepPlanLoading';
import BabySleepPlanEmailInput from './components/BabySleepPlanEmailInput';
import BabySleepPlanReady from './components/BabySleepPlanReady';

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    // Check if the URL contains the query parameter ?test=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === '1') {
      setTestMode(true);
    }
  }, []);

  useEffect(() => {
    // Add event listener for 'Enter' key if in test mode
    if (testMode) {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Move to the next step when Enter is pressed
          setStep((prevStep) => Math.min(prevStep + 1, 10)); // Adjust 10 based on your total steps
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [testMode]);

  const handleWeightSubmit = (weight) => {
    setFormData({ ...formData, weight });
    setStep(1);
  };

  const handleNameSubmit = (parentName, babyName) => {
    setFormData({ ...formData, parentName, babyName });
    setStep(2);
  };

  const handleSleepDevelopmentSubmit = (data) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const handleMilestoneSubmit = (milestones) => {
    setFormData({ ...formData, milestones });
    setStep(5);
  };

  const handlePredictionContinue = () => {
    setStep(6);
  };

  const handleLoadingContinue = () => {
    setStep(7);
  };

  const handleEmailSubmit = (email) => {
    setFormData({ ...formData, email });
    setStep(8);
  };

  const handleCheckoutComplete = () => {
    console.log("Final form data:", formData);
    setStep(9);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BabySleepDevelopmentForm onSubmit={handleWeightSubmit} />;
      case 1:
        return <ParentBabyNameInput onNameSubmit={handleNameSubmit} />;
      case 2:
        return <ParentBabyWellnessDashboard onViewSleepPlan={() => setStep(3)} />;
      case 3:
        return <BabyMilestoneQuestion onSubmit={handleMilestoneSubmit} />;
      case 4:
        return <BabySleepImprovementPrediction onContinue={handlePredictionContinue} />;
      case 5:
        return <BabySleepPlanLoading onComplete={handleLoadingContinue} />;
      case 6:
        return <BabySleepPlanEmailInput onSubmit={handleEmailSubmit} />;
      case 7:
        return (
            <BabySleepPlanReady
                parentName={formData.parentName}
                babyName={formData.babyName}
                onContinue={() => setStep(8)}
            />
        );
      case 8:
        return <UpdatedBabySleepPlanCheckout onComplete={handleCheckoutComplete} />;
      default:
        return (
            <div className="max-w-md mx-auto p-6 text-center">
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-xl mb-4">Your sleep plan is on its way to your inbox.</p>
              <button
                  onClick={() => setStep(0)}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Start Over
              </button>
            </div>
        );
    }
  };

  return (
      <div className="App min-h-screen bg-gray-100 py-8">
        {renderStep()}
      </div>
  );
}

export default App;
