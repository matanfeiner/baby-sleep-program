import React, { useState } from 'react';
import { Cake, Book, Car, Star, Smile, Moon, X, Baby, Heart } from 'lucide-react';

const MilestoneOption = ({ icon: Icon, label, isSelected, onToggle }) => (
    <div
        className={`flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer ${
            isSelected ? 'border-2 border-blue-500' : ''
        }`}
        onClick={onToggle}
    >
        <div className="flex items-center">
            <Icon className="w-6 h-6 mr-3 text-blue-500" />
            <span className="text-lg">{label}</span>
        </div>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
    </div>
);

const BabyMilestoneQuestion = ({ onSubmit }) => {
    const [selectedMilestones, setSelectedMilestones] = useState([]);

    const handleMilestoneToggle = (milestone) => {
        setSelectedMilestones(prev =>
            prev.includes(milestone)
                ? prev.filter(m => m !== milestone)
                : [...prev, milestone]
        );
    };

    const handleSubmit = () => {
        onSubmit(selectedMilestones);
    };

    const milestones = [
        { icon: Cake, label: "First birthday" },
        { icon: Baby, label: "First steps" },
        { icon: Book, label: "First words" },
        { icon: Car, label: "Family trip or vacation" },
        { icon: Star, label: "Starting daycare/preschool" },
        { icon: Smile, label: "First tooth" },
        { icon: Moon, label: "Sleeping through the night" },
        { icon: Heart, label: "Other milestone" },
        { icon: X, label: "No specific milestones soon" },
    ];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">What's the next exciting milestone for your baby?</h2>
            <p className="text-center text-gray-600 mb-6">
                Looking forward to upcoming milestones can be a great motivator for sticking to your sleep and development plan!
            </p>

            <div className="space-y-3">
                {milestones.map((milestone) => (
                    <MilestoneOption
                        key={milestone.label}
                        icon={milestone.icon}
                        label={milestone.label}
                        isSelected={selectedMilestones.includes(milestone.label)}
                        onToggle={() => handleMilestoneToggle(milestone.label)}
                    />
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-6"
            >
                Continue
            </button>
        </div>
    );
};

export default BabyMilestoneQuestion;