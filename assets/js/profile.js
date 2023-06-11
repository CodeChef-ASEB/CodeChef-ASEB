import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as sRef,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import {
  getDatabase,
  ref,
  child,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
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
const database = getDatabase(app);

var cpy;
var name1;

onAuthStateChanged(auth, (user) => {
  if (user) {
    var uid = user.uid;
    cpy = uid;
    const dbRef = ref(getDatabase());
    const stRef = sRef(getStorage());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        const name = document.querySelector("#name");
        name1 = snapshot.child("name").val();
        name.innerHTML = snapshot.child("name").val();
        document.getElementById("regno").value = snapshot.child("regno").val();
        document.getElementById("email").value = snapshot.child("email").val();
        document.getElementById("cgpa").value = snapshot.child("cgpa").val();
        document.getElementById("branch").value = snapshot
          .child("branch")
          .val();
        document.getElementById("semester").value = snapshot
          .child("semester")
          .val();
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const storage = getStorage();
    getDownloadURL(sRef(storage, `${uid}/profilePicture`))
      .then(function (url) {
        // Set the profile picture URL as the src attribute of the <img> element
        var profilePic = document.getElementById("output");
        profilePic.src = url;
      })
      .catch(function (error) {
        // Handle any errors
        console.log(error);
      });
  } else {
    // User is signed out
    // ...
  }
});

const profilePic = document.querySelector(".profile-pic");
const semesterInput = document.getElementById("semester");
const regNoInput = document.getElementById("regno");
const branchInput = document.getElementById("branch");
const cgpaInput = document.getElementById("cgpa");
const emailInput = document.getElementById("email");
const updateBtn = document.getElementById("update-btn");
const saveBtn = document.getElementById("save-btn");

profilePic.style.pointerEvents = "none";
semesterInput.setAttribute("disabled", true);
regNoInput.setAttribute("disabled", true);
branchInput.setAttribute("disabled", true);
cgpaInput.setAttribute("disabled", true);
emailInput.setAttribute("disabled", true);
updateBtn.removeAttribute("disabled");
saveBtn.setAttribute("disabled", true);

var file;
var check = 0;
updateBtn.addEventListener("click", (e) => {
  const input = document.getElementById("file");
  input.addEventListener("change", (event) => {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    alert(file);
    file = event.target.files[0];
    check = 1;
  });
  profilePic.style.pointerEvents = "auto";
  semesterInput.removeAttribute("disabled");
  regNoInput.removeAttribute("disabled");
  branchInput.removeAttribute("disabled");
  cgpaInput.removeAttribute("disabled");
  emailInput.removeAttribute("disabled");
  updateBtn.setAttribute("disabled", true);
  saveBtn.removeAttribute("disabled");
});

// Save updated values when save button is clicked
saveBtn.addEventListener("click", (e) => {
  profilePic.style.pointerEvents = "none";
  semesterInput.setAttribute("disabled", true);
  regNoInput.setAttribute("disabled", true);
  branchInput.setAttribute("disabled", true);
  cgpaInput.setAttribute("disabled", true);
  emailInput.setAttribute("disabled", true);
  updateBtn.removeAttribute("disabled");
  saveBtn.setAttribute("disabled", true);
  const db = getDatabase();
  const postData = {
    name: name1,
    semester: document.getElementById("semester").value,
    regno: document.getElementById("regno").value,
    email: document.getElementById("email").value,
    cgpa: document.getElementById("cgpa").value,
    branch: document.getElementById("branch").value,
  };
  const updates = {};
  updates["users/" + cpy + "/"] = postData;
  if (check) {
    const storage = getStorage();
    const storageRef = sRef(storage, cpy + "/profilePicture");
    const fileType = file["type"];
    alert(fileType);
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      alert("Yes");
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }
    alert("Updated Successfully!");
    check=0;
  }
  return update(ref(db), updates);
});

document.getElementById("logout-btn").addEventListener("click", function () {
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