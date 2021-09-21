import YoutubeHttpClient from "./YoutubeHttpClient.js";
import environment from "./environment.js";

const youtubeClient = new YoutubeHttpClient(
  environment.BASE_URL,
  environment.CHANNEL_NAME,
  environment.API_KEY
);

const playlistVideos = await youtubeClient.getPlaylistVideos(
  environment.PLAYLIST_ID,
  48
);

const videoWrapperList = document.querySelector(".videos-list");

playlistVideos.forEach((video) => {
  const thumbnail = video.snippet.thumbnails.medium.url;
  const template = `<li class="card video-item">
      <img class=" card-img-top video-item-image" src="${thumbnail}" alt="${video.snippet.title}" id="${video.snippet.resourceId.videoId}" />
      <div class="card-body">
        <h5 class="card-title video-item-title">${video.snippet.title}</h5>
      </div>
    </li>`;

  videoWrapperList.insertAdjacentHTML("beforeend", template);
});

const videosThumbHandler = document.querySelectorAll(".video-item-image");

const videoModal = new bootstrap.Modal(document.querySelector("#video-modal"));
const youtubeVideoplayer = document.querySelector("#youtube-videoplayer");
const modalVideoTitle = document.querySelector("#video-modal-label");

videosThumbHandler.forEach((video) => {
  video.addEventListener("click", (event) => {
    event.preventDefault();

    youtubeVideoplayer.src = "";
    const videoId = event.target.id;
    modalVideoTitle.innerHTML = event.target.alt;
    youtubeVideoplayer.src = `https://www.youtube.com/embed/${videoId}`;

    videoModal.show();
  });
});
