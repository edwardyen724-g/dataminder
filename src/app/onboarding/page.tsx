import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Onboarding: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Unlock the Power of Data Management — No Tech Skills Needed!</h1>
            <p className="text-lg text-center mb-6">
                Welcome to DataMinder's onboarding tutorial. Follow along to learn how to effectively manage your client project databases with ease.
            </p>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-2">Tutorial Highlights</h2>
                <ul className="list-disc pl-5 mb-6">
                    <li>Intuitive multi-table data visualizer to see relationships at a glance.</li>
                    <li>Drag-and-drop interface for easy data editing and rearrangement.</li>
                    <li>Dynamic linking of records across tables with one-click functionality.</li>
                    <li>Basic reporting tools to summarize data and visualize trends.</li>
                </ul>
                <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                    Start Tutorial
                </button>
            </div>
        </div>
    );
};

export default Onboarding;