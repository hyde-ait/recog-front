// Import the functions you need from the SDKs you need

import * as firebase from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBSxqpPAa9agUgEFvKmaKY4X7y4dXG1hfU",
  authDomain: "agl-agni.firebaseapp.com",
  projectId: "agl-agni",
  storageBucket: "agl-agni.appspot.com",
  messagingSenderId: "1065419963052",
  appId: "1:1065419963052:web:abdb6f7dffaea8da647d09",
  /*apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_FIREBASE_APP_ID,*/
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const projectStorage = getStorage(app);
const projectFirestrore = getFirestore(app);
const db = getFirestore(app);

export { auth, db, projectFirestrore, projectStorage };
