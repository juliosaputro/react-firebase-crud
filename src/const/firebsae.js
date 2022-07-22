import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMd7_2Ajh7a-cCjMyY_mp8_u5VostcvCI",
  authDomain: "tabulu-3bccc.firebaseapp.com",
  projectId: "tabulu-3bccc",
  storageBucket: "tabulu-3bccc.appspot.com",
  messagingSenderId: "64000369053",
  appId: "1:64000369053:web:329ae7980a737c05e84f74",
  measurementId: "G-7RC6Y6Z6CS"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;