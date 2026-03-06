import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase'; // import firebase client SDK
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Please <Link href="/login">log in</Link> to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">Welcome to DataMinder, {user.displayName || user.email}!</h1>
      <p className="mt-4">Unlock the Power of Data Management — No Tech Skills Needed!</p>
      
      <h2 className="mt-8 text-xl font-semibold">Features:</h2>
      <ul className="list-disc pl-5 mt-2">
        <li>Intuitive multi-table data visualizer that allows users to see relationships at a glance.</li>
        <li>Drag-and-drop interface for easy data editing and rearrangement.</li>
        <li>Dynamic linking of records across tables with one-click functionality.</li>
        <li>Basic reporting tools to summarize data and visualize trends.</li>
        <li>User-friendly onboarding tutorial to get started quickly.</li>
      </ul>

      <Link href="/data" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Go to Data Management
      </Link>
    </div>
  );
};

export default Dashboard;