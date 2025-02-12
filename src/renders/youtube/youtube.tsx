import * as React from "react";

import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//
const MATCH_PLAYLIST = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/
const MATCH_USER_UPLOADS = /user\/([a-zA-Z0-9_-]+)\/?/
// const posterImp = 'hqdefault'; //| "default"| "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"
// const vi_format = 'vi'; // vi_webp
// const format = 'jpg'; // 'webp'


const YoutubeRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [type, setType] = React.useState<'video' | 'playlist' | 'user' | null>(null);
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    if (document?.url) {
      if (MATCH_PLAYLIST.test(document.url)) {
        setId(document.url.match(MATCH_PLAYLIST)?.[1] ?? '');
        setType('playlist');
      }
      else if (MATCH_USER_UPLOADS.test(document.url)) {
        setId(document.url.match(MATCH_USER_UPLOADS)?.[1] ?? '');
        setType('user');
      }
      if (MATCH_URL_YOUTUBE.test(document.url)) {
        setId(document.url.match(MATCH_URL_YOUTUBE)?.[1] ?? '');
        setType('video');
      }
    }
  }, [document?.url]);

  // const posterUrl = `https://i.ytimg.com/${vi_format}/${id}/${posterImp}.${format}`;

  const ytUrl = config?.videoProps?.noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  const mutedImp = config?.videoProps?.muted ? "&mute=1" : "";
  const controls = config?.videoProps?.hideControls ? "0" : "1";
  const autoPlay = config?.videoProps?.autoplay ? "&autoplay=1" : "&autoplay=0";
  const keyboard = config?.videoProps?.disableKeyBoard ? "&disablekb=0" : "";
  const loop = config?.videoProps?.loop ? "&loop=1" : "&loop=0";
  const playsinline = config?.videoProps?.disableInlineOnMobile ? "&playsinline=0" : "";
  const start = config?.videoProps?.start ? `&start=${config?.videoProps?.start}` : "";
  
  const iframeSrc = (() => {
    switch (type) {
      case 'video':
        return `${ytUrl}/embed/${id}?controls=${controls}&state=1${mutedImp}&${autoPlay}${keyboard}${loop}${playsinline}${start}`;
      case 'playlist':
        return `${ytUrl}/embed/videoseries?list=${id}&controls=${controls}${mutedImp}&${autoPlay}${keyboard}${loop}${playsinline}${start}`;
      default:
        return '';
    }
  })();

  return (
    <div id="youtube-renderer" >
      <iframe
        title={''}
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={config?.videoProps?.hideFullScreen}
        src={iframeSrc}
      ></iframe>
    </div>
  );
};

YoutubeRender.supportUrlPatterns = MATCH_URL_YOUTUBE

export default YoutubeRender;

