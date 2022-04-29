const movieList = {
  "dance": [
    "K6WEQcQtk6Y",
    "e1VC2lgTWes",
    "x_wy8px9dD4",
    "1qQixMqn6hI",
    "ArAO0VceCHw",
    "VMWpttZug3I",
  ],
  "fitness": [
    "hge3fr50o0o",
    "D6J_dJrAQMI",
    "xvoF9VSHpZM",
    "QGEs_5xx6u0",
    "BJ4cAxk31UY",
    "ueSnrvp6hUg",
  ],
  "stretch": [
    "oWHPQgdqVcQ",
    "Wzm-7EgAIZs",
    "HiZQmI-If3Q",
    "JVOu8FzP94k",
    "9mCCZ39Gb5c",
  ],
};

const category = ["dance", "fitness", "stretch",];
const movieListArray = Object.values(movieList);
const allMovie = [];

for (let i = 0; i < category.length; i++) {

  // リストの作成
  const title = movieList[category[i]];
  let list = `
  <div class="video-list bg-dark" id="${category[i]}-list">
    <ul class="mb-0 row py-3 mx-0 text-center">`;
  for (let j = 0; j < title.length; j++) {

    list += `
      <li class="col-6 col-md-4 col-lg-6 ps-0" data-id="${title[j]}">
        ${j + 1}.<img src="https://img.youtube.com/vi/${title[j]}/default.jpg" class="ms-2" alt="">
      </li>`;

    // リストの合体
    allMovie.push(movieListArray[i][j]);
  }
  list += `
    </ul>
  </div>`;
  let cat = document.getElementById(category[i]);
  cat.innerHTML += list;

  // リストの開閉
  let btn = document.getElementById(`${category[i]}-btn`);
  btn.addEventListener("change", (e) => {
    let target = e.currentTarget;
    let label = target.closest("label");
    let span = label.querySelector("span");
    let list = document.getElementById(`${category[i]}-list`);
    let angle = label.querySelector("i");

    if (btn.checked) {
      list.classList.add("d-block");
      label.classList.remove("btn-primary");
      label.classList.add("btn-danger");
      span.innerText = "close";
      angle.classList.remove("icon-rotate-reverse");
      angle.classList.add("icon-rotate");
    } else {
      list.classList.remove("d-block");
      label.classList.remove("btn-danger");
      label.classList.add("btn-primary");
      span.innerText = "open";
      angle.classList.remove("icon-rotate");
      angle.classList.add("icon-rotate-reverse");
    }
  });
}
let currentMovieId = randomMovieAreaRendering();

// 選択した動画を表示
let selectMovie = document.querySelectorAll("li");
selectMovie.forEach(m => m.addEventListener("click", (e) => {
  let target = e.currentTarget;
  let id = target.dataset.id;
  movieAreaRendering(id);
}));

let currentIndex;
for (let i = 0; i < allMovie.length; i++) {
  if (allMovie[i] == currentMovieId) {
    currentIndex = i;
    break;
  }
}
let nextIndex = increaseId(currentIndex);
let preIndex = decreaseId(currentIndex);
let nextMovieId = allMovie[nextIndex];
let preMovieId = allMovie[preIndex];

function increaseId(i) {
  if (allMovie.length - 1 == i) return i + 1 - allMovie.length;
  else return i + 1;
}

function decreaseId(i) {
  if (i == 0) return i + allMovie.length - 1;
  else return i - 1;
}

function nextMovie() {
  movieAreaRendering(nextMovieId);
  preIndex = currentIndex;
  currentIndex = nextIndex;
  nextIndex = increaseId(nextIndex);
  preMovieId = allMovie[preIndex];
  currentMovieId = allMovie[currentIndex];
  nextMovieId = allMovie[nextIndex];
}
function preMovie() {
  movieAreaRendering(preMovieId);
  nextIndex = currentIndex;
  currentIndex = nextIndex;
  preIndex = decreaseId(preIndex);
  preMovieId = allMovie[preIndex];
  currentMovieId = allMovie[currentIndex];
  nextMovieId = allMovie[nextIndex];
}

function movieAreaRendering(id) {
  const video = document.getElementById("video");
  const iframe = `<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video.innerHTML += iframe;
}

function randomMovieAreaRendering() {
  const randomCatIndex = Math.floor(Math.random() * 10 % category.length);
  const randomCat = category[randomCatIndex];
  const randomMovieIndex = Math.floor(Math.random() * 10 % movieList[randomCat].length);
  const randomMovieId = movieList[randomCat][randomMovieIndex];
  movieAreaRendering(randomMovieId);

  return randomMovieId;
}
