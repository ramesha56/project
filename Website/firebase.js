

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";  // Firestore import kiya

// // Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyCq1nMpoR5S24odATBEF5UKNGqTNJC-xmM",
//     authDomain: "recipes-24694.firebaseapp.com",
//     projectId: "recipes-24694",
//     storageBucket: "recipes-24694.appspot.com",
//     messagingSenderId: "348485202576",
//     appId: "1:348485202576:web:b3f2dda0b0040778769e15"
// };

// // Firebase Initialize
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app); // Firestore ko export kar rahe hain
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCq1nMpoR5S24odATBEF5UKNGqTNJC-xmM",
    authDomain: "recipes-24694.firebaseapp.com",
    projectId: "recipes-24694",
    storageBucket: "recipes-24694.appspot.com",
    messagingSenderId: "348485202576",
    appId: "1:348485202576:web:b3f2dda0b0040778769e15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
