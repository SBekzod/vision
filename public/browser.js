console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return `<li
    class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
    <span class="item-text">${item.visionName}</span>
    <div>
      <button
        data-id="${item.visionId}"
        class="edit-me btn btn-secondary btn-sm mr-1">
        Edit
      </button>
      <button
      data-id="${item.visionId}"
        class="delete-me btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  axios
    .post("/create-item", { vision: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Iltimos qaytadan harakat qiling!");
    });
});

document.addEventListener("click", function (e) {
  // DELETE
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Are you sure to delete?")) {
      axios
        .post("/delete-item", { visionId: e.target.getAttribute("data-id") })
        .then((respose) => {
          console.log(respose.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => console.log("Please try again later!"));
    }
  }

  // EDIT
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "O'zgartirish kiriting",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/edit-item", {
          visionId: e.target.getAttribute("data-id"),
          visionName: userInput,
        })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => console.log("Please try again later!"));
    }
  }
});

document.getElementById("clean-all").addEventListener("click", function () {
  axios.post("/delete-all", {}).then((respose) => {
    alert(respose.data.state);
    document.location.reload();
  });
});
