import React from 'react';
import { Moon, Sun, Heart, Battery, Zap, UserCheck } from 'lucide-react';

const WellnessMetric = ({ icon: Icon, title, value, description }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
            <Icon className="w-6 h-6 mr-2 text-indigo-500" />
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

const ParentBabyWellnessDashboard = ({ onViewSleepPlan }) => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-teal-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Parent-Baby Wellness Dashboard</h1>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3">Baby's Wellness</h2>
                    <div className="space-y-4">
                        <WellnessMetric
                            icon={Moon}
                            title="Sleep Duration"
                            value="14.5 hours"
                            description="Within recommended range"
                        />
                        <WellnessMetric
                            icon={Battery}
                            title="Sleep Quality"
                            value="Good"
                            description="3 out of 4 sleep cycles completed"
                        />
                        <WellnessMetric
                            icon={Zap}
                            title="Development"
                            value="On Track"
                            description="Meeting 90% of milestones"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3">Parent's Wellness</h2>
                    <div className="space-y-4">
                        <WellnessMetric
                            icon={Moon}
                            title="Your Sleep"
                            value="6.5 hours"
                            description="Aim for 7-9 hours for optimal health"
                        />
                        <WellnessMetric
                            icon={Heart}
                            title="Stress Level"
                            value="Moderate"
                            description="Consider relaxation techniques"
                        />
                        <WellnessMetric
                            icon={UserCheck}
                            title="Self-Care"
                            value="2/5 activities"
                            description="Try to increase self-care activities"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Daily Rhythm</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Sun className="w-6 h-6 text-yellow-500 mr-2" />
                        <span>Wake: 7:00 AM</span>
                    </div>
                    <div className="flex items-center">
                        <Moon className="w-6 h-6 text-blue-500 mr-2" />
                        <span>Bedtime: 8:30 PM</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Wellness Insights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Your baby's sleep pattern is improving. Keep up the consistent bedtime routine!</li>
                    <li>Consider going to bed 30 minutes earlier to increase your sleep duration.</li>
                    <li>Try incorporating a 10-minute meditation during your baby's morning nap for stress relief.</li>
                </ul>
            </div>

            <div className="mt-6">
                <button
                    onClick={onViewSleepPlan}
                    className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300"
                >
                    View Sleep Plan
                </button>
            </div>
        </div>
    );
};

export default ParentBabyWellnessDashboard;
