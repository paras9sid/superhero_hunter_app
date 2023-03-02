// import MD5 from "crypto-js/md5";
// console.log(MD5("text to hash").toString());

let heroes = [];

const tasksList = document.getElementById("list");

const addTaskInput = document.getElementById("add");

console.log("Working"); //check app is working or not in console

function renderList() {}

// function toggleTask(taskId) {}

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

addTaskInput.addEventListener("keyup", handleInputKeyPress);
