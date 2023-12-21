"use strict";

if (window.location.pathname.endsWith("start.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    loadSavedPlaylist();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  let startBtn = document.querySelector(".home__button");
  let playlistLink = document.querySelector(".link__playlist");

  // Function to navigate to 'start.html'
  const navigateToStart = () => {
    window.location.href = "start.html";
  };

  // Add event listener to the button
  startBtn.addEventListener("click", navigateToStart);

  // Add the same event listener to the link
  playlistLink.addEventListener("click", navigateToStart);
});

let term = "";

// let songListArray = [];
let songListArray = JSON.parse(localStorage.getItem("playlistData")) || [];
let counter = songListArray.length;
let shareBtnAdded = false;

const songList = document.querySelector(".songs__list");
const listText = document.querySelector(".list__text");

const totalContentHeight = songList.scrollHeight;
const newHeight = Math.max(totalContentHeight, 500);

//Search for song
const searchTerm = () => {
  term = document.querySelector(".search__field").value;

  if (!term || term === "") {
    alert("Please enter name of the artist or song");
  } else {
    const url = `https://itunes.apple.com/search?term=${term}`;
    const searchWrapper = document.querySelector(".search__result");
    while (searchWrapper.firstChild) {
      searchWrapper.removeChild(searchWrapper.firstChild);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results);
        const artists = data.results;
        return artists.map((result) => {
          const searchResult = document.createElement("div"),
            searchResultLeft = document.createElement("div"),
            searchResultMiddle = document.createElement("div"),
            searchResultRight = document.createElement("div"),
            artist = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source"),
            addBtn = document.createElement("button");

          // console.log(result);

          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;
          addBtn.innerHTML = "Add";

          searchResult.appendChild(searchResultLeft);
          searchResult.appendChild(searchResultMiddle);
          searchResult.appendChild(searchResultRight);
          searchResultLeft.appendChild(img);
          searchResultMiddle.appendChild(artist);
          searchResultMiddle.appendChild(song);
          searchResultMiddle.appendChild(audio);
          audio.appendChild(audioSource);
          searchResultRight.appendChild(addBtn);

          searchWrapper.appendChild(searchResult);

          //Styles
          searchResult.style.display = "flex";
          searchResult.style.marginBottom = "40px";
          searchResult.style.fontSize = ".8rem";

          img.style.width = "100px";
          img.style.height = "100px";
          img.style.marginRight = "30px";
          searchResultMiddle.style.width = "420px";
          searchResultMiddle.style.marginRight = "10px";
          artist.style.marginBottom = "10px";

          song.style.textTransform = "uppercase";
          song.style.overflow = "hidden";
          song.style.textOverflow = "ellipsis";
          song.style.whiteSpace = "nowrap";

          searchResult.style.position = "relative";
          addBtn.style.textAlign = "center";

          addBtn.style.width = "70px";
          addBtn.style.fontSize = ".8rem";

          audio.style.position = "absolute";
          audio.style.bottom = "0px";
          audio.style.left = "110px";

          //Add song to the list
          // const songList = document.querySelector(".songs__list");
          // const listText = document.querySelector(".list__text");

          addBtn.addEventListener("click", () => {
            listText.classList.add("visibility", "hide-animation");
            songList.classList.add("hide-animation");
            const songContainer = document.createElement("div");
            const deleteBtn = document.createElement("button");

            deleteBtn.innerHTML = "Delete";
            deleteBtn.style.color = "#DFE0E2";
            deleteBtn.style.borderColor = "#DFE0E2";

            const copyArtist = document.createElement("p");
            const copySong = document.createElement("h4");

            //Count number

            counter++;
            const number = document.createElement("span");
            number.innerHTML = `${counter}.`;
            copyArtist.innerHTML = artist.innerHTML;
            copySong.innerHTML = song.innerHTML;

            songList.appendChild(songContainer);
            songContainer.appendChild(number);
            songContainer.appendChild(copyArtist);
            songContainer.appendChild(copySong);
            songContainer.appendChild(deleteBtn);

            if (!shareBtnAdded) {
              const shareBtn = document.createElement("button");
              songList.appendChild(shareBtn);
              shareBtn.innerHTML = "Share";
              shareBtn.style.color = "#DFE0E2";
              shareBtn.style.borderColor = "#DFE0E2";
              shareBtnAdded = true;
            }

            songContainer.style.display = "flex";

            songContainer.style.marginBottom = "10px";
            songContainer.style.padding = "10px";

            number.style.fontSize = "0.9rem";
            number.style.marginRight = "25px";
            copyArtist.style.fontSize = "0.9rem";
            copyArtist.style.marginRight = "15px";

            copySong.style.fontSize = "0.9rem";
            copySong.style.textTransform = "uppercase";
            copySong.style.marginRight = "20px";

            //Add songs to local storage
            const artistText = copyArtist.textContent;
            const songText = copySong.textContent;

            const songInfo = {
              artist: artistText,
              song: songText,
            };

            songListArray.push(songInfo);
            console.log(songListArray);
            localStorage.setItem("playlistData", JSON.stringify(songListArray));

            //Delete song from the playlist
            deleteBtn.addEventListener("click", () => {
              songListArray =
                JSON.parse(localStorage.getItem("playlistData")) || [];
              songList.removeChild(songContainer);
              console.log(songListArray);
              updateSongNumbers();

              const objectToRemove = {
                artist: songInfo.artist,
                song: songInfo.song,
              };
              const indexToRemove = songListArray.findIndex(
                (item) =>
                  item.artist === objectToRemove.artist &&
                  item.song === objectToRemove.song
              );

              if (indexToRemove !== -1) {
                songListArray.splice(indexToRemove, 1);
                localStorage.setItem(
                  "playlistData",
                  JSON.stringify(songListArray)
                );
              }
            });
            // songList.appendChild(songContainer);
          });

          function updateSongNumbers() {
            const songContainers = songList.querySelectorAll("div");
            songContainers.forEach((container, index) => {
              const number = container.querySelector("span");
              if (number !== null) {
                // Check if the span element actually exists
                number.innerHTML = `${index + 1}`;
              }
              songList.style.height = `${newHeight}px`;
            });
          }
        });
      })
      .catch((error) => console.log("Request failed: ", error));
  }
};

const searchBtn = document.querySelector(".search__button");
searchBtn.addEventListener("click", searchTerm);

document.addEventListener(
  "play",
  (event) => {
    const audio = document.getElementsByTagName("audio");
    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);

function loadSavedPlaylist() {
  songList.innerHTML = ""; // Clear existing song containers

  const savedPlaylistData = JSON.parse(localStorage.getItem("playlistData"));

  if (savedPlaylistData && savedPlaylistData.length > 0) {
    listText.classList.add("visibility", "hide-animation");
    songList.classList.add("hide-animation");

    savedPlaylistData.forEach((songData) => {
      const songContainer = document.createElement("div");
      const deleteBtn = document.createElement("button");

      deleteBtn.innerHTML = "Delete";
      deleteBtn.style.color = "#DFE0E2";
      deleteBtn.style.borderColor = "#DFE0E2";

      const copyArtist = document.createElement("p");
      const copySong = document.createElement("h4");

      //Count number
      counter++;
      const number = document.createElement("span");
      number.innerHTML = `${counter}.`;
      copyArtist.innerHTML = songData.artist;
      copySong.innerHTML = songData.song;

      songList.appendChild(songContainer);
      songContainer.appendChild(number);
      songContainer.appendChild(copyArtist);
      songContainer.appendChild(copySong);
      songContainer.appendChild(deleteBtn);

      songContainer.style.display = "flex";
      songContainer.style.marginBottom = "10px";
      songContainer.style.padding = "10px";

      number.style.fontSize = "0.9rem";
      number.style.marginRight = "25px";
      copyArtist.style.fontSize = "0.9rem";
      copyArtist.style.marginRight = "15px";
      copySong.style.fontSize = "0.9rem";
      copySong.style.textTransform = "uppercase";
      copySong.style.marginRight = "20px";

      deleteBtn.addEventListener("click", () => {
        songListArray = JSON.parse(localStorage.getItem("playlistData")) || [];
        songList.removeChild(songContainer);
        console.log(songListArray);
        updateSongNumbers();

        const objectToRemove = {
          artist: copyArtist.innerHTML,
          song: copySong.innerHTML,
        };
        const indexToRemove = songListArray.findIndex(
          (item) =>
            item.artist === objectToRemove.artist &&
            item.song === objectToRemove.song
        );

        if (indexToRemove !== -1) {
          songListArray.splice(indexToRemove, 1);
          localStorage.setItem("playlistData", JSON.stringify(songListArray));
        }
      });

      function updateSongNumbers() {
        const songContainers = songList.querySelectorAll("div");
        songContainers.forEach((container, index) => {
          const number = container.querySelector("span");
          if (number !== null) {
            // Check if the span element actually exists
            number.innerHTML = `${index + 1}`;
          }
          songList.style.height = `${newHeight}px`;
        });
      }
    });
  } else {
    const songContainer = document.createElement("div");
    songContainer.innerHTML = "Your playlist is empty";
    songList.appendChild(songContainer);
    songContainer.style.fontSize = "0.9rem";
  }
}
