import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import initFirebaseAdmin from '@/lib/firebaseAdmin';
import { setLoginRateLimit } from '@/lib/rateLimit';

initFirebaseAdmin();

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const rateLimit = new Map<string, number>();

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // Rate limiting logic
    if (!setLoginRateLimit(rateLimit, clientIp as string)) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }

    const { email, password } = req.body;

    const userRecord = await getAuth().getUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ error: 'User not found' });
    }

    const token = await getAuth().createCustomToken(userRecord.uid);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}