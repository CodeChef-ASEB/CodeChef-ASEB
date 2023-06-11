import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLudOEeKBZ-2DFpc7hNXahe5ekUQP3cUU",
  authDomain: "test-cgpa-calculator.firebaseapp.com",
  projectId: "test-cgpa-calculator",
  storageBucket: "test-cgpa-calculator.appspot.com",
  messagingSenderId: "480526974477",
  appId: "1:480526974477:web:3f3cb91dcd7e41570edf44",
  measurementId: "G-CH23LK98QX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    var uid = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        const gauge = document.querySelector(".gauge");
        const value = snapshot.child("cgpa").val();
        const numberElement = document.querySelector(".number");
        const DisplayName = document.querySelector(".green");
        gauge.style.setProperty("--actual-value", `${value}*10`);
        numberElement.textContent = value + " cgpa";
        var text = snapshot.child("name").val();
        DisplayName.innerHTML = "Hi,<br>" + text;
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // User is signed out
    // ...
  }
});
