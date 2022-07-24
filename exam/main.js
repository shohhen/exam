let elUsers = document.querySelector(".list-users");
let elPosts = document.querySelector(".list-posts");
let elComments = document.querySelector(".list-comments");
let elUSersTemplate = document.querySelector(".list-users__template").content;
let elPostsTemplate = document.querySelector(".list-posts__temlate").content;
let elCommentsTemplate = document.querySelector(
  ".list-comments__template"
).content;
let loader = document.querySelector("img");

const userArray = [];
const postArray = [];

function renderUsers(arr, node) {
  const fragmentUsers = document.createDocumentFragment();

  arr.forEach((el) => {
    const templateUsers = elUSersTemplate.cloneNode(true);
    userArray.push(el.id);

    templateUsers.querySelector(".user-username").textContent = el.username;
    templateUsers.querySelector(".user-name").textContent = el.name;
    templateUsers.querySelector(".user-id").textContent = el.id;
    templateUsers.querySelector(".user-street").textContent = el.address.street;
    templateUsers.querySelector(".user-suite").textContent = el.address.suite;
    templateUsers.querySelector(".user-city").textContent = el.address.city;
    templateUsers.querySelector(".user-zipcode").textContent =
      el.address.zipcode;
    templateUsers.querySelector(".user-title").textContent = el.company.name;
    templateUsers.querySelector(".user-phrase").textContent =
      el.company.catchPhrase;
    templateUsers.querySelector(".user-bs").textContent = el.company.bs;

    templateUsers.querySelector(".user-phone").href = `tel:${el.phone}`;
    templateUsers.querySelector(
      ".user-location"
    ).href = `https://google.com/maps/place/${el.address.geo.lat},${el.address.geo.lng}`;
    templateUsers.querySelector(".user-website").href = `https://${el.website}`;
    templateUsers.querySelector(".user-email").href = `mailto:${el.email}`;
    templateUsers.querySelector(".user").dataset.id = el.id;

    fragmentUsers.appendChild(templateUsers);
  });

  node.appendChild(fragmentUsers);
}

const renderPosts = function (arr, node) {
  node.innerHTML = "";

  const fragmentPosts = document.createDocumentFragment();
  arr.forEach((element) => {
    postArray.push(element.id);
    console.log(element);
    const templatePosts = elPostsTemplate.cloneNode(true);
    templatePosts.querySelector(".post-title").textContent = element.title;
    templatePosts.querySelector(".post-text").textContent = element.body;
    templatePosts.querySelector(".post").dataset.id = element.id;

    fragmentPosts.appendChild(templatePosts);
  });

  node.appendChild(fragmentPosts);
};

const renderComments = (arr, el) => {
  el.innerHTML = "";
  const fragmentComments = document.createDocumentFragment();

  arr.forEach((element) => {
    const templateComments = elCommentsTemplate.cloneNode(true);
    templateComments.querySelector(".comment-name").textContent =
        element.name
      templateComments.querySelector(".comment-email").textContent =
        element.email;
    templateComments.querySelector(".comment-text").textContent =
      element.body; 
    templateComments.querySelector(
      ".comment-email"
    ).href = `mailto:${element.email}`;

    fragmentComments.appendChild(templateComments);
  });
  el.appendChild(fragmentComments);
};

async function getUsers() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await res.json();
    console.log(data);
    renderUsers(data, elUsers);
  } catch (err) {
    loader.style.display = "block";
  }
}

getUsers();

async function getPosts(usersId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${usersId}`
    );
    const data = await res.json();
    console.log(data);
    renderPosts(data, elPosts);
  } catch (err) {
    loader.style.display = "block";
    console.log(err);
  }
}

async function getComments(postId) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await res.json();
    console.log(data);
    renderComments(data, elComments);
  } catch (err) {
    loader.style.display = "block";
    console.log(err);
  }
}

elUsers.addEventListener("click", (evt) => {
  if (evt.target.matches(".user")) {
    const userListId = evt.target.dataset.id - 0;
    userArray.forEach((userId) => {
      if (userListId === userId) {
        console.log(userId);
        getPosts(userId);
      }
    });
  }
  console.log(elPosts);
});

elPosts.addEventListener("click", (evt) => {
  if (evt.target.matches(".post")) {
    const postListId = evt.target.dataset.id - 0;
    postArray.forEach((postId) => {
      if (postListId === postId) {
        console.log(postId);
        getComments(postId);
      }
    });
  }
  console.log(elComments);
});


