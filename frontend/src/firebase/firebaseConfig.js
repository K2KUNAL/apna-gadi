// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyAycwaFtn_HPHdSE9SwGIVWUHMK8XZ9rag",
  
    authDomain: "myauthapp-2efb5.firebaseapp.com",
  
    projectId: "myauthapp-2efb5",
  
    storageBucket: "myauthapp-2efb5.firebasestorage.app",
  
    messagingSenderId: "1065989745170",
  
    appId: "1:1065989745170:web:0b1cebfc9b73454aef06cb",
  
    measurementId: "G-XP48WFMGRV"
  
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
