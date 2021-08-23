import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqzPS8hk3y7h1B3m1c8zpmF4pfz2DOtG0",
    authDomain: "solo-hackathon-trello.firebaseapp.com",
    databaseURL:
        "https://solo-hackathon-trello-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "solo-hackathon-trello",
    storageBucket: "solo-hackathon-trello.appspot.com",
    messagingSenderId: "196344635975",
    appId: "1:196344635975:web:e4f30b550a2c9144ad0762",
    measurementId: "G-19CLZ6Z7QC",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
