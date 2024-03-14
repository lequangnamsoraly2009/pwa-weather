import firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyKYzmHDN0lbfbjEUg5CuHyVjnXUensV4",
  authDomain: "weather-soraly.firebaseapp.com",
  projectId: "weather-soraly",
  storageBucket: "weather-soraly.appspot.com",
  messagingSenderId: "20309992661",
  appId: "1:20309992661:web:2d213764f49a93fd596e5c",
  measurementId: "G-J14TCZTL9C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase