const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrIcon = document.getElementById("ctrIcon");
const songCover = document.querySelector(".about-song img");
const songTitle = document.querySelector(".songTitle");
const artiste = document.querySelector(".artiste");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
const menuBtn = document.querySelector(".hamburger");
const menuCloseBtn = document.querySelector(".hamburgerClose");
const musicList = document.querySelector(".header");
const overLay = document.querySelector(".overlay");
const songList = document.querySelector(".songList");
const theSound = document.getElementById("aSong");

// const selectSong  = document.querySelectorAll(".eachSong")
const playTheSong = document.getElementById("aSong");

// Music list on hamburger click
menuBtn.addEventListener("click", showMusicList);

function showMusicList() {
  musicList.classList.add("active");
  overLay.classList.add("active");
  menuCloseBtn.classList.add("active");
}
menuCloseBtn.addEventListener("click", closeMusicList);

function closeMusicList() {
  musicList.classList.remove("active");
  overLay.classList.remove("active");
  menuCloseBtn.classList.toggle("active");
}

overLay.addEventListener("click", closeMenuOnClick);

function closeMenuOnClick() {
  musicList.classList.remove("active");
  overLay.classList.remove("active");
  menuCloseBtn.classList.toggle("active");
}

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

// when the song is paused or played, the icons representing each action is inserted
function playPause() {
  if (ctrIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrIcon.classList.remove("fa-pause");
    ctrIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrIcon.classList.add("fa-pause");
    ctrIcon.classList.remove("fa-play");
  }
}

//when the song plays, the progress slider moves along with the song and this updates every 5 milliseconds

if (song.play) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

//when the progress slider is moved forward in bid to fast-forward the song

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrIcon.classList.add("fa-pause");
  ctrIcon.classList.remove("fa-play");
};

let musicIndex = 1;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

//load music function
function loadMusic(indexNumb) {
  songCover.src = `${allSongs[indexNumb - 1].cover}`;
  songTitle.innerHTML = allSongs[indexNumb - 1].title;
  artiste.innerHTML = allSongs[indexNumb - 1].artist;
  song.src = `${allSongs[indexNumb - 1].path}`;
}
//go to the next music
nextBtn.addEventListener("click", nextMusic);

function nextMusic() {
  //we'd just increment by 1
  musicIndex++;
  loadMusic(musicIndex);
  song.play();

  if (song.play()) {
    ctrIcon.classList.add("fa-pause");
    ctrIcon.classList.remove("fa-play");
  } else {
    null;
  }
}
//go to the previous music
backBtn.addEventListener("click", prevMusic);
function prevMusic() {
  //we'd just decrement by 1
  musicIndex--;
  loadMusic(musicIndex);
  song.play();

  if (song.play()) {
    ctrIcon.classList.add("fa-pause");
    ctrIcon.classList.remove("fa-play");
  } else {
    null;
  }
}
songList.addEventListener("click", function (event) {
  musicList.classList.remove("active");
  overLay.classList.remove("active");
  menuCloseBtn.classList.toggle("active");
  ctrIcon.classList.add("fa-pause");
  ctrIcon.classList.remove("fa-play");

  if (event.target.tagName === "LI") {
    const clickedSong = event.target.textContent.trim();
    const ourSong = allSongs.find((n) => n.title === clickedSong);

    // loadMusic(musicIndex);
    if (ourSong) {
      song.src = ourSong.path;
      songCover.src = ourSong.cover;
      songTitle.innerHTML = ourSong.title;
      artiste.innerHTML = ourSong.artist;
      song.play();
      ctrIcon.classList.add("fa-pause");
      ctrIcon.classList.remove("fa-play");
    } else {
      console.log("song is not on the list");
    }
  }
});
