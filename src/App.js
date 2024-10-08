import React, { useState } from 'react';
import ParentBabyNameInput from './components/ParentBabyNameInput';
import BabySleepDevelopmentForm from './components/BabySleepDevelopmentForm';

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNameSubmit = (parentName, babyName) => {
    setFormData({ ...formData, parentName, babyName });
    setStep(1);
  };

  const handleSleepDevelopmentSubmit = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ParentBabyNameInput onNameSubmit={handleNameSubmit} />;
      case 1:
        return <BabySleepDevelopmentForm onSubmit={handleSleepDevelopmentSubmit} />;
      default:
        return <div>Thank you for completing the form!</div>;
    }
  };

  return (
      <div className="App">
        {renderStep()}
      </div>
  );
}

export default App;