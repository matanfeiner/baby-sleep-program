import React, { useState, useEffect } from 'react';
import { Moon, Sun, Heart, Battery, Zap, UserCheck, Baby, ChevronRight } from 'lucide-react';
import { fetchDashboardData } from '../api';

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

const ParentBabyWellnessDashboard = ({ onViewSleepPlan, userId }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setIsLoading(true);
                const data = await fetchDashboardData(userId);
                setDashboardData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
                setError(error.message);
                setIsLoading(false);
            }
        }

        loadDashboardData();
    }, [userId]);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading your dashboard...</div>;
    if (error) return <div>Sorry, we couldn't load your dashboard. Please try again later.</div>;

    if (!dashboardData || !dashboardData.babyMetrics || !dashboardData.parentMetrics) {
        return <div>No data available. Please try again later.</div>;
    }

    const { babyMetrics, parentMetrics } = dashboardData;

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-0 overflow-hidden">
            <div className="w-full max-w-md flex flex-col h-screen bg-white shadow-lg">
                <div className="sticky top-0 bg-white z-10 pt-4"> {/* Changed pt-safe to pt-4 */}
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
                                    value={babyMetrics?.sleepDuration?.value}
                                    description={babyMetrics?.sleepDuration?.description}
                                    reference={babyMetrics?.sleepDuration?.reference}
                                />
                                <WellnessMetric
                                    icon={Battery}
                                    title="Sleep Quality"
                                    value={babyMetrics?.sleepQuality?.value}
                                    description={babyMetrics?.sleepQuality?.description}
                                    reference={babyMetrics?.sleepQuality?.reference}
                                />
                                <WellnessMetric
                                    icon={Zap}
                                    title="Development"
                                    value={babyMetrics?.development?.value}
                                    description={babyMetrics?.development?.description}
                                    reference={babyMetrics?.development?.reference}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3 text-blue-800">Parent's Wellness</h2>
                            <div className="space-y-4">
                                <WellnessMetric
                                    icon={Moon}
                                    title="Your Sleep"
                                    value={parentMetrics?.sleep?.value}
                                    description={parentMetrics?.sleep?.description}
                                    reference={parentMetrics?.sleep?.reference}
                                />
                                <WellnessMetric
                                    icon={Heart}
                                    title="Stress Level"
                                    value={parentMetrics?.stressLevel?.value}
                                    description={parentMetrics?.stressLevel?.description}
                                    reference={parentMetrics?.stressLevel?.reference}
                                />
                                <WellnessMetric
                                    icon={UserCheck}
                                    title="Self-Care"
                                    value={parentMetrics?.selfCare?.value}
                                    description={parentMetrics?.selfCare?.description}
                                    reference={parentMetrics?.selfCare?.reference}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-blue-800">Daily Rhythm</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <Sun className="w-6 h-6 text-yellow-500 mr-2"/>
                                    <span>Wake: {dashboardData?.dailyRhythm?.wakeTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <Moon className="w-6 h-6 text-blue-500 mr-2"/>
                                    <span>Bedtime: {dashboardData?.dailyRhythm?.bedTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2 text-blue-800">Wellness Insights</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Your baby's sleep pattern is improving. Keep up the consistent bedtime routine!</li>
                                <li>Consider going to bed 30 minutes earlier to increase your sleep duration.</li>
                                <li>Try incorporating a 10-minute meditation during your baby's morning nap for stress relief.</li>
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

export default ParentBabyWellnessDashboard;
