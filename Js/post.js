import {db} from "./firebase.js"
import { doc, getDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search)
    return params.get("id")
}

async function loadPost() {
    const postId = getPostIdFromUrl()
    if (!postId) {
        document.getElementById("post-content").innerHTML =  "Post não encontrado."
        return
    }

    const docRef = doc(db, "posts", postId)

    const postSnap = await getDoc(docRef)
    if (!postSnap.exists()) {
        document.getElementById("post-content").innerHTML = "Post naõ encontrado"
        return
    }

    const post = postSnap.data()

    const container = document.getElementById("post-content")
    if(!container) {
        console.error("Elemento com id não encontrado")
        return
    }
    container.innerHTML = `<h1>${post.title}</h1>
    <img src="${post.image}" alt="${post.title}"/>
    <p>${post.body}</p>
    <h3>Este Post é sobre: </h3>
    <div class="tags">
    ${post.tagsArray.map(tag => `<p>#${tag}</p>`).join("")}
    </div>`
}

document.addEventListener("DOMContentLoaded", loadPost)