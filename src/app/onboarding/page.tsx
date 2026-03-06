import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const OnboardingPage: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Don't proceed if loading
    if (!user) {
      // Redirect to login page if the user is not authenticated
      window.location.href = '/login';
    }
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">Unlock the Power of Data Management — No Tech Skills Needed!</h1>
      <p className="text-lg mb-6">Simplified multi-table data management for non-technical users.</p>
      <div className="bg-white shadow-md rounded p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Welcome to DataMinder!</h2>
        <p className="mb-4">This tutorial will guide you through our key features:</p>
        <ul className="list-disc ml-5 mb-4">
          <li>Intuitive multi-table data visualizer to see relationships at a glance.</li>
          <li>Drag-and-drop interface for easy data editing and rearrangement.</li>
          <li>Dynamic linking of records across tables with one-click functionality.</li>
          <li>Basic reporting tools to summarize data and visualize trends.</li>
          <li>User-friendly onboarding tutorial to get started quickly.</li>
        </ul>
        <p className="text-center mb-4">Let’s get started!</p>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Start Tutorial
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;