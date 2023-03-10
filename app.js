// import MD5 from "crypto-js/md5";
// console.log(MD5("text to hash").toString());

let heroes = [];

const heroesList = document.getElementById("list");

const addHeroInput = document.getElementById("add");

console.log("Super hero app is Working"); //check app is working or not in console

function addHeroToDom(hero) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="${hero.id}" ${
    hero.done ? "checked" : ""
  } class="custom-checkbox">
    <label for="${hero.id}">${hero.text}</label>
    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" class="delete" data-id="${
      hero.id
    }" />
  `;

  heroesList.append(li);
}

function renderList() {
  heroesList.innerHTML = "";
  for (let i = 0; i < heroes.length; i++) {
    addHeroToDom(heroes[i]);
  }
}

function toggleHero(heroId) {
  const hero = heroes.filter(function (hero) {
    return hero.id === heroId;
  });
  if (hero.length > 0) {
    const currentHero = hero[0];
    currentHero.done = !currentHero.done;
    renderList();
    showNotification("Hero toggled successfully");
    return;
  }
  showNotification("Hero not toggled");
}

function deleteHeroFromFavorite(heroId) {
  const newHeroes = heroes.filter(function (hero) {
    return hero.id !== heroId;
  });
  heroes = newHeroes;
  renderList(); // new hero list after deleting any with the id will render in console.
  showNotification("Hero removed successfully");
}

function addHeroInFavorite(hero) {
  if (hero) {
    heroes.push(hero);
    renderList();
    showNotification("Hero added successfully");
    return;
  }
  showNotification("Hero cant be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    // console.log("text", text); // to check function working

    if (!text) {
      showNotification("Text cant be empty");
      return;
    }

    const task = {
      text,
      id: Date.now().toString(), //date converted to string
      done: false, //boolean false by default
    };

    e.target.value = "";
    addHeroInFavorite(task);
  }
}
function handleClickListener(e) {
  const target = e.target;
  console.log(target); // find and display targeted element on mouse click in console.
  if (target.className === "delete") {
    const heroId = target.dataset.id;
    deleteHeroFromFavorite(heroId);
    return;
  } else if (target.className === "custom-checkbox") {
    const heroId = target.id;
    toggleHero(heroId);
    return;
  }
}
function initializeApp() {
  addHeroInput.addEventListener("keyup", handleInputKeyPress);
  document.addEventListener("click", handleClickListener);
}

initializeApp();
