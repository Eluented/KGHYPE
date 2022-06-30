import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

import { createUserWithEmailAndPassword } from "firebase/compat/auth"

import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDnONncfPfV6oV3bX6uVgFz8YI7sfnK1GE",
    authDomain: "kghype-a5192.firebaseapp.com",
    projectId: "kghype-a5192",
    storageBucket: "kghype-a5192.appspot.com",
    messagingSenderId: "875683306614",
    appId: "1:875683306614:web:dd997e915b20c413c19357",
    measurementId: "G-7FQE221771"
})

export const auth = app.auth();
export const db = app.database();
export default app;