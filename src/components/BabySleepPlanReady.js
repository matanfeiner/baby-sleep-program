import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts';

const BabySleepPlanReady = ({ parentName = 'NAME', babyName = 'BABY', onContinue }) => {
    const data = [
        { week: 'Now', sleepHours: 6 },
        { week: 'Week 1', sleepHours: 7 },
        { week: 'Week 2', sleepHours: 8.5 },
        { week: 'Week 3', sleepHours: 9.5 },
        { week: 'Week 4', sleepHours: 10 },
    ];

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">
                <span className="text-blue-600">{parentName},</span>
                <br />
                your 4-week Sleep Plan for
                <br />
                <span className="text-blue-600">{babyName}</span> is ready!
            </h1>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Expected Sleep Hours</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="week" />
                            <YAxis domain={[6, 12]} label={{ value: 'Sleep Hours', angle: -90, position: 'insideLeft' }} />
                            <Line
                                type="monotone"
                                dataKey="sleepHours"
                                stroke="url(#colorGradient)"
                                strokeWidth={3}
                                dot={false}
                            />
                            <ReferenceDot x="Now" y={6} r={5} fill="#f87171" stroke="none" />
                            <ReferenceDot x="Week 4" y={10} r={5} fill="#60a5fa" stroke="none" />
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#f87171" />
                                    <stop offset="25%" stopColor="#fbbf24" />
                                    <stop offset="50%" stopColor="#34d399" />
                                    <stop offset="75%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#818cf8" />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                This chart is for illustrative purposes only. Individual results may vary.
            </p>

            <button
                onClick={onContinue}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300"
            >
                CONTINUE
            </button>
        </div>
    );
};

export default BabySleepPlanReady;