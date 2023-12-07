// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIpPvFSdqEKapPRm9Q8TjEhUCaop39jVQ",
  authDomain: "earthquake-detection-adxl.firebaseapp.com",
  databaseURL: "https://earthquake-detection-adxl-default-rtdb.firebaseio.com",
  projectId: "earthquake-detection-adxl",
  storageBucket: "earthquake-detection-adxl.appspot.com",
  messagingSenderId: "382436219205",
  appId: "1:382436219205:web:f2758b741ee6a77a3e862c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

export const storage = getStorage(app);