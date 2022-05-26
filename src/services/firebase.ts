import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBOJw-7JcmZrua6IS0OWWKCyOwV6LtFt2s",
    authDomain: "ecommercial-8d9ee.firebaseapp.com",
    projectId: "ecommercial-8d9ee",
    storageBucket: "ecommercial-8d9ee.appspot.com",
    messagingSenderId: "213082501110",
    appId: "1:213082501110:web:f93b9dad0ed631ae2a21d7",
    measurementId: "G-BRSDBV7BPE"
};
initializeApp(firebaseConfig);
export default firebase;