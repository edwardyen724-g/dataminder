import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { setDoc, doc } from "firebase-admin/firestore";
import { firestore } from "@/lib/firebase"; // Assuming firestore is initialized in this path

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);
initializeApp({
  credential: cert(serviceAccount),
});

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

const usersMap = new Map<string, number>();

const rateLimit = (email: string): boolean => {
  const currentTime = Date.now();
  const limit = 5; // Limit requests to 5 per minute
  const timeWindow = 60 * 1000; // 1 minute

  if (!usersMap.has(email)) {
    usersMap.set(email, currentTime);
    return true;
  }

  const lastRequestTime = usersMap.get(email)!;
  if (currentTime - lastRequestTime < timeWindow) {
    return false;
  }

  usersMap.set(email, currentTime);
  return true;
};

export default async function register(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;

  if (!rateLimit(email)) {
    return res.status(429).json({ message: "Too Many Requests" });
  }

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
    });

    await setDoc(doc(firestore, "users", userRecord.uid), {
      email,
      createdAt: new Date(),
    });

    res.status(201).json({ uid: userRecord.uid });
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
  }
}