import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}create-wallet`);
    const { address, private_key, public_key, balance } = await response.json()
    const uid = result.user.uid

    await setDoc(doc(db, "users", uid), {
      user: email,
      address,
      uid,
      public: public_key,
      private: private_key,
      balance
    });

  } catch (e:any) {
    if (e.code === 'auth/invalid-credential') {
      // Handle the specific error caused by invalid credentials
      console.error('Invalid credentials provided.');
      error = 'Invalid credentials'
    } else {
      // Handle other Firebase authentication errors
      console.error('Firebase authentication error:', e.message);
      error = e;
    }
  }

  return { result, error }; // Return the sign-up result and error (if any)
}
