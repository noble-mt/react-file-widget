import * as React from "react";

import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { PlayButton, VideoContainer } from "../../shared/wrapper-contr";
const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
const MATCH_PLAYLIST = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/
const MATCH_USER_UPLOADS = /user\/([a-zA-Z0-9_-]+)\/?/
const posterImp = 'hqdefault'; //| "default"| "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"
const vi_format = 'vi'; // vi_webp
const format = 'jpg'; // 'webp'


const YoutubeRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();

  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad)
  const [type, setType] = React.useState<'video' | 'playlist' | 'user' | null>(null);
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    if (file?.url) {
      if (MATCH_PLAYLIST.test(file.url)) {
        setId(file.url.match(MATCH_PLAYLIST)?.[1] ?? '');
        setType('playlist');
      }
      else if (MATCH_USER_UPLOADS.test(file.url)) {
        setId(file.url.match(MATCH_USER_UPLOADS)?.[1] ?? '');
        setType('user');
      }
      if (MATCH_URL_YOUTUBE.test(file.url)) {
        setId(file.url.match(MATCH_URL_YOUTUBE)?.[1] ?? '');
        setType('video');
      }
    }
  }, [file?.url]);

  const posterUrl = id ? (() => {
    switch(config?.videoProps?.posterQuality ?? '') {
      case 'low': return `https://i.ytimg.com/${vi_format}/${id}/sddefault.${format}`;
      case 'medium': return  `https://i.ytimg.com/${vi_format}/${id}/mqdefault.${format}`;
      default: return  `https://i.ytimg.com/${vi_format}/${id}/hqdefault.${format}`;
    }
  })() : '';

  const ytUrl = config?.videoProps?.noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  const mutedImp = config?.videoProps?.muted ? "&mute=1" : "";
  const controls = config?.videoProps?.hideControls ? "0" : "1";
  const autoPlay = config?.videoProps?.autoplay || config?.videoProps?.disablePreLoad ? "&autoplay=1" : "&autoplay=0";
  const keyboard = config?.videoProps?.disableKeyBoard ? "&disablekb=0" : "";
  const loop = config?.videoProps?.loop ? "&loop=1" : "&loop=0";
  const playsinline = config?.videoProps?.disableInlineOnMobile ? "&playsinline=0" : "";
  const start = config?.videoProps?.start ? `&start=${config?.videoProps?.start}` : "";
  const hideFullScreen = config?.videoProps?.start ? `&fs=0` : "";
  
  const iframeSrc = (() => {
    switch (type) {
      case 'video':
        return `${ytUrl}/embed/${id}?controls=${controls}&state=1${mutedImp}&${autoPlay}${keyboard}${loop}${playsinline}${start}${hideFullScreen}`;
      case 'playlist':
        return `${ytUrl}/embed/videoseries?list=${id}&controls=${controls}${mutedImp}&${autoPlay}${keyboard}${loop}${playsinline}${start}${hideFullScreen}`;
      default:
        return undefined;
    }
  })();

  return (
    <div id="youtube-renderer" >
      {id ? <link rel={config?.videoProps?.preLoadMethod ?? 'preload'} href={ytUrl} as="image" /> : ''}
      {preConnected && iframeSrc ? <link rel="preconnect" href={iframeSrc} /> : ''}
      <VideoContainer
        onPointerOver={() => setPreConnected(true)}
        onClick={() => setShowVideo(true)}
        className="video-container"
        style={{
          width: config?.width ?? "100%",
          height: config?.height ?? '100%',
          backgroundImage: `url(${posterUrl})`,
          ...({
          } as React.CSSProperties),
        }}
        >
          <PlayButton />
        {showVideo ?
          <iframe
            title={''}
            width={config?.width ?? "100%"}
            height={config?.height ?? '100%'}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={config?.videoProps?.hideFullScreen}
            src={iframeSrc}
          ></iframe>
        : ''}
      </VideoContainer>
    </div>
  );
};

YoutubeRender.supportUrlPatterns = MATCH_URL_YOUTUBE

export default YoutubeRender;

