import React, { useState, useEffect } from 'react';
import { useFormData, FormDataProvider } from './contexts/FormDataContext';
import { Baby } from 'lucide-react';
import { questions, questionTypes } from './data/questions';
import WeightInput from './components/WeightInput';
import AgeInput from './components/AgeInput';
import SleepDurationGoalInput from './components/SleepDurationGoalInput';
import BabySleepDevelopmentForm from './components/BabySleepDevelopmentForm';
import BabySleepImprovementPrediction from './components/BabySleepImprovementPrediction';
import UpdatedBabySleepPlanCheckout from './components/UpdatedBabySleepPlanCheckout';
import BabySleepPlanLoading from './components/BabySleepPlanLoading';
import BabySleepPlanEmailInput from './components/BabySleepPlanEmailInput';
import BabySleepPlanReady from './components/BabySleepPlanReady';
import ParentBabyWellnessDashboard from './components/ParentBabyWellnessDashboard';

function AppContent() {
    const [step, setStep] = useState(0);
    const { formData, updateFormData } = useFormData();
    const [clickedOption, setClickedOption] = useState(null);

    useEffect(() => {
        // Read initial step from URL when component mounts
        const params = new URLSearchParams(window.location.search);
        const stepParam = params.get('step');
        if (stepParam !== null) {
            const initialStep = parseInt(stepParam, 10);
            if (!isNaN(initialStep) && initialStep >= 0 && initialStep < questions.length) {
                setStep(initialStep);
            }
        }
    }, []);

    useEffect(() => {
        // Update URL when step changes
        const params = new URLSearchParams(window.location.search);
        params.set('step', step.toString());
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }, [step]);

    const handleNextStep = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
            setClickedOption(null);
        }
    };

    const handlePreviousStep = () => {
        if (step > 0) {
            setStep(step - 1);
            setClickedOption(null);
        }
    };

    const handleOptionClick = (key, value) => {
        const question = questions[step];

        if (question.type === questionTypes.MULTI_SELECT) {
            const currentSelections = formData[key] || [];
            const updatedSelections = currentSelections.includes(value)
                ? currentSelections.filter(item => item !== value)
                : [...currentSelections, value];
            updateFormData({ [key]: updatedSelections });
        } else {
            setClickedOption(value);
            updateFormData({ [key]: value });
        }

        if (question.type === questionTypes.CLICKABLE) {
            setTimeout(() => {
                handleNextStep();
            }, 300);
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
                return (
                    <WeightInput
                        value={formData[question.key]?.weight}
                        onChange={(weight, unit) => {
                            updateFormData({ [question.key]: { weight, unit } });
                        }}
                    />
                );
            case questionTypes.AGE:
                return (
                    <AgeInput
                        value={formData[question.key]?.age}
                        onChange={(age, unit) => {
                            updateFormData({ [question.key]: { age, unit } });
                        }}
                    />
                );
            case questionTypes.SLEEP_DURATION_GOAL:
                return (
                    <SleepDurationGoalInput
                        value={formData[question.key]}
                        onChange={(value) => updateFormData({ [question.key]: value })}
                    />
                );
            default:
                return null;
        }
    };

    const isNextButtonDisabled = () => {
        const question = questions[step];
        if (question.type === questionTypes.WEIGHT) {
            const weightData = formData[question.key];
            return !weightData || !weightData.weight || !weightData.unit;
        }
        if (question.type === questionTypes.AGE) {
            const ageData = formData[question.key];
            return !ageData || !ageData.age || !ageData.unit;
        }
        if (question.type === questionTypes.MULTI_SELECT) {
            const selections = formData[question.key];
            return !selections || selections.length === 0;
        }
        if (question.type === questionTypes.CLICKABLE) {
            return !formData[question.key];
        }
        if (question.type === questionTypes.SLEEP_DURATION_GOAL) {
            return !formData[question.key] || typeof formData[question.key].hours !== 'number';
        }
        return false;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
            <header className="sticky top-0 bg-white shadow-sm z-10">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <Baby className="text-pink-500 w-6 h-6 mr-2" />
                        <h1 className="text-xl font-bold text-blue-800">My Tiny Milestones</h1>
                    </div>
                    <div className="text-sm text-gray-500">
                        Step {step + 1} of {questions.length}
                    </div>
                </div>
            </header>

            <main className="flex-grow overflow-y-auto">
                <div className="container mx-auto px-4 py-6">
                    <h2 className="text-lg font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
                    {renderQuestion()}
                </div>
            </main>

            <footer className="sticky bottom-0 bg-white shadow-sm">
                <div className="container mx-auto px-4 py-2 flex justify-between">
                    {step > 0 && (
                        <button
                            onClick={handlePreviousStep}
                            className="py-3 px-6 rounded-lg font-semibold text-lg transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Previous
                        </button>
                    )}
                    {step < questions.length - 1 && (
                        <button
                            onClick={handleNextStep}
                            disabled={isNextButtonDisabled()}
                            className={`py-3 px-6 rounded-lg font-semibold text-lg transition-colors
                                ${isNextButtonDisabled()
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'}`}
                        >
                            Next
                        </button>
                    )}
                </div>
            </footer>
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