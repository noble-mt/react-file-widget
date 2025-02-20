import * as React from "react";

import { POSTER_QUALITY, RFW_FileRenderer } from "../../modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { convertSecondsToVimeoTime } from "../../utils/time";
import { VideoContainer, PlayButton } from "../../shared/wrapper-contr";
const MATCH_URL_VIMEO = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
const baseUrl = "https://player.vimeo.com";
const apiUrl = "https://vimeo.com/api/v2/video";
// const posterImp = 'hqdefault'; //| "default"| "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault"
// const vi_format = 'vi'; // vi_webp
// const format = 'jpg'; // 'webp'

interface VimeoMeta  {
  id?: string
  title?: string
  description?: string
  url?: string
  upload_date?: string
  thumbnail_small?: string
  thumbnail_medium?: string
  thumbnail_large?: string
  user_id?: number
  user_name?: string
  user_url?: string
  user_portrait_small?: string
  user_portrait_medium?: string
  user_portrait_large?: string
  user_portrait_huge?: string
  stats_number_of_likes?: number
  stats_number_of_plays?: number
  stats_number_of_comments?: number
  duration?: number
  width?: number
  height?: number
  tags?: string
  embed_privacy?: string
}

const VimeoRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad)

  const [id, setId] = React.useState<string>('');
  const [videoMeta, setVideoMeta] = React.useState<VimeoMeta>({});

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
  const autoPlay = config?.videoProps?.autoplay || config?.videoProps?.disablePreLoad ? "&autoplay=true" : "&autoplay=false";
  const noCookie = config?.videoProps?.noCookie ? "&dnt=true" : "&dnt=false";
  const keyboard = config?.videoProps?.disableKeyBoard ? "&keyboard=0" : "&keyboard=1";
  const loop = config?.videoProps?.loop ? "&loop=1" : "&loop=0";
  const playsinline = config?.videoProps?.disableInlineOnMobile ? "&playsinline=0" : "";
  const start = config?.videoProps?.start ? `&#t=${convertSecondsToVimeoTime(config?.videoProps?.start)}` : "";

  const iframeSrc = `${baseUrl}/video/${id}?controls=${controls}${autoPlay}${mutedImp}${noCookie}${loop}${keyboard}${playsinline}${start}`;

  React.useEffect(() => {
    if (!!config?.videoProps?.disablePreLoad && !config?.videoProps?.poster && id) {
      fetch(`${apiUrl}/${id}.json`)
        .then(res => res.json())
        .then(res => setVideoMeta(res?.[0] ?? {}))
    }
  }, [config?.videoProps?.poster, config?.videoProps?.disablePreLoad, id]);

  const posterUrl = React.useMemo(() => {
    if (!config?.videoProps?.disablePreLoad) {
      return '';
    } else if (config?.videoProps?.poster) {
      return config?.videoProps?.poster;
    } else if (videoMeta?.id) {
      if (config?.videoProps?.posterQuality === 'low') {
        return videoMeta?.thumbnail_small;
      } else if (config?.videoProps?.posterQuality === 'medium') {
        return videoMeta?.thumbnail_medium;
      } else {
        return videoMeta?.thumbnail_large;
      } 
    }
  }, [config?.videoProps?.poster, config?.videoProps?.disablePreLoad, config?.videoProps?.posterQuality, videoMeta])

  return (
    <div id="vimeo-renderer" style={{ width: "100%"}}>
      {/* <link rel={config?.videoProps?.preLoadMethod ?? 'preload'} href={baseUrl} as="image" /> */}
      {preConnected && iframeSrc ? <link rel="preconnect" href={iframeSrc} /> : ''}
      <VideoContainer
        onPointerOver={() => setPreConnected(true)}
        onClick={() => setShowVideo(true)}
        data-title={videoMeta?.title}
        style={{
          width: config?.width ?? "100%",
          height: config?.height ?? '100%',
          backgroundImage: posterUrl ? `url(${posterUrl})` : '',
          ...({
            '--aspect-ratio': `${(9 / 15) * 100}%`,
          } as React.CSSProperties),
        }}
        >
          <PlayButton />
          {showVideo ? (
            <iframe
              style={{ backgroundColor: 'black' }}
              title={''}
              width={config?.width ?? "100%"}
              height={config?.height ?? '100%'}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={config?.videoProps?.hideFullScreen}
              src={iframeSrc}
            ></iframe>
          ): ''}
        </VideoContainer>
    </div>
  );
};

VimeoRender.supportUrlPatterns = MATCH_URL_VIMEO

export default VimeoRender;

