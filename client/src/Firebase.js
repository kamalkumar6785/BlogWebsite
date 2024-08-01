// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANKJyT9kGXTYDpGYKvWIJCyaEfUjedTUU",
    authDomain: "ytclone-9dfc3.firebaseapp.com",
    projectId: "ytclone-9dfc3",
    storageBucket: "ytclone-9dfc3.appspot.com",
    messagingSenderId: "552970524920",
    appId: "1:552970524920:web:3cbb7fdd60a0492691430d",
    measurementId: "G-0GXRL389LH"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
