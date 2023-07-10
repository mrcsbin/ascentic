import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwwLCb6Gjs0OBLuWz7_FPGW1jNmc5DEHI",
  authDomain: "ascentic-ca9b6.firebaseapp.com",
  projectId: "ascentic-ca9b6",
  storageBucket: "ascentic-ca9b6.appspot.com",
  messagingSenderId: "80249027565",
  appId: "1:80249027565:web:0c2fbd128a23d3fcf385e4",
  measurementId: "G-ZJ36Y94CGD",
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
