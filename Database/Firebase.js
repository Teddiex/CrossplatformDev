// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD1USqgoE8DgJ0f56c0febcoRekQdUAHlQ",

  authDomain: "crossplatformassignment.firebaseapp.com",

  projectId: "crossplatformassignment",

  storageBucket: "crossplatformassignment.appspot.com",

  messagingSenderId: "695441613652",

  appId: "1:695441613652:web:81db8dfb20da50727b1ec1",

  measurementId: "G-L0JQ14PK5C"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export { firestore} ;
