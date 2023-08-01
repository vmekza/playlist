"use strict";

document.addEventListener("DOMContentLoaded", () => {
  loadSavedPlaylist();
});

function loadSavedPlaylist() {
  const savedPlaylistData = JSON.parse(localStorage.getItem("playlistData"));
  console.log("Hello");

  if (savedPlaylistData && savedPlaylistData.length > 0) {
    const playlistContainer = document.querySelector(".playlist");
    playlistContainer.innerHTML = "";

    savedPlaylistData.forEach((songInfo) => {
      const savedSongContainer = document.createElement("div");
      const savedArtist = document.createElement("p");
      const savedSong = document.createElement("h4");

      savedArtist.textContent = songInfo.artist;
      savedSong.textContent = songInfo.song;

      savedSongContainer.appendChild(savedArtist);
      savedSongContainer.appendChild(savedSong);

      playlistContainer.appendChild(savedSongContainer);

      savedSongContainer.style.color = "white";
      savedArtist.style.color = "white";
    });
  }
}

const playlistLink = document.querySelector(".link__playlist");
// loadSavedPlaylist();

playlistLink.addEventListener("click", () => {
  loadSavedPlaylist();
});
