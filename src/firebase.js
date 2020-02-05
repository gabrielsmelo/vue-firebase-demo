import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDhuH7o1OJPxiNChAIZNI0wVVuR0QcplQM",
  authDomain: "fir-vue-demo-27827.firebaseapp.com",
  databaseURL: "https://fir-vue-demo-27827.firebaseio.com",
  projectId: "fir-vue-demo-27827",
  storageBucket: "fir-vue-demo-27827.appspot.com",
  messagingSenderId: "160192373859"
});

export const db = firebaseApp.firestore();