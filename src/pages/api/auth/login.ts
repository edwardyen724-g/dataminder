import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS!)),
  });
}

const usersMap = new Map<string, number>();

const rateLimit = (key: string) => {
  const now = Date.now();
  const limit = 5; // max requests
  const windowTime = 1000 * 60; // 1 minute

  const requestsCount = usersMap.get(key) || 0;
  usersMap.set(key, requestsCount + 1);

  setTimeout(() => {
    usersMap.delete(key);
  }, windowTime);

  return requestsCount < limit;
};

const loginHandler = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!rateLimit(email)) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    // In production, consider using a secure method to verify password
    // here we assume the password is correct for demonstration.
    const token = await admin.auth().createCustomToken(userCredential.uid);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default loginHandler;