import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyClTmgkbUPjajlYJh7L7gYWTYjvB5_Tlj8",
  authDomain: "todo-list-b23e7.firebaseapp.com",
  projectId: "todo-list-b23e7",
  storageBucket: "todo-list-b23e7.appspot.com",
  messagingSenderId: "38915050489",
  appId: "1:38915050489:web:c484e5dd388da1bfe98b28",
  measurementId: "G-03P2N2TE1R",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);