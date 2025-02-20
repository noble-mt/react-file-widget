import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect } from "react";
import { PlayButton, VideoContainer } from "../../shared/wrapper-contr";
import React from "react";
import loadScript from 'load-script';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaPipButton,
  MediaFullscreenButton,
} from 'media-chrome/react';


const VideoRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();

  // useEffect(() => {
  //   loadScript('https://cdn.jsdelivr.net/npm/media-chrome@4/+esm', () => {});
  // }, [])

  
  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad)

  useEffect(() => {
    if (showVideo && config?.videoProps?.start) {
      const myvideo: any = document?.getElementById?.('myvideo');
      if (myvideo) {
        myvideo.currentTime = config?.videoProps?.start;
      }
    }
  }, [config?.videoProps?.start, showVideo]);

  useEffect(() => {
    if (showVideo) {
      const myvideo: any = document?.getElementById?.('myvideo');
      if (myvideo) {
        myvideo.onloadeddata = () => {
          myvideo?.play?.();
        };
      }
    }
  }, [showVideo]);

  const handleEnableVideo = () => {
    setShowVideo(true);
    
  }

  const warmUpTheUrl = () => {
    setPreConnected(true);
  }

  return (
    <div id="video-renderer" >
      {preConnected ? <link rel="preconnect" href={file?.url} /> : ''}
      <VideoContainer
        onPointerOver={warmUpTheUrl}
        onClick={handleEnableVideo}
        // data-title={videoMeta?.title}
        style={{
          width: config?.width ?? "100%",
          height: config?.height ?? '100%',
          backgroundImage: `url(${config?.videoProps?.poster})`,
          ...({
          } as React.CSSProperties),
        }}
        >
          <PlayButton />
          {showVideo ?
            <MediaController class="video">
              <video
                slot="media"
                src={file?.url}
                crossOrigin=""
              >
              </video>
              <MediaControlBar>
                <MediaPlayButton />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaTimeRange />
                <MediaPipButton />
                <MediaFullscreenButton />
              </MediaControlBar>
            </MediaController>
          : ''}
      </VideoContainer>
    </div>
  );
};

export default VideoRender;

VideoRender.supportedFileTypes = ["mp4", "webm", "ogg", "mkv", "avi", "m3u8"];
