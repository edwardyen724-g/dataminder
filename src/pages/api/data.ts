import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

interface AuthedRequest extends NextApiRequest {
  auth?: { uid: string };
}

const dataStore: Map<string, any[]> = new Map();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (!req.auth) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        const userData = dataStore.get(req.auth.uid) || [];
        return res.status(200).json(userData);
      
      case 'POST':
        const newData = req.body;
        if (!newData) {
          return res.status(400).json({ message: 'No data provided' });
        }
        
        const userDataStore = dataStore.get(req.auth.uid) || [];
        userDataStore.push(newData);
        dataStore.set(req.auth.uid, userDataStore);
        return res.status(201).json(newData);
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;