// Imports
import { http } from "./http"
import { ui } from "./ui"

// Event loaders
document.addEventListener("DOMContentLoaded", getPosts)
document.querySelector(".post-submit").addEventListener("click", submitPost)
document.querySelector("#posts").addEventListener("click", deletePost)
document.querySelector("#posts").addEventListener("click", enableEdit)
document.querySelector(".card-form").addEventListener("click", cancelEdit)

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

  if (title === "" && body === "") {
    ui.showAlert("Please fill up all fields", "alert alert-danger")
  } else {
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => getPosts())
        .catch((err) => console.error(err))

      ui.clearInputFields()
      ui.clearAlert()
      ui.showAlert("Post added", "alert alert-success")
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert("Post updated", "alert alert-success")
          ui.changeFormState("add")
          getPosts()
        })
        .catch((err) => console.error(err))
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

function enableEdit(e) {
  e.preventDefault()

  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    const data = {
      id,
      title,
      body,
    }

    ui.fillData(data)
  }
}

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add")
  }
  e.preventDefault()
}
