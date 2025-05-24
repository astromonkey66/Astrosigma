// >>> Trage hier deine echten Firebase-Daten ein:
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

function speichern() {
  const text = document.getElementById("text").value;
  if (text.trim() !== "") {
    db.collection("posts").add({
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("text").value = "";
    laden();
  }
}

function laden() {
  db.collection("posts").orderBy("timestamp", "desc").get().then(snapshot => {
    const ausgabe = document.getElementById("ausgabe");
    ausgabe.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.textContent = data.text;
      ausgabe.appendChild(div);
    });
  });
}

window.onload = laden;
