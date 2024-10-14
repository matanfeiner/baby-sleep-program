import React, { useState, useEffect } from 'react';
import { useFormData, FormDataProvider } from './contexts/FormDataContext';
import BabySleepDevelopmentForm from './components/BabySleepDevelopmentForm';
import BabyMilestoneQuestion from './components/BabyMilestoneQuestion';
import BabySleepImprovementPrediction from './components/BabySleepImprovementPrediction';
import UpdatedBabySleepPlanCheckout from './components/UpdatedBabySleepPlanCheckout';
import BabySleepPlanLoading from './components/BabySleepPlanLoading';
import BabySleepPlanEmailInput from './components/BabySleepPlanEmailInput';
import BabySleepPlanReady from './components/BabySleepPlanReady';
import WeightInput from './components/WeightInput';
import ParentBabyWellnessDashboard from './components/ParentBabyWellnessDashboard';
import SleepDurationGoalInput from './components/SleepDurationGoalInput';

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

  useEffect(() => {
// Scroll to the top to prevent address bar from covering content
    window.scrollTo(0, 0);

// Prevent auto-scroll on focus in Safari
    const preventAutoScroll = (event) => {
      event.preventDefault();
    };
    window.addEventListener('touchmove', preventAutoScroll, { passive: false });
    return () => window.removeEventListener('touchmove', preventAutoScroll);
  }, []);

  const handleNextStep = () => {
    if (step < 10) {
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
        return <SleepDurationGoalInput value={formData.sleepDurationGoal} onChange={(data) => updateFormData({ sleepDurationGoal: data })} />;
      case 9:
        return <ParentBabyWellnessDashboard />;
      default:
        return <div className="max-w-md mx-auto p-6 text-center">Thank you!</div>;
    }
  };

  return (
      <div className="app-container" style={{ paddingTop: 'calc(env(safe-area-inset-top, 20px) + 30px)', paddingBottom: 'env(safe-area-inset-bottom)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)', minHeight: '100vh' }}>
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
