import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDTFfkt7xcfytmhhpduP2bjr-W97g9fuLc",
    authDomain: "vuedone-todo-app.firebaseapp.com",
    projectId: "vuedone-todo-app",
    storageBucket: "vuedone-todo-app.firebasestorage.app",
    messagingSenderId: "768335924017",
    appId: "1:768335924017:web:6c44f245eeaf801552be10",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
