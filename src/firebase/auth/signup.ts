import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import firebase_app from "../config";
import { UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const db = getFirestore(firebase_app);
const auth = getAuth(firebase_app);

/**
 * Signs up a user with the provided email and password, and creates a corresponding wallet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{ result: UserCredential | null, error: string | null }>} A promise that resolves with the sign-up result and error (if any).
 */
export default async function signUp(email: string, password: string): Promise<{ result: UserCredential | null; error: string | null; }> {
  let result = null; // Variable to store the sign-up result
  let error = null; // Variable to store any error that occurs

  try {
    result = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${apiUrl}/create-wallet`);

    const { address, private_key, public_key, balance } = await response.json()
    const uid = result.user.uid

    // Add user document to Firestore
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

  return { result, error };
}
