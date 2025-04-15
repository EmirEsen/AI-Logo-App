// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAo7H0JtSISL4nchmysELfzrHjiSmJZvXA",
    authDomain: "feraset-case-120ad.firebaseapp.com",
    projectId: "feraset-case-120ad",
    storageBucket: "feraset-case-120ad.firebasestorage.app",
    messagingSenderId: "248670582615",
    appId: "1:248670582615:web:6c3ceba00ef48946a43012",
    measurementId: "G-S2KT720FCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }