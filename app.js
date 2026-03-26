// 🔥 PASTE YOUR REAL FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyD0Od0cQPcV5TsJBDaIC5cOTLpYlMYvP8g",
  authDomain: "my-dairy-b9c58.firebaseapp.com",
  projectId: "my-dairy-b9c58",
  storageBucket: "my-dairy-b9c58.firebasestorage.app",
  messagingSenderId: "28939470313",
  appId: "1:28939470313:web:172c1958873f3e1880b778",
  measurementId: "G-0HX3J64HZM"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// 💜 SIGNUP
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Account created 💖"))
    .catch(err => alert(err.message));
}


// 💜 LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Login success 💜"))
    .catch(err => alert(err.message));
}


// 💜 LOGOUT
function logout() {
  auth.signOut();
}


// 💜 SAVE ENTRY
function saveEntry() {
  const text = document.getElementById("journal").value;

  if (!text) {
    alert("Write something!");
    return;
  }

  db.collection("entries").add({
    text: text,
    date: new Date()
  });

  document.getElementById("journal").value = "";
}


// 💜 LOAD ENTRIES
function loadEntries() {
  const container = document.getElementById("entries");
  container.innerHTML = "";

  db.collection("entries")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <p>${data.text}</p>
          <small>${new Date(data.date.seconds * 1000).toLocaleString()}</small>
        `;

        container.appendChild(div);
      });
    });
}


// 💜 TODO
function addTodo() {
  const task = document.getElementById("todoInput").value;

  if (!task) return;

  db.collection("todos").add({
    task: task
  });

  document.getElementById("todoInput").value = "";
  loadTodos();
}


function loadTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  db.collection("todos").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.innerText = doc.data().task;
      list.appendChild(li);
    });
  });
}


// 💜 AUTO LOGIN STATE
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadEntries();
    loadTodos();
  } else {
    document.getElementById("login-box").style.display = "block";
    document.getElementById("app").style.display = "none";
  }
});