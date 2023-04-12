import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export {app, db}