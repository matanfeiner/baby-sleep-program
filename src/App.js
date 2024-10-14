import React, { useState, useEffect } from 'react';
import { useFormData, FormDataProvider } from './contexts/FormDataContext';
import { Baby } from 'lucide-react';
import { questions, questionTypes } from './data/questions';

function AppContent() {
  const [step, setStep] = useState(0);
  const { formData, updateFormData } = useFormData();
  const [clickedOption, setClickedOption] = useState(null);

  const handleNextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setClickedOption(null);
    }
  };

  const handleOptionClick = (key, value) => {
    setClickedOption(value);
    updateFormData({ [key]: value });

    if (questions[step].type === questionTypes.CLICKABLE) {
      setTimeout(() => {
        handleNextStep();
      }, 300); // Delay to show feedback before moving to next question
    }
  };

  const renderQuestion = () => {
    const question = questions[step];

    switch (question.type) {
      case questionTypes.CLICKABLE:
        return (
            <div className="space-y-4">
              {question.options.map((option) => (
                  <button
                      key={option}
                      onClick={() => handleOptionClick(question.key, option)}
                      className={`w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-between text-lg
                ${clickedOption === option ? 'ring-2 ring-blue-500 bg-blue-50 scale-[0.98] animate-pulse' : ''}`}
                  >
                    <span>{option}</span>
                    <div className={`w-6 h-6 border-2 rounded-full transition-all duration-200 ease-in-out
                ${clickedOption === option ? 'bg-blue-500 border-blue-500 scale-110' : 'border-gray-300'}`}>
                      {clickedOption === option && (
                          <div className="w-full h-full rounded-full bg-white scale-50"/>
                      )}
                    </div>
                  </button>
              ))}
            </div>
        );
      case questionTypes.MULTI_SELECT:
        return (
            <div className="space-y-4">
              {question.options.map((option) => (
                  <label key={option} className="flex items-center justify-between p-4 bg-white rounded-lg shadow w-full text-lg transition-all">
                    <span>{option}</span>
                    <input
                        type="checkbox"
                        checked={(formData[question.key] || []).includes(option)}
                        onChange={() => handleOptionClick(question.key, option)}
                        className="form-checkbox h-6 w-6 text-blue-600 rounded-full transition-all duration-200 ease-in-out"
                    />
                  </label>
              ))}
            </div>
        );
      case questionTypes.EDUCATION:
      case questionTypes.FUTURE:
        return (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src={question.image} alt={question.alt} className="w-full rounded-lg mb-6" />
              <div className="text-center">
                <p className="text-2xl font-bold mb-4 text-blue-800 leading-tight">
                  "{question.content}"
                </p>
                <p className="text-lg text-gray-700 italic flex items-center justify-center">
                  <Baby className="w-5 h-5 mr-2 text-blue-500" />
                  Baby Sleep Wisdom
                </p>
              </div>
            </div>
        );
      case questionTypes.WEIGHT:
        return <WeightInput onChange={(weight, unit) => updateFormData({ [question.key]: { weight, unit } })} />;
      case questionTypes.AGE:
        return <BabyMilestoneQuestion onSubmit={handleNextStep} />;
      case questionTypes.SLEEP_DURATION_GOAL:
        return <SleepDurationGoalInput value={formData[question.key]} onChange={(value) => updateFormData({ [question.key]: value })} />;
      default:
        return null;
    }
  };

  const showNextButton = questions[step].type !== questionTypes.CLICKABLE;

  return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
        <header className="sticky top-0 bg-white shadow-sm z-10">
          <div className="container mx-auto px-4 py-2 flex items-center">
            <Baby className="text-pink-500 w-6 h-6 mr-2" />
            <h1 className="text-xl font-bold text-blue-800">Baby Sleep Program</h1>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
            {renderQuestion()}
          </div>
        </main>

        {showNextButton && (
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