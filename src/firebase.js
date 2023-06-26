import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import { config } from "../../server/config/secret";

const firebaseConfig = {
  apiKey: "AIzaSyDfJXy6DRa9Li3ecWlfoTV4MrGScurT1eY",
//   apiKey: `${config.fierbaseKey}`,
  authDomain: "video-633ed.firebaseapp.com",
  projectId: "video-633ed",
  storageBucket: "video-633ed.appspot.com",
  messagingSenderId: "334262752137",
  appId: "1:334262752137:web:a0579ad6c48af85ae80758"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;