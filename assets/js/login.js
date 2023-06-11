import {
  initializeApp,
  getApp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  child, 
  get
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  setPersistence
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
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
console.log(app);

//----- New Registration code start
document.getElementById("SignUp").addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var regno = document.getElementById("regno").value;
  var email = document.getElementById("email").value;
  var cgpa = document.getElementById("cgpa").value;
  var password = document.getElementById("password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      set(ref(database, "users/" + user.uid), {
        name: name,
        regno: regno,
        cgpa: cgpa,
        email: email,
        password: password,
      });
      alert("Registration successfully!!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
      alert(error);
    });
});
//----- End

//----- Login code start
document.getElementById("LogIn").addEventListener("click", function () {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alert(user.email + " Login successfully!!!");
      window.location.replace("home.html");
      //document.getElementById("logout").style.display = "block";
      // ...
      const user1 = auth.currentUser;
      var id = user1.uid;
      if (user1) {
        console.log(user1.name);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
      } else {
        console.log("no");
        // No user is signed in.
      }

      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

document.getElementById("forgot").addEventListener("click", function () {
  alert("Password reset email sent!");
  var email = document.getElementById("login_email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
document.getElementById("logout").addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      console.log("Logged Out");
      alert("Sign-out successful.");
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.log("An error happened.");
    });
});
