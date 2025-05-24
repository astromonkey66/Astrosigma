// Firebase-Konfiguration – ersetze durch deine echten Daten!
const firebaseConfig = {
  apiKey: "DEIN_API_KEY",
  authDomain: "DEIN_AUTH_DOMAIN",
  projectId: "DEIN_PROJECT_ID",
  storageBucket: "DEIN_BUCKET",
  messagingSenderId: "DEIN_SENDER_ID",
  appId: "DEINE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function submitPost() {
  const name = document.getElementById("name").value || "Unbekannt";
  const text = document.getElementById("postText").value.trim();
  if (text !== "") {
    db.collection("posts").add({
      name: name,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("postText").value = "";
    document.getElementById("name").value = "";
    alert("Deine Idee wurde gespeichert!");
  }
}

let postsVisible = false;

function togglePosts() {
  const list = document.getElementById("post-list");
  if (!postsVisible) {
    db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
      list.innerHTML = "";
      snapshot.forEach(doc => {
        const post = doc.data();
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<strong>${post.name}</strong><p>${post.text}</p>`;
        list.appendChild(div);
      });
      list.style.display = "block";
      postsVisible = true;
    });
  } else {
    list.style.display = "none";
    postsVisible = false;
  }
}
