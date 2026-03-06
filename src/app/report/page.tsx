import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/lib/firebase'; // Assuming you have a firebase config file
import { collection, getDocs } from 'firebase/firestore';

interface Report {
  id: string;
  title: string;
  description: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const reportsCollection = collection(db, 'reports');
            const reportsSnapshot = await getDocs(reportsCollection);
            const reportsData: Report[] = reportsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Report[];
            setReports(reportsData);
          } else {
            setError('User not authenticated');
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Reports</h1>
      <ul className="mt-4">
        {reports.map(report => (
          <li key={report.id} className="border p-2 mb-2 rounded">
            <h2 className="font-semibold">{report.title}</h2>
            <p>{report.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;