import React from 'react';
import { Moon, Sun, Heart, Battery, Zap, UserCheck, Baby, ChevronRight } from 'lucide-react';
import { useFormData } from '../contexts/FormDataContext';

const WellnessMetric = ({ icon: Icon, title, value, description, reference }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
            <Icon className="w-6 h-6 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="flex justify-between items-center">
            <div>
                <div className="text-2xl font-bold mb-1">{value}</div>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className={`text-sm font-semibold px-2 py-1 rounded ${
                reference === 'Standard' || reference === 'Good' ? 'bg-green-100 text-green-800' :
                    reference === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
            }`}>
                {reference}
            </div>
        </div>
    </div>
);

const ParentBabyWellnessDashboard = ({ onViewSleepPlan }) => {
    const { formData } = useFormData();

    const processedData = processFormData(formData);

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-0 overflow-hidden">
            <div className="w-full max-w-md flex flex-col h-screen bg-white shadow-lg">
                <div className="sticky top-0 bg-white z-10 pt-4">
                    <div className="px-4 py-3 shadow-sm">
                        <div className="flex items-center">
                            <Baby className="text-pink-500 w-6 h-6 mr-2" />
                            <h1 className="text-xl font-bold text-blue-800 ml-2">Wellness Dashboard</h1>
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <div className="p-4">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-blue-800">Baby's Wellness</h2>
                            <div className="space-y-4">
                                <WellnessMetric
                                    icon={Moon}
                                    title="Sleep Duration"
                                    value={processedData.babyMetrics.sleepDuration.value}
                                    description={processedData.babyMetrics.sleepDuration.description}
                                    reference={processedData.babyMetrics.sleepDuration.reference}
                                />
                                <WellnessMetric
                                    icon={Battery}
                                    title="Sleep Quality"
                                    value={processedData.babyMetrics.sleepQuality.value}
                                    description={processedData.babyMetrics.sleepQuality.description}
                                    reference={processedData.babyMetrics.sleepQuality.reference}
                                />
                                <WellnessMetric
                                    icon={Zap}
                                    title="Development"
                                    value={processedData.babyMetrics.development.value}
                                    description={processedData.babyMetrics.development.description}
                                    reference={processedData.babyMetrics.development.reference}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-blue-800">Parent's Wellness</h2>
                            <div className="space-y-4">
                                <WellnessMetric
                                    icon={Moon}
                                    title="Your Sleep"
                                    value={processedData.parentMetrics.sleep.value}
                                    description={processedData.parentMetrics.sleep.description}
                                    reference={processedData.parentMetrics.sleep.reference}
                                />
                                <WellnessMetric
                                    icon={Heart}
                                    title="Stress Level"
                                    value={processedData.parentMetrics.stressLevel.value}
                                    description={processedData.parentMetrics.stressLevel.description}
                                    reference={processedData.parentMetrics.stressLevel.reference}
                                />
                                <WellnessMetric
                                    icon={UserCheck}
                                    title="Self-Care"
                                    value={processedData.parentMetrics.selfCare.value}
                                    description={processedData.parentMetrics.selfCare.description}
                                    reference={processedData.parentMetrics.selfCare.reference}
                                />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-blue-800">Daily Rhythm</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <Sun className="w-6 h-6 text-yellow-500 mr-2"/>
                                    <span>Wake: {processedData.dailyRhythm.wakeTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <Moon className="w-6 h-6 text-blue-500 mr-2"/>
                                    <span>Bedtime: {processedData.dailyRhythm.bedTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2 text-blue-800">Wellness Insights</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                {processedData.insights.map((insight, index) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
                    <button
                        onClick={onViewSleepPlan}
                        className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-xl hover:bg-blue-600 active:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        View Sleep Plan
                        <ChevronRight className="ml-2 w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

function processFormData(formData) {
    // This function should process the form data and return an object with the required metrics
    // You'll need to implement the logic based on your form questions and desired dashboard metrics
    return {
        babyMetrics: {
            sleepDuration: calculateSleepDuration(formData),
            sleepQuality: assessSleepQuality(formData),
            development: assessDevelopment(formData),
        },
        parentMetrics: {
            sleep: calculateParentSleep(formData),
            stressLevel: assessStressLevel(formData),
            selfCare: assessSelfCare(formData),
        },
        dailyRhythm: {
            wakeTime: formData.wakeTime || "7:00 AM",
            bedTime: formData.bedTime || "8:30 PM",
        },
        insights: generateInsights(formData),
    };
}

// Helper functions to calculate metrics based on form data
function calculateSleepDuration(formData) {
    // Implement logic based on your form data
    const duration = formData.sleepHours || "Unknown";
    return {
        value: duration,
        description: duration >= 10 ? "Within recommended range" : "Below recommended range",
        reference: duration >= 10 ? "Good" : "Low"
    };
}

function assessSleepQuality(formData) {
    // Implement logic based on your form data
    const quality = formData.sleepQuality || "Unknown";
    return {
        value: quality,
        description: "Based on night wakings and ease of falling asleep",
        reference: quality === "Good" ? "Good" : quality === "Fair" ? "Standard" : "Low"
    };
}

function assessDevelopment(formData) {
    // Implement logic based on your form data
    const development = formData.development || "Unknown";
    return {
        value: development,
        description: "Based on achieved milestones",
        reference: development === "On Track" ? "Good" : "Standard"
    };
}

function calculateParentSleep(formData) {
    // Implement logic based on your form data
    const parentSleep = formData.parentSleepHours || "Unknown";
    return {
        value: parentSleep,
        description: parentSleep >= 7 ? "Within optimal range" : "Below optimal range",
        reference: parentSleep >= 7 ? "Good" : parentSleep >= 6 ? "Standard" : "Low"
    };
}

function assessStressLevel(formData) {
    // Implement logic based on your form data
    const stressLevel = formData.parentStressLevel || "Unknown";
    return {
        value: stressLevel,
        description: "Based on reported stress indicators",
        reference: stressLevel === "Low" ? "Good" : stressLevel === "Moderate" ? "Standard" : "Low"
    };
}

function assessSelfCare(formData) {
    // Implement logic based on your form data
    const selfCareActivities = formData.parentSelfCareActivities || [];
    const score = selfCareActivities.length;
    return {
        value: `${score}/5 activities`,
        description: score >= 3 ? "Good self-care routine" : "Try to increase self-care activities",
        reference: score >= 3 ? "Good" : score >= 2 ? "Standard" : "Low"
    };
}

function generateInsights(formData) {
    // Generate insights based on the form data
    const insights = [];
    if (formData.sleepHours < 10) {
        insights.push("Consider adjusting bedtime to increase total sleep duration.");
    }
    if (formData.parentSleepHours < 7) {
        insights.push("Try to prioritize your own sleep for better overall well-being.");
    }
    if (formData.parentStressLevel === "High") {
        insights.push("Incorporate stress-reduction techniques into your daily routine.");
    }
    return insights;
}

export default ParentBabyWellnessDashboard;