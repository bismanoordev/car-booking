import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDfQAQENegwsGUZ41LA2sFAZigbkPsfxMc",
  authDomain: "bookify-29a0c.firebaseapp.com",
  projectId: "bookify-29a0c",
  storageBucket: "bookify-29a0c.appspot.com",
  messagingSenderId: "553925856030",
  appId: "1:553925856030:web:d90b640a09a60baa60570f",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  
  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logoutUser = () => signOut(auth);

  const updateUserProfile = (updates) =>
    updateProfile(auth.currentUser, updates);

  
  const addBooking = async (bookingData) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        userId: user ? user.uid : "guest",
        createdAt: serverTimestamp(),
      });

      console.log(" Booking saved with ID:", docRef.id);
     
    } catch (error) {
      console.error(" Error adding booking:", error);
      return false; 
    }
  };


  const getBookings = async () => {
    const snapshot = await getDocs(collection(db, "bookings"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        user,
        loading,
        signupUser,
        logoutUser,
        updateUserProfile,
        addBooking,
        getBookings,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
