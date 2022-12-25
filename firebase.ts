// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi7uOedlppM3tKMgm_g4GAodbFZG0mT8o",
    authDomain: "todo-list-1b93f.firebaseapp.com",
    projectId: "todo-list-1b93f",
    storageBucket: "todo-list-1b93f.appspot.com",
    messagingSenderId: "225301907672",
    appId: "1:225301907672:web:fef940273953ad85ddefad",
    measurementId: "G-124L83M9S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);