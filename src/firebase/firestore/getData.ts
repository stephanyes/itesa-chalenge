import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, query, or, where, getDocs, orderBy, startAfter, limit, DocumentData } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

// Function to retrieve a document from a Firestore collection
export async function getDocument(collection: any, id: any) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}

export async function getLatestTransactions(collectionName: string, clause:string) {
  let transactions:any[] = [];
  let error = null;
  const q = query(collection(db, collectionName))
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Check if the document's address matches the specified address
      if (data.sender === clause) {
          // If the address matches, add the document data to the transactions array
          transactions.push(data);
      }
    });
    // // Sort transactions by amount in descending order
    // transactions.sort();

    // Get the top five most expensive transactions
    transactions = transactions.slice(0, 5);
  } catch (e) {
    error = e
  }
  return { transactions, error }
} 

export async function getTransactionById(collectionName: string, txID:string) {
  let transactions:any[] = [];
  let error = null;
  const q = query(collection(db, collectionName))
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Check if the document's address matches the specified address
      if (data.txID === txID) {
          // If the address matches, add the document data to the transactions array
          transactions.push(data);
      }
    });
    
  } catch (e) {
    error = e
  }
  return { transactions, error }
} 

export async function getTopThreeTransactions(collectionName: string, clause:string) {
  let transactions:any[] = [];
  let error = null;
  const q = query(collection(db, collectionName))
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Check if the document's address matches the specified address
      if (data.sender === clause && data.status === "DONE") {
          // If the address matches, add the document data to the transactions array
          transactions.push(data);
      }
    });
    // Sort transactions by amount in descending order
    transactions.sort((a, b) => b.amount - a.amount);

    // Get the top five most expensive transactions
    transactions = transactions.slice(0, 3);
  } catch (e) {
    error = e
  }
  return { transactions, error }
} 

export async function getAllTransactions(collectionName: string, clause: string) {
  let transactions: any[] = [];
  let error = null;
  const q = query(collection(db, collectionName));
  try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Check if the document's sender or recipient matches the specified clause
          if (data.sender === clause || data.recipient === clause) {
              // If the sender or recipient matches, add the document data to the transactions array
              transactions.push(data);
          }
      });
  } catch (e) {
      error = e;
  }
  return { transactions, error };
} 

export async function getPaginatedData(entity: any) {

  const { 
    collection: collectionName,
    record_limits, 
    pageAction, 
    page, 
    fields, 
    orderByField,
    orderByOrder, 
    whereFields, 
    firstIndex: beforeThis,
    lastIndex: afterThis
  } = entity

  

  const collectionRef = collection(db, collectionName);
  let queryRef = query(collectionRef);

  if (whereFields && whereFields.length > 0) {
    queryRef = query(
      queryRef,
      or(
        where("sender", "==", whereFields[0].value),
        where("recipient", "==", whereFields[0].value),
      ),
    )
  }
  console.log(page, "PAGE")
  if (page > 1) {
    if (pageAction == "NEXT") {
      console.log("ultimo indice ", afterThis);
      queryRef = query(collectionRef, orderBy(orderByField, orderByOrder), startAfter(afterThis), limit(record_limits));
    }

    if (pageAction == "PREVIOUS") {
      console.log("ultimo indice ", afterThis);
      queryRef = query(collectionRef, orderBy(orderByField, orderByOrder), startAfter(beforeThis), limit(record_limits));
    }
  } else {
    queryRef = query(
      collectionRef,
      or(
        where("sender", "==", whereFields[0].value),
        where("recipient", "==", whereFields[0].value)
      ), 
      limit(record_limits));
    }
  // QueryFieldFilterConstraint
  const querySnapshot = await getDocs(queryRef);
  const records = querySnapshot.docs.map((doc) => {
    const record = doc.data();
    // What fields do i want to render? entity.fields are the one
    const filtred = Object.keys(fields).reduce((obj, field) => {
      //@ts-ignore
      obj[field] = record[field];
      // console.log("obj ", obj)
      // console.log("field ", field)
      return obj;
    }, {});
    // console.log(filtred, "FILTRAD")
    return filtred;
  })
  return records
}

function startBefore(previousSnapshot: any): import("@firebase/firestore").QueryNonFilterConstraint {
  throw new Error("Function not implemented.");
}
