import { RFW_FileRenderer } from 'modals';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import { useEffect, useRef } from 'react';
import { PlayButton, VideoContainer, WrapperContainer } from '../../shared/wrapper-contr';
import React from 'react';

const VideoRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad);

  useEffect(() => {
    if (showVideo && config?.videoProps?.start) {
      if (videoElement?.current) {
        videoElement.current.currentTime = config?.videoProps?.start;
      }
    }
  }, [config?.videoProps?.start, showVideo]);

  useEffect(() => {
    if (showVideo) {
      if (videoElement?.current) {
        videoElement.current.onloadeddata = () => {
          videoElement?.current?.play?.();
        };
      }
    }
  }, [showVideo]);

  const handleEnableVideo = () => {
    setShowVideo(true);
  };

  const warmUpTheUrl = () => {
    setPreConnected(true);
  };

  useEffect(() => {
    if (file?.file && videoElement.current) {
      const objectUrl = URL.createObjectURL(file?.file);
      videoElement.current.src = objectUrl;
      return () => URL.revokeObjectURL(objectUrl);
    } else if (file?.url && videoElement.current) {
      videoElement.current.src = file?.url;
    }
  }, [file?.file, showVideo]);

  return (
    <WrapperContainer config={config} className={config?.classNames?.content}>
      {preConnected ? <link rel="preconnect" href={file?.url} /> : ''}
      <VideoContainer
        onPointerOver={warmUpTheUrl}
        onClick={handleEnableVideo}
        config={config}
        className={`video-container ${config?.classNames?.videoContainer}`}
        style={{
          backgroundImage: `url(${config?.videoProps?.poster})`,
          ...({} as React.CSSProperties),
        }}
      >
        <PlayButton config={config} className={config?.classNames?.playButton} />
        {showVideo ? (
          <video
            ref={videoElement}
            width={config?.width}
            height={config?.height ?? 'auto'}
            controls={!config?.videoProps?.hideControls}
            autoPlay={config?.videoProps?.autoplay}
            loop={config?.videoProps?.loop}
            muted={config?.videoProps?.muted}
            playsInline={!config?.videoProps?.disableInlineOnMobile}
          />
        ) : (
          ''
        )}
      </VideoContainer>
    </WrapperContainer>
  );
};

export default VideoRender;

VideoRender.supportedFileTypes = ['mp4', 'webm', 'ogg', 'video/mp4', 'video/webm', 'video/ogg'];
