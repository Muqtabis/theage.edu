import { initializeApp } from "firebase/app";
import { 
    getAuth, signInAnonymously, onAuthStateChanged 
} from "firebase/auth";
import { 
    getFirestore, setLogLevel 
} from "firebase/firestore";

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyAZwp5NKFSH_f9G2zxQDvVeqgLD41QEufY",
    authDomain: "theage-edu-website.firebaseapp.com",
    projectId: "theage-edu-website",
    storageBucket: "theage-edu-website.firebasestorage.app",
    messagingSenderId: "400033597451",
    appId: "1:400033597451:web:c6fac788782ae05c521f0e",
    measurementId: "G-VQL2924JMQ"
};

// --- Initialize Firebase ---
let app, auth, db;
try {
    // Check if the app is already initialized (common in React development)
    if (!app) {
        app = initializeApp(firebaseConfig);
    }
    auth = getAuth(app);
    db = getFirestore(app);
    setLogLevel('debug');
    
    // Crucial check: Log the existence of the DB object
    if (db) {
        console.log("✅ Firebase Initialized successfully. DB is ready.");
    } else {
        console.error("❌ DB object is null after initialization.");
    }
} catch (error) {
    console.error("❌ Error initializing Firebase:", error);
}

// --- Exports ---
export { 
    auth, 
    db, 
    signInAnonymously, 
    onAuthStateChanged,
};