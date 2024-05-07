import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

/**
 * Adds data to a Firestore collection with the specified ID.
 * @param {string} collection - The name of the Firestore collection to add data to.
 * @param {string} id - The ID of the document to set.
 * @param {*} data - The data to set in the document.
 * @returns {Promise<{ result: void, error: any }>} A promise that resolves with the result of the operation and any error that occurs.
 */
export default async function addData(collection: string, id: string, data: any): Promise<{ result: any; error: any; }> {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Set the document with the provided data in the specified collection and ID
    result = await setDoc(doc(db, collection, id), data, {
      merge: true, // Merge the new data with existing document data
    });
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
