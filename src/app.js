// Imports
import { http } from "./http"
import { ui } from "./ui"

// Event loaders
document.addEventListener("DOMContentLoaded", getPosts)
document.querySelector(".post-submit").addEventListener("click", submitPost)
document.querySelector("#posts").addEventListener("click", deletePost)

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

  if (title === "" && body === "") {
    ui.showAlert("Please fill up all fields", "alert alert-danger")
  } else {
    if (id === "") {
      const data = {
        title,
        body,
        id,
      }

      http
        .post("http://localhost:3000/posts", data)
        .then((data) => getPosts())
        .catch((err) => console.error(err))

      ui.clearInputFields()
      ui.clearAlert()
      ui.showAlert("Post added", "alert alert-success")
    } else {
      // TODO: Edit post
    }
  }

  e.preventDefault()
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert("Post deleted", "alert alert-warning")
          getPosts()
        })
        .catch((err) => console.error(err))
    }
  }

  e.preventDefault()
}
