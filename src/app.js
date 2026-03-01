const inputRef = document.querySelector("#bookmarkInput");
const listRef = document.querySelector("#bookmarkList");
const btnRef = document.querySelector("#addBookmarkBtn");

const bookArray = JSON.parse(localStorage.getItem("bookmarks")) || [];
renderArray();

btnRef.addEventListener("click", () => {
  const urlValue = inputRef.value.trim();
  if (urlValue) {
    bookArray.push(urlValue);
    inputRef.value = "";
    renderArray();
  }
});

function renderArray() {
  const item = bookArray
    .map((url, index) => {
      return `<li class="list__item">
        <a href="${url}" class="link">${url}</a>
        <button id="addBookmarkBtn" data-action="${index}">X</button>
    </li>`;
    })
    .join("");
  localStorage.setItem("bookmarks", JSON.stringify(bookArray));
  listRef.innerHTML = item;
}

listRef.addEventListener("click", (event) => {
  const target = event.target.nodeName;
  const index = event.target.dataset.action;
  if (target !== "BUTTON") {
    return;
  }
  bookArray.splice(index, 1);
  renderArray();
});

//-------------------------------

const btnEl = document.querySelector("#saveBtn");
const form = document.querySelector(".form");
const formFields = form.elements;

btnEl.addEventListener("click", (event) => {
  localStorage.clear();
  event.preventDefault();
});

for (let i = 0; i < formFields.length; i += 1) {
  formFields[i].addEventListener("change", changeHandler);
}

function changeHandler() {
  localStorage.setItem(this.name, this.value);
}

function checkStorage() {
  for (let i = 0; i < formFields.length; i += 1) {
    if (formFields[i].type !== "submit") {
      const saved = localStorage.getItem(formFields[i].name);
      if (saved !== null) {
        formFields[i].value = saved;
      }
    }
  }
}

checkStorage();