import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "video.js/dist/lang/fa.json";
import "./VideoPlayer.css";
import "videojs-hotkeys";

const VideoPlayer = ({ options }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  document.addEventListener("contextmenu", function (event) {
    const target = event.target as HTMLElement | null;
    if (target?.tagName === "VIDEO") {
      event.preventDefault();
    }
  });
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.dispose();
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;
    // Initialize video.js player
    playerRef.current = videojs(videoElement, options, () => {
      console.log(videoElement);
      const bigp = document.querySelector(".vjs-big-play-button");
      if (bigp) {
        bigp.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 mx-auto ml-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
        </svg>`;
      }
    });

    // Initialize hotkeys plugin
    playerRef.current.hotkeys({
      enableModifiersForNumbers: true,
      seekStep: 10,
      volumeStep: 0.1,
      enableVolumeScroll: false,
      alwaysCaptureHotkeys: true,
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div data-vjs-player className="my-4 mx-auto max-w-screen-md relative flex-1 !w-1/2 !h-80">
      <video 
        ref={videoRef}
        className="video-js !p-0 vjs-default-skin rounded-xl overflow-hidden !w-full !h-full object-none "
      />
    </div>
  );
};

export default VideoPlayer;
