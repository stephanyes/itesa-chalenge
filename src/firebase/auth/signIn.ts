import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

/**
 * The Firebase authentication instance.
 * @type Firebase Auth
 */
//@ts-ignore
export const auth = getAuth(firebase_app);

/**
 * Signs in a user with the provided email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{ result: import("firebase/auth").UserCredential | null, error: string | null }>} A promise that resolves with the sign-in result and error (if any).
 */
export async function signIn(email: string, password: string) {
  let result = null; // Variable to store the sign-in result
  let error = null; // Variable to store any error that occurs

  try {
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
  } catch (e: any) {
    if (e.code === 'auth/invalid-credential') {
      // Handle the specific error caused by invalid credentials
      console.error('Invalid credentials provided.');
      error = 'Invalid credentials';
    } else {
      // Handle other Firebase authentication errors
      console.error('Firebase authentication error:', e.message);
      error = e.message;
    }
  }
  return { result, error }; // Return the sign-in result and error (if any)
}
