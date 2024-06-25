
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAvh3yVLUHW6dEG8SRwu5YkSjy1xPwBa2M",
  authDomain: "olx-clone-21a3c.firebaseapp.com",
  projectId: "olx-clone-21a3c",
  storageBucket: "olx-clone-21a3c.appspot.com",
  messagingSenderId: "1087018356194",
  appId: "1:1087018356194:web:04ffb11b3a99d7de6c7dbb",
  measurementId: "G-FJERNTWN09"
};

const firebaseApp  = initializeApp(firebaseConfig);

export default firebaseApp;