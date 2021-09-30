import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "@firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAIjnGE8nqdHDyNSGerOI6B3p_JLZZq-IQ",
    authDomain: "booking-hotel-app-fbd6a.firebaseapp.com",
    projectId: "booking-hotel-app-fbd6a",
    storageBucket: "booking-hotel-app-fbd6a.appspot.com",
    messagingSenderId: "592864550267",
    appId: "1:592864550267:web:a13e7b8dde8a1f1d0eb1de",
    measurementId: "G-7MH5NCZ3KZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase();

export { app, auth, db}

