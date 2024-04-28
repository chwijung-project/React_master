// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzUMfPRhMnNaab-ruDqcKU4LvlGsEi7nc",
  authDomain: "cj-project-33541.firebaseapp.com",
  projectId: "cj-project-33541",
  storageBucket: "cj-project-33541.appspot.com",
  messagingSenderId: "295977257186",
  appId: "1:295977257186:web:3a19f4b4d655cea25f36bb",
  measurementId: "G-DM5ZS9E9Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };