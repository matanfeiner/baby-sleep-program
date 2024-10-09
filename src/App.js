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
import { FormDataProvider, useFormData } from './contexts/FormDataContext';

function AppContent() {
  const [step, setStep] = useState(0);
  const [testMode, setTestMode] = useState(false);
  const { formData, updateFormData } = useFormData();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === '1') {
      setTestMode(true);
    }
  }, []);

  useEffect(() => {
    if (testMode) {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          setStep((prevStep) => Math.min(prevStep + 1, 10));
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [testMode]);

  const handleWeightSubmit = (weight) => {
    updateFormData({ weight });
    setStep(1);
  };

  const handleNameSubmit = (parentName, babyName) => {
    updateFormData({ parentName, babyName });
    setStep(2);
  };

  const handleSleepDevelopmentSubmit = (data) => {
    updateFormData(data);
    setStep(3);
  };

  const handleMilestoneSubmit = (milestones) => {
    updateFormData({ milestones });
    setStep(5);
  };

  const handlePredictionContinue = () => {
    setStep(6);
  };

  const handleLoadingContinue = () => {
    setStep(7);
  };

  const handleEmailSubmit = (email) => {
    updateFormData({ email });
    setStep(8);
  };

  const handleCheckoutComplete = () => {
    console.log("Final form data:", formData);
    setStep(9);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BabySleepDevelopmentForm onSubmit={handleSleepDevelopmentSubmit} />;
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

function App() {
  return (
      <FormDataProvider>
        <AppContent />
      </FormDataProvider>
  );
}

export default App;