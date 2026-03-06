import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Unlock the Power of Data Management — No Tech Skills Needed!</h1>
        <p className="mt-4 text-lg text-gray-600">Simplified multi-table data management for non-technical users.</p>
      </header>
      
      <main className="space-y-10">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">MVP Features</h2>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>Intuitive multi-table data visualizer that allows users to see relationships at a glance.</li>
            <li>Drag-and-drop interface for easy data editing and rearrangement.</li>
            <li>Dynamic linking of records across tables with one-click functionality.</li>
            <li>Basic reporting tools to summarize data and visualize trends.</li>
            <li>User-friendly onboarding tutorial to get started quickly.</li>
          </ul>
        </section>

        <section className="text-center">
          <h3 className="text-xl font-medium text-gray-700">Get Started Today!</h3>
          <p className="mt-2 text-gray-500">Join freelancers like you in managing client project databases effortlessly!</p>
          <button className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Sign Up
          </button>
        </section>
      </main>

      <footer className="mt-12 text-gray-500">
        <p>&copy; {new Date().getFullYear()} DataMinder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;