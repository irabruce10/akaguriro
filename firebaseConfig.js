// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAkQT4UQbJ5UnZgQSGKE5aJMOKofqjCqgQ',
  authDomain: 'apartmentstorage-20324.firebaseapp.com',
  projectId: 'apartmentstorage-20324',
  storageBucket: 'apartmentstorage-20324.firebasestorage.app',
  messagingSenderId: '973891081804',
  appId: '1:973891081804:web:0ad4021305a51576a8c6e9',
  measurementId: 'G-4ML1R9KRTS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
