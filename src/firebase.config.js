import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyA6ZMkHPeDairz73vHZWvubUMn83x2R0rY",
    authDomain: "the-dragon-house.firebaseapp.com",
    projectId: "the-dragon-house",
    storageBucket: "the-dragon-house.appspot.com",
    messagingSenderId: "412508539624",
    appId: "1:412508539624:web:8934801980d2d1d3da175d"
};

const app = initializeApp(firebaseConfig);

export default app;