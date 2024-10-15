import React from 'react';
import { Moon, Sun, Heart, Battery, Zap, UserCheck, Baby, ChevronRight } from 'lucide-react';

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
                    reference === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
            }`}>
                {reference}
            </div>
        </div>
    </div>
);

const ParentBabyWellnessDashboard = ({ formData }) => {
    const inferSleepDuration = () => {
        const cryingAtBed = formData.cryingAtBed === 'Yes';
        const nightWakings = formData.nightWakings === 'Frequently' || formData.nightWakings === 'Sometimes';

        if (!cryingAtBed && !nightWakings) {
            return { value: "Good", description: "Baby seems to sleep well", reference: "Good" };
        } else if (cryingAtBed || nightWakings) {
            return { value: "Fair", description: "Some sleep challenges present", reference: "Fair" };
        } else {
            return { value: "Needs Improvement", description: "Multiple sleep issues identified", reference: "Poor" };
        }
    };

    const inferSleepQuality = () => {
        const easilyFallAsleep = formData.easilyFallAsleep === 'Yes';
        const consistentSchedule = formData.consistentSchedule === 'Yes';

        if (easilyFallAsleep && consistentSchedule) {
            return { value: "Good", description: "Consistent and easy sleep routine", reference: "Good" };
        } else if (easilyFallAsleep || consistentSchedule) {
            return { value: "Fair", description: "Some aspects of sleep are good", reference: "Fair" };
        } else {
            return { value: "Inconsistent", description: "Sleep quality needs improvement", reference: "Poor" };
        }
    };

    const inferDevelopment = () => {
        const meetingMilestones = formData.meetingMilestones === 'Yes';
        const activePlaytime = formData.activePlaytime === 'Yes';

        if (meetingMilestones && activePlaytime) {
            return { value: "On Track", description: "Meeting milestones and actively playing", reference: "Good" };
        } else if (meetingMilestones || activePlaytime) {
            return { value: "Progressing", description: "Some developmental aspects are good", reference: "Fair" };
        } else {
            return { value: "Needs Attention", description: "May need more developmental support", reference: "Poor" };
        }
    };

    const inferParentSleep = () => {
        const parentRested = formData.parentRested === 'Yes';
        const parentSleepInterruptions = formData.parentSleepInterruptions === 'Rarely' || formData.parentSleepInterruptions === 'Never';

        if (parentRested && parentSleepInterruptions) {
            return { value: "Well-Rested", description: "Parent gets good quality sleep", reference: "Good" };
        } else if (parentRested || parentSleepInterruptions) {
            return { value: "Adequate", description: "Parent's sleep is okay but could improve", reference: "Fair" };
        } else {
            return { value: "Sleep-Deprived", description: "Parent's sleep needs improvement", reference: "Poor" };
        }
    };

    const inferStressLevel = () => {
        const feelOverwhelmed = formData.feelOverwhelmed === 'Rarely' || formData.feelOverwhelmed === 'Never';
        const copingWell = formData.copingWell === 'Yes';

        if (feelOverwhelmed && copingWell) {
            return { value: "Low", description: "Managing stress well", reference: "Good" };
        } else if (feelOverwhelmed || copingWell) {
            return { value: "Moderate", description: "Some stress present but manageable", reference: "Fair" };
        } else {
            return { value: "High", description: "Experiencing significant stress", reference: "Poor" };
        }
    };

    const inferSelfCare = () => {
        const takingBreaks = formData.takingBreaks === 'Yes';
        const supportSystem = formData.supportSystem === 'Yes';

        if (takingBreaks && supportSystem) {
            return { value: "Good", description: "Practicing self-care regularly", reference: "Good" };
        } else if (takingBreaks || supportSystem) {
            return { value: "Fair", description: "Some self-care practices in place", reference: "Fair" };
        } else {
            return { value: "Needs Improvement", description: "More focus on self-care recommended", reference: "Poor" };
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Wellness Dashboard</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Baby's Wellness</h2>
                <div className="space-y-4">
                    <WellnessMetric
                        icon={Moon}
                        title="Sleep Duration"
                        {...inferSleepDuration()}
                    />
                    <WellnessMetric
                        icon={Battery}
                        title="Sleep Quality"
                        {...inferSleepQuality()}
                    />
                    <WellnessMetric
                        icon={Zap}
                        title="Development"
                        {...inferDevelopment()}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Parent's Wellness</h2>
                <div className="space-y-4">
                    <WellnessMetric
                        icon={Moon}
                        title="Your Sleep"
                        {...inferParentSleep()}
                    />
                    <WellnessMetric
                        icon={Heart}
                        title="Stress Level"
                        {...inferStressLevel()}
                    />
                    <WellnessMetric
                        icon={UserCheck}
                        title="Self-Care"
                        {...inferSelfCare()}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Daily Rhythm</h2>
                <p className="text-gray-600">Based on your responses, we'll create a personalized daily rhythm to help improve sleep patterns and overall wellness for both you and your baby.</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Wellness Insights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {inferSleepDuration().reference !== 'Good' && (
                        <li>Consider adjusting your baby's sleep routine to improve overall sleep duration.</li>
                    )}
                    {inferParentSleep().reference !== 'Good' && (
                        <li>Try to prioritize your own sleep when possible. Even short naps can be beneficial.</li>
                    )}
                    {inferStressLevel().reference === 'Poor' && (
                        <li>Incorporate stress-reduction techniques like deep breathing or short meditation sessions into your daily routine.</li>
                    )}
                    {inferSelfCare().reference !== 'Good' && (
                        <li>Make time for self-care activities, even if it's just a few minutes each day.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ParentBabyWellnessDashboard;