import * as React from "react";

import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { convertSecondsToVideoTime } from "../../utils/time";
export const MATCH_URL_VIMEO = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/
// const posterImp = 'hqdefault'; //| "default"| "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"
// const vi_format = 'vi'; // vi_webp
// const format = 'jpg'; // 'webp'

const VimeoRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    if (document?.url) {
      if (MATCH_URL_VIMEO.test(document.url)) {
        setId(document.url.match(MATCH_URL_VIMEO)?.[1] ?? '');
      }
    }
  }, [document?.url]);

  // const posterUrl = `https://i.ytimg.com/${vi_format}/${id}/${posterImp}.${format}`;

  const baseUrl = "https://player.vimeo.com";
  const mutedImp = config?.videoProps?.muted ? "&muted=true" : "&muted=false";
  const controls = config?.videoProps?.hideControls ? "0" : "1";
  const autoPlay = config?.videoProps?.autoplay ? "&autoplay=true" : "&autoplay=false";
  const noCookie = config?.videoProps?.noCookie ? "&dnt=true" : "&dnt=false";
  const keyboard = config?.videoProps?.disableKeyBoard ? "&keyboard=0" : "&keyboard=1";
  const loop = config?.videoProps?.loop ? "&loop=1" : "&loop=0";
  const playsinline = config?.videoProps?.disableInlineOnMobile ? "&playsinline=0" : "";
  const start = config?.videoProps?.start ? `&#t=${convertSecondsToVideoTime(config?.videoProps?.start)}` : "";

  const iframeSrc = `${baseUrl}/video/${id}?controls=${controls}${autoPlay}${mutedImp}${noCookie}${loop}${keyboard}${playsinline}${start}`

  return (
    <div id="vimeo-renderer" >
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

VimeoRender.supportUrlPatterns = MATCH_URL_VIMEO

export default VimeoRender;

