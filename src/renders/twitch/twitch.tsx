import * as React from "react";

import { RFW_FileRenderer } from "../../modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { convertSecondsToVideoTime } from "../../utils/time";
import { PlayButton, VideoContainer } from "../../shared/video-image-contr";
export const MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/
export const MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/
export const MATCH_URL_TWITCH_COLLECTION = /(?:www\.|go\.)?twitch\.tv\/collections\/([a-zA-Z0-9]+)($|\?)/
export const MATCH_URL_TWITCH = /(?:www\.|go\.)?twitch\.tv\/(?:(videos\/(\d+))|(collections\/([a-zA-Z0-9]+))|([a-zA-Z0-9_]+))($|\?)/;

const baseUrl = "https://player.twitch.tv";

const TwitchRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad)

  const [id, setId] = React.useState<string>('');
  const [type, setType] = React.useState<'video' | 'collection' | 'channel' | undefined>(undefined);

  React.useEffect(() => {
    if (document?.url) {
      if (MATCH_URL_TWITCH_VIDEO.test(document.url)) {
        setId(document.url.match(MATCH_URL_TWITCH_VIDEO)?.[1] ?? '');
        setType('video');
      }
      if (MATCH_URL_TWITCH_COLLECTION.test(document.url)) {
        setId(document.url.match(MATCH_URL_TWITCH_COLLECTION)?.[1] ?? '');
        setType('collection');
      }
      if (MATCH_URL_TWITCH_CHANNEL.test(document.url)) {
        setId(document.url.match(MATCH_URL_TWITCH_CHANNEL)?.[1] ?? '');
        setType('channel');
      }
    }
  }, [document?.url]);

  const mutedImp = config?.videoProps?.muted ? "&muted=true" : "&muted=false";
  const controls = config?.videoProps?.hideControls ? "0" : "1";
  const autoPlay = config?.videoProps?.autoplay || config?.videoProps?.disablePreLoad ? "&autoplay=true" : "&autoplay=false";
  const noCookie = config?.videoProps?.noCookie ? "&dnt=true" : "&dnt=false";
  const keyboard = config?.videoProps?.disableKeyBoard ? "&keyboard=0" : "&keyboard=1";
  const loop = config?.videoProps?.loop ? "&loop=1" : "&loop=0";
  const playsinline = config?.videoProps?.disableInlineOnMobile ? "&playsinline=0" : "";
  const start = config?.videoProps?.start ? `&#t=${convertSecondsToVideoTime(config?.videoProps?.start)}` : "";

  const iframeSrc = `${baseUrl}/video/${id}?controls=${controls}${autoPlay}${mutedImp}${noCookie}${loop}${keyboard}${playsinline}${start}`;

  return (
    <div id="vimeo-renderer" style={{ width: "100%"}}>
      {/* <link rel={config?.videoProps?.preLoadMethod ?? 'preload'} href={baseUrl} as="image" /> */}
      {preConnected && iframeSrc ? <link rel="preconnect" href={iframeSrc} /> : ''}
      <VideoContainer
        onPointerOver={() => setPreConnected(true)}
        onClick={() => setShowVideo(true)}
        style={{
          width: config?.width ?? "100%",
          height: config?.height ?? '100%',
          backgroundImage: config?.videoProps?.poster ? `url(${config?.videoProps?.poster})` : '',
          ...({
            '--aspect-ratio': `${(9 / 15) * 100}%`,
          } as React.CSSProperties),
        }}
        >
          <PlayButton />
          {showVideo ? (
            <iframe
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

TwitchRender.supportUrlPatterns = MATCH_URL_TWITCH

export default TwitchRender;

