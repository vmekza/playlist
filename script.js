"use strict";

// const homeBtn = document.querySelector(".home__button");
// homeBtn.addEventListener("click", () => {
//   window.location.href = "start.html";
// });

let term = "";
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
          img.style.marginRight = "30px";
          addBtn.style.marginLeft = "40px";
          addBtn.style.textAlign = "center";

          searchResultRight.style.display = "flex";

          //Add song to the list
          const songList = document.querySelector(".songs__list");
          const listText = document.querySelector(".list__text");

          addBtn.addEventListener("click", () => {
            listText.classList.add("visibility");
            const songContainer = document.createElement("div");
            const deleteBtn = document.createElement("button");

            deleteBtn.innerHTML = "Delete";
            deleteBtn.style.color = "#181717";
            deleteBtn.style.borderColor = "#181717";

            const copyImg = document.createElement("img");
            const copyArtist = document.createElement("p");
            const copySong = document.createElement("h4");

            copyImg.src = img.src;
            copyArtist.innerHTML = artist.innerHTML;
            copySong.innerHTML = song.innerHTML;

            songList.appendChild(songContainer);
            songContainer.appendChild(copyImg);
            songContainer.appendChild(copyArtist);
            songContainer.appendChild(copySong);
            songContainer.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", () => {
              songList.removeChild(songContainer);
            });
          });
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
