"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let homeBtn = document.querySelector(".home__button");

  homeBtn.addEventListener("click", () => {
    window.location.href = "start.html";
  });
});

let term = "";
let counter = 0;

let songListArray = [];

const searchTerm = () => {
  term = document.querySelector(".search__field").value;
  //check if searching item exist

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
            searchResultRight = document.createElement("div"),
            artist = document.createElement("p"),
            song = document.createElement("h4"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source"),
            addBtn = document.createElement("button");

          console.log(result);

          artist.innerHTML = result.artistName;
          song.innerHTML = result.trackName;
          img.src = result.artworkUrl100;
          audioSource.src = result.previewUrl;
          audio.controls = true;
          addBtn.innerHTML = "Add";

          searchResult.appendChild(searchResultLeft);
          searchResult.appendChild(searchResultRight);
          searchResultLeft.appendChild(img);
          searchResultRight.appendChild(artist);
          searchResultRight.appendChild(song);
          searchResultRight.appendChild(audio);
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
          artist.style.maxWidth = "420px";
          artist.style.marginBottom = "10px";
          song.style.maxWidth = "420px";
          addBtn.style.textAlign = "center";

          searchResult.style.position = "relative";
          addBtn.style.position = "absolute";
          addBtn.style.top = "0px";
          addBtn.style.right = "100px";
          addBtn.style.width = "70px";
          addBtn.style.fontSize = ".8rem";

          audio.style.position = "absolute";
          audio.style.bottom = "0px";
          audio.style.left = "110px";

          //Add song to the list
          const songList = document.querySelector(".songs__list");
          const listText = document.querySelector(".list__text");
          let saveBtnExists = false;

          const totalContentHeight = songList.scrollHeight;
          const newHeight = Math.max(totalContentHeight, 500);

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
            number.innerHTML = `${counter}`;
            copyArtist.innerHTML = artist.innerHTML;
            copySong.innerHTML = song.innerHTML;

            songList.appendChild(songContainer);
            songContainer.appendChild(number);
            songContainer.appendChild(copyArtist);
            songContainer.appendChild(copySong);
            songContainer.appendChild(deleteBtn);

            songContainer.style.display = "flex";
            songContainer.style.marginBottom = "10px";
            songContainer.style.padding = "10px";
            songContainer.style.justifyContent = "space-between";
            number.style.fontSize = "0.9rem";
            copyArtist.style.fontSize = "0.9rem";
            copySong.style.fontSize = "0.9rem";

            deleteBtn.addEventListener("click", () => {
              songList.removeChild(songContainer);
              updateSongNumbers();
              songContainer.removeChild(saveBtn);
            });
            songList.appendChild(songContainer);

            if (!saveBtnExists) {
              const saveBtn = document.createElement("button");
              saveBtn.innerHTML = "Save";
              saveBtn.style.color = "#DFE0E2";
              saveBtn.style.borderColor = "#DFE0E2";
              saveBtn.style.width = "70px";
              saveBtn.style.fontSize = "0.8rem";
              saveBtn.style.marginTop = "20px";

              songContainer.appendChild(saveBtn);
              saveBtnExists = true;

              //Save songs to playlist

              saveBtn.addEventListener("click", () => {
                alert("Song saved!");

                const artistText = copyArtist.textContent;
                const songText = copySong.textContent;

                const songInfo = {
                  artist: artistText,
                  song: songText,
                };

                songListArray.push(songInfo);

                // localStorage.setItem("song_1", JSON.stringify(songInfo));

                console.log(songListArray);
              });
            }
            updateSongNumbers();
          });

          function updateSongNumbers() {
            const songContainers = songList.querySelectorAll("div");
            songContainers.forEach((container, index) => {
              const number = container.querySelector("span");
              number.innerHTML = `${index + 1}`;
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

//Playlist content
const playlistLink = document.querySelector(".link__playlist");
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();

  playlistLink.addEventListener("click", () => {
    const playlistContainer = document.querySelector(".playlist");
    const container = document.createElement("div");

    playlistContainer.appendChild(container);

    container.style.width = "300px";
    container.style.height = "50px";
    container.style.backgroundColor = "red";
  });
});
