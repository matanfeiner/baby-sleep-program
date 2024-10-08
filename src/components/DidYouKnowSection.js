import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const DidYouKnowSection = ({ onClose }) => {
    const data = [
        { month: 'Today', avgUser: 6, ourUsers: 6 },
        { month: '0.5', avgUser: 5.5, ourUsers: 4 },
        { month: '1', avgUser: 5, ourUsers: 2 },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Did you know?</h2>

                <p className="text-lg mb-4">
                    <span className="font-bold text-blue-600">65%</span> of parents who started their <span className="font-bold">BabyRestWell Plan</span> saw improvements in their baby's sleep within the <span className="font-bold">first month*</span>
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-lg">
                        We want you to find success so we are offering an <span className="font-bold">additional discount</span> on your Baby Sleep Plan.
                    </p>
                </div>

                <div className="mb-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 6]} />
                            <Line type="monotone" dataKey="avgUser" stroke="#fbbf24" strokeWidth={2} name="Average Baby" />
                            <Line type="monotone" dataKey="ourUsers" stroke="#3b82f6" strokeWidth={2} name="BabyRestWell Users" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-between text-sm mb-4">
                    <span>Today</span>
                    <span>1-st Month</span>
                </div>

                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                        <span>Average Baby</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>BabyRestWell Users</span>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                    * Based on the data of users who log their baby's progress in the app
                </p>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300"
                    onClick={onClose}
                >
                    GOT IT
                </button>
            </div>
        </div>
    );
};

export default DidYouKnowSection;