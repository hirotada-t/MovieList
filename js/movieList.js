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

const category = Object.keys(movieList);
const movieListArray = Object.values(movieList);
const allMovie = [];
// 動画の初期値（ランダム表示＋ランダム動画のIDを取得）
let currentMovieId = randomMovieAreaRendering();

for (let i = 0; i < category.length; i++) {

  // リストの作成
  const titleList = movieList[category[i]];
  let listHTML = `
  <div class="video-list" id="${category[i]}-list">
    <ul class="mb-0 row py-3 mx-0 text-center">`;
  for (let j = 0; j < titleList.length; j++) {

    listHTML += `
      <li class="col-6 col-md-4 col-lg-6 ps-0" data-id="${titleList[j]}">
        ${j + 1}.<img src="https://img.youtube.com/vi/${titleList[j]}/default.jpg" class="ms-2" alt="">
      </li>`;

    // リストの合体
    allMovie.push(movieListArray[i][j]);
  }
  listHTML += `
    </ul>
  </div>`;
  let cat = document.getElementById(category[i]);
  cat.innerHTML += listHTML;

  // リストの開閉
  let btn = document.getElementById(category[i] + "-btn");// input要素
  btn.addEventListener("change", e => {
    let target = e.currentTarget;
    let label = target.closest("label");
    let span = label.querySelector("span");
    let list = document.getElementById(category[i] + "-list");
    let angle = label.querySelector("i");

    if (btn.checked) {// 開く
      list.classList.add("d-block");
      label.classList.remove("btn-primary");
      label.classList.add("btn-danger");
      span.innerText = "close";
      angle.classList.remove("icon-rotate-reverse");
      angle.classList.add("icon-rotate");
    } else {// 閉じる
      list.classList.remove("d-block");
      label.classList.remove("btn-danger");
      label.classList.add("btn-primary");
      span.innerText = "open";
      angle.classList.remove("icon-rotate");
      angle.classList.add("icon-rotate-reverse");
    }
  });
}

// 選択した動画を表示
let selectMovie = document.querySelectorAll("li");
selectMovie.forEach(m => m.addEventListener("click", e => {
  let target = e.currentTarget;
  let id = target.dataset.id;
  movieAreaRendering(id);
}));

// indexから動画を検索
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

// indexを増やす
function increaseId(i) {
  if (allMovie.length - 1 == i) return i + 1 - allMovie.length;
  else return i + 1;
}

// indexを減らす
function decreaseId(i) {
  if (i == 0) return i + allMovie.length - 1;
  else return i - 1;
}

// 次の動画を表示（onclick）
function nextMovie() {
  movieAreaRendering(nextMovieId);
  preIndex = currentIndex;
  currentIndex = nextIndex;
  nextIndex = increaseId(nextIndex);
  preMovieId = allMovie[preIndex];
  currentMovieId = allMovie[currentIndex];
  nextMovieId = allMovie[nextIndex];
}
// 前の動画を表示（onclick）
function preMovie() {
  movieAreaRendering(preMovieId);
  nextIndex = currentIndex;
  currentIndex = nextIndex;
  preIndex = decreaseId(preIndex);
  preMovieId = allMovie[preIndex];
  currentMovieId = allMovie[currentIndex];
  nextMovieId = allMovie[nextIndex];
}

// 動画を表示
function movieAreaRendering(id) {
  const video = document.getElementById("video");
  const iframe = `<iframe src="https://www.youtube.com/embed/${id}" titleList="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  video.innerHTML += iframe;
}

// ランダムに動画を表示＋表示した動画のIDを取得
function randomMovieAreaRendering() {
  const randomCatIndex = Math.floor(Math.random() * 10 % category.length);
  const randomCat = category[randomCatIndex];
  const randomMovieIndex = Math.floor(Math.random() * 10 % movieList[randomCat].length);
  const randomMovieId = movieList[randomCat][randomMovieIndex];
  movieAreaRendering(randomMovieId);

  return randomMovieId;
}
