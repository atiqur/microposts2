// Imports
import { http } from "./http"
import { ui } from "./ui"

// Event loaders
document.addEventListener("DOMContentLoaded", getPosts)
document.querySelector(".post-submit").addEventListener("click", submitPost)

// Event handlers
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.error(err))
}

function submitPost(e) {
  const title = document.querySelector("#title").value
  const body = document.querySelector("#body").value
  const id = document.querySelector("#id").value

  const data = {
    title,
    body,
    id,
  }

  http
    .post("http://localhost:3000/posts", data)
    .then((data) => getPosts())
    .catch((err) => console.error(err))

  e.preventDefault()
}
