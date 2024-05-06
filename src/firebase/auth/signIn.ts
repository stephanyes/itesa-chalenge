import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

// Get the authentication instance using the Firebase app
export const auth = getAuth(firebase_app);

// Function to sign in with email and password
export async function signIn(email: string, password: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  try {
    result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
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
  return { result, error }; // Return the sign-in result and error (if any)
}

