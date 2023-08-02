"use strict";

document.addEventListener("DOMContentLoaded", () => {
  loadSavedPlaylist();

  const shareButton = document.querySelector(".share-button");
  shareButton.addEventListener("click", () => {
    // Select the playlist background element
    const playlistBackground = document.querySelector(".playlist");

    // Use html2canvas to convert the background to an image
    html2canvas(playlistBackground).then((canvas) => {
      // Get the image data URL from the canvas
      const imageDataURL = canvas.toDataURL("image/png");

      // Call a function to share the image on Instagram
      shareOnInstagram(imageDataURL);
    });
  });
});

function shareOnInstagram(imageDataURL) {
  // Create a temporary anchor element
  const tempLink = document.createElement("a");
  tempLink.href = imageDataURL;
  tempLink.download = "playlist_background.png"; // Set a filename for the downloaded image

  // Trigger the click event on the anchor element to download the image
  tempLink.click();
}

function loadSavedPlaylist() {
  const savedPlaylistData = JSON.parse(localStorage.getItem("playlistData"));

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
