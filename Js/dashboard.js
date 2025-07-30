import { auth, db } from "./firebase.js";
import {collection, getDocs, query, where, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { checkAuth } from "./utils.js";

const postContainer = document.getElementById("posts");
const welcomeText = document.getElementById("welcome");

onAuthStateChanged(auth, async (user) => {
  checkAuth(user);
  welcomeText.textContent = `Bem-vindo(a), ${user.displayName}! 👋`;
  await loadUserPosts(user.uid);
});

async function loadUserPosts(uid) {
  const q = query(collection(db, "posts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  postContainer.innerHTML = "";

  if (querySnapshot.empty) {
    postContainer.innerHTML = "<p>Você ainda não criou nenhum post.</p>";
    return;
  }

  querySnapshot.forEach((docSnap) => {
    const post = docSnap.data();
    const postId = docSnap.id;

    const postDiv = document.createElement("div");
    postDiv.classList.add("dashboard-post");

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <img src="${post.image}" alt="${post.title}" />
      <p>${post.body.substring(0, 100)}...</p>
      <div class="tags">
        ${post.tagsArray.map(tag => `<span class="tag">#${tag}</span>`).join(" ")}
      </div>
      <div class="actions">
        <button class="btn-edit" onclick="window.location.href='create.html?id=${postId}'">Editar</button>
        <button class="btn-delete" data-id="${postId}">Excluir</button>
      </div>
    `;

    postContainer.appendChild(postDiv);
  });

  addDeleteEvents();
}

function addDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const postId = e.target.getAttribute("data-id");
      const confirmar = confirm("Tem certeza que deseja excluir este post?");
      if (!confirmar) return;

      try {
        await deleteDoc(doc(db, "posts", postId));
        e.target.closest(".dashboard-post").remove();
      } catch (error) {
        console.error("Erro ao excluir post:", error.message);
      }
    });
  });
}
