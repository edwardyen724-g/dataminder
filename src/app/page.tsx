'use client';

import React from 'react';
import { useAuth } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

const Page: React.FC = () => {
    const [user, loading, error] = useAuth(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-5xl font-bold text-center">
                Unlock the Power of Data Management — <br />
                No Tech Skills Needed!
            </h1>
            <p className="mt-4 text-xl text-center text-gray-600">
                Simplified multi-table data management for non-technical users.
            </p>
            <div className="mt-8 space-y-4">
                <Link href="/signup" className="btn btn-primary">
                    Get Started
                </Link>
                {user ? (
                    <Link href="/dashboard" className="btn btn-secondary">
                        Go to Dashboard
                    </Link>
                ) : (
                    <p className="text-sm text-gray-500">Sign up to manage your projects easily.</p>
                )}
            </div>
            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold">MVP Features</h2>
                <ul className="mt-4 space-y-2">
                    <li>✅ Intuitive multi-table data visualizer to see relationships at a glance.</li>
                    <li>✅ Drag-and-drop interface for easy data editing and rearrangement.</li>
                    <li>✅ Dynamic linking of records across tables with one-click functionality.</li>
                    <li>✅ Basic reporting tools to summarize data and visualize trends.</li>
                    <li>✅ User-friendly onboarding tutorial to get started quickly.</li>
                </ul>
            </section>
        </main>
    );
};

export default Page;