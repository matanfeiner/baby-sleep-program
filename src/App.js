import React, { useState, useEffect } from 'react';
import { useFormData, FormDataProvider } from './FormDataContext';
import BabySleepDevelopmentForm from './BabySleepDevelopmentForm';
import BabyMilestoneQuestion from './BabyMilestoneQuestion';
import BabySleepImprovementPrediction from './BabySleepImprovementPrediction';
import UpdatedBabySleepPlanCheckout from './UpdatedBabySleepPlanCheckout';
import BabySleepPlanLoading from './BabySleepPlanLoading';
import BabySleepPlanEmailInput from './BabySleepPlanEmailInput';
import BabySleepPlanReady from './BabySleepPlanReady';
import WeightInput from './WeightInput';
import ParentBabyWellnessDashboard from './ParentBabyWellnessDashboard';

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
      case 8:
        return <ParentBabyWellnessDashboard />;
      default:
        return <div className="max-w-md mx-auto p-6 text-center">Thank you!</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="content-area">
        {renderStep()}
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