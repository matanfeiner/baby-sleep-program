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
import { FormDataProvider, useFormData } from './contexts/FormDataContext';

function Header() {
  return (
      <div className="header sticky top-0 bg-white p-2 shadow-md z-50">
        <h1 className="text-xl font-bold">Baby Sleep Program</h1>
      </div>
  );
}


function Footer({ onPrev, onNext, step, totalSteps }) {
  return (
      <div className="footer sticky bottom-0 bg-white p-2 shadow-md">
        {step > 0 && (
            <button onClick={onPrev} className="control-button w-full py-2 mb-2">Previous</button>
        )}
        {step < totalSteps - 1 && (
            <button onClick={onNext} className="control-button w-full py-2">Next</button>
        )}
      </div>
  );
}



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
          setStep((prevStep) => Math.min(prevStep + 1, 10));
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
        // Map steps to components as previously defined
      case 0:
        return <BabySleepDevelopmentForm onSubmit={() => handleNextStep()} />;
      case 1:
        return <ParentBabyNameInput onNameSubmit={() => handleNextStep()} />;
        // Add all other cases
      default:
        return <div className="max-w-md mx-auto p-6 text-center">Thank you!</div>;
    }
  };

}

function App() {
  return (
      <FormDataProvider>
        <AppContent />
      </FormDataProvider>
  );
}

export default App;
