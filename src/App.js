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
import { Baby } from 'lucide-react';

function AppContent() {
  const [step, setStep] = useState(0);
  const { formData, updateFormData } = useFormData();

  const handleNextStep = () => {
    if (step < 9) {  // Ensure the step count does not exceed the available number of steps
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BabySleepDevelopmentForm onSubmit={handleNextStep} />;
      case 1:
        return <BabyMilestoneQuestion onSubmit={handleNextStep} />;
      case 2:
        return <BabySleepImprovementPrediction onContinue={handleNextStep} />;
      case 3:
        return <UpdatedBabySleepPlanCheckout onSubmit={handleNextStep} />;
      case 4:
        return <BabySleepPlanLoading onSubmit={handleNextStep} />;
      case 5:
        return <BabySleepPlanEmailInput onSubmit={handleNextStep} />;
      case 6:
        return <BabySleepPlanReady onSubmit={handleNextStep} />;
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
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
        {/* Single Header */}
        <header className="sticky top-0 bg-white shadow-sm z-10">
          <div className="container mx-auto px-4 py-2 flex items-center">
            <Baby className="text-pink-500 w-6 h-6 mr-2" />
            <h1 className="text-xl font-bold text-blue-800">Baby Sleep Program</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {renderStep()}
          </div>
        </main>

        {/* Footer for navigation */}
        {step < 9 && (
            <footer className="sticky bottom-0 bg-white shadow-sm">
              <div className="container mx-auto px-4 py-2">
                <button
                    onClick={handleNextStep}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
                >
                  NEXT STEP
                </button>
              </div>
            </footer>
        )}
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
