let dataArray;

async function getUsers() {
  try {
    const url = "https://randomuser.me/api/?nat=fr&results=25";
    const request = await fetch(url);
    const { results } = await request.json();
    console.log(results);
    orderList(results);
    dataArray = results;
    createUserList(dataArray);
  } catch (error) {
    console.log(error);
  }
}

// Tri alphabétique par nom
function orderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
}

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.className = "table-item";
    listItem.innerHTML = `
        <p class="main-info">
        <img 
        src=${user.picture.thumbnail}
        />
        <span>${user.name.title}. ${user.name.first} ${user.name.last}</span>
        </p>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>`;
    tableResults.appendChild(listItem);
  });
}

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", filterData);

function filterData(e) {
  tableResults.textContent = "";
  const search = e.target.value.toUpperCase().replace(/\s/g, "");
  const filterList = dataArray.filter((userData) =>
    searchFor(userData, search)
  );
  createUserList(filterList);
}

function searchFor(userData, search) {
  const searchTypes = {
    firstname: userData.name.first.toUpperCase(),
    lastname: userData.name.last.toUpperCase(),
    firstAndLast: `${userData.name.first}${userData.name.last}`.toUpperCase(),
    lastAndFirst: `${userData.name.last}${userData.name.first}`.toUpperCase(),
  };
  for (let element in searchTypes) {
    if (searchTypes[element].includes(search)) {
      return true;
    }
  }
  return false;
}

const hamburger = document.querySelector(".hamburger");
const sideNav = document.querySelector(".side-nav");

const toggleNav = () => {
  sideNav.classList.toggle("open");
  hamburger.classList.toggle("open");
};
hamburger.addEventListener("click", toggleNav);

new ResizeObserver((entries) => {
  if (entries[0].contentRect.width <= 900) {
    sideNav.style.transition = "transform 0.3s ease-out";
  } else {
    sideNav.style.transition = "none";
  }
}).observe(document.body);

getUsers();
