import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../lib/firebase';
import ReportTable from '../../components/ReportTable';
import TutorialModal from '../../components/TutorialModal';

const auth = getAuth(app);

const ReportPage: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Check if this is the user's first time visiting the Reports page
        const hasVisited = localStorage.getItem('hasVisitedReports');
        if (!hasVisited) {
          setShowTutorial(true);
          localStorage.setItem('hasVisitedReports', 'true');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Please sign in to access the reports.</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Unlock the Power of Data Management — No Tech Skills Needed!</h1>
      <ReportTable userId={user.uid} />
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </div>
  );
};

export default ReportPage;