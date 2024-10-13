import React, { useState, useEffect } from 'react';
import './App.css';
import ParentBabyNameInput from './components/ParentBabyNameInput';
import BabySleepDevelopmentForm from './components/BabySleepDevelopmentForm';
import BabyMilestoneQuestion from './components/BabyMilestoneQuestion';
import BabySleepImprovementPrediction from './components/BabySleepImprovementPrediction';
import UpdatedBabySleepPlanCheckout from './components/UpdatedBabySleepPlanCheckout';
import ParentBabyWellnessDashboard from './components/ParentBabyWellnessDashboard';
import BabySleepPlanLoading from './components/BabySleepPlanLoading';
import BabySleepPlanEmailInput from './components/BabySleepPlanEmailInput';
import BabySleepPlanReady from './components/BabySleepPlanReady';
import WeightInput from './components/WeightInput';
import { FormDataProvider, useFormData } from './contexts/FormDataContext';

function AppContent() {
  const [step, setStep] = useState(0);
  const [testMode, setTestMode] = useState(false);
  const { formData, updateFormData } = useFormData();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setTestMode(urlParams.get('test') === '1');
  }, []);

  useEffect(() => {
    if (testMode) {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleNextStep();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [testMode]);

  const handleNextStep = () => {
    if (step < 9) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BabySleepDevelopmentForm onSubmit={() => handleNextStep()} />;
      case 1:
        return <BabyMilestoneQuestion onSubmit={() => handleNextStep()} />;
      case 2:
        return <BabySleepImprovementPrediction onContinue={() => handleNextStep()} />;
      case 3:
        return <UpdatedBabySleepPlanCheckout onSubmit={() => handleNextStep()} />;
      case 4:
        return <BabySleepPlanLoading onSubmit={() => handleNextStep()} />;
      case 5:
        return <BabySleepPlanEmailInput onSubmit={() => handleNextStep()} />;
      case 6:
        return <BabySleepPlanReady onSubmit={() => handleNextStep()} />;
      case 7:
        return <WeightInput onChange={(weight, unit) => updateFormData({ weight, unit })} />;
      default:
        return <div className="max-w-md mx-auto p-6 text-center">Thank you!</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="dashboard-container">
        <ParentBabyWellnessDashboard />
      </div>
      <div className="content-area">
        {renderStep()}
      </div>
      <div className="footer">
        <button
          onClick={handleNextStep}
          className="next-button"
        >
          NEXT STEP
        </button>
      </div>
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