// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqaSFGXg2W3hXc70H5NuOEV56EIyCFBXI",
  authDomain: "c0de-cb121.firebaseapp.com",
  projectId: "c0de-cb121",
  storageBucket: "c0de-cb121.appspot.com",
  messagingSenderId: "729604805105",
  appId: "1:729604805105:web:f74a74ef1259de1640b450",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export { signInWithPopup, provider, auth, GoogleAuthProvider };
