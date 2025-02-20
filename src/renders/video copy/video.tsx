import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect } from "react";
import { PlayButton, VideoContainer } from "../../shared/wrapper-contr";
import React from "react";


const VideoRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();

  
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
            <video
              id="myvideo"
              width={config?.width}
              height={config?.height ?? 'auto'}
              src={file?.url as string}
              controls={!config?.videoProps?.hideControls}
              autoPlay={config?.videoProps?.autoplay}
              loop={config?.videoProps?.loop}
              muted={config?.videoProps?.muted}
              playsInline={!config?.videoProps?.disableInlineOnMobile}
            />
          : ''}
      </VideoContainer>
    </div>
  );
};

export default VideoRender;

VideoRender.supportedFileTypes = ["mp4", "webm", "ogg", "wav"];
