import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { Firestore } from 'firebase-admin/firestore';

interface AuthedRequest extends NextApiRequest {
  uid?: string | null;
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

if (!admin.apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = new Firestore();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const authToken = req.headers.authorization?.split('Bearer ')[1];
    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = await getAuth().verifyIdToken(authToken);
    req.uid = decodedToken.uid;

    const userData = await db.collection('users').doc(req.uid).get();

    if (!userData.exists) {
      return res.status(404).json({ message: 'User data not found' });
    }

    res.status(200).json(userData.data());
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;