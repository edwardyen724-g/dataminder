import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import initFirebaseAdmin from '../../../lib/firebaseAdmin'; // Adjust the path as necessary

// Initialize Firebase Admin SDK
initFirebaseAdmin();

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function register(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    // Create a new user with the email and password
    const userRecord = await getAuth().createUser({
      email,
      password,
    });

    return res.status(201).json({ uid: userRecord.uid });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}