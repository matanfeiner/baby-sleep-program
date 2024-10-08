import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const BabySleepDevelopmentForm = ({ onSubmit }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleNext = () => setStep(step + 1);
    const handlePrevious = () => setStep(step - 1);

    const updateFormData = (key, value) => {
        setFormData({ ...formData, [key]: value });
        if (step < questions.length - 1) {
            handleNext();
        } else {
            onSubmit(formData);
        }
    };

    const questions = [
        {
            question: "How many times do you wake up for your baby at night?",
            type: "clickable",
            options: ["0-1", "2-3", "4-5", "6+"],
            key: "nightWakings"
        },
        {
            question: "Are you willing to invest 15 minutes each day to improve your baby's sleep?",
            type: "clickable",
            options: ["Absolutely!", "I'll try my best", "I'm not sure"],
            key: "timeCommitment"
        },
        {
            question: "How old is your baby?",
            type: "clickable",
            options: ["0-3 months", "4-6 months", "7-12 months", "1-2 years", "2+ years"],
            key: "babyAge"
        },
        // Add more questions as needed
    ];

    const renderQuestion = (q) => {
        switch (q.type) {
            case "clickable":
                return (
                    <div className="space-y-2">
                        {q.options.map((option) => (
                            <button
                                key={option}
                                onClick={() => updateFormData(q.key, option)}
                                className="w-full p-3 text-left bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-4 bg-gradient-to-br from-pink-100 to-blue-100 min-h-screen">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-2xl font-bold text-blue-800">Baby Sleep Program</h1>
            </div>

            <div className="mb-6 bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            className={`w-1 h-1 rounded-full ${
                                index < step ? 'bg-pink-500' : index === step ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
                {questions[step]?.question && (
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">{questions[step].question}</h2>
                )}
                {renderQuestion(questions[step])}
            </div>

            {step > 0 && (
                <button onClick={handlePrevious} className="absolute top-4 left-4 p-2 bg-white rounded-full shadow">
                    <ChevronLeft className="h-6 w-6 text-blue-500" />
                </button>
            )}
        </div>
    );
};

export default BabySleepDevelopmentForm;