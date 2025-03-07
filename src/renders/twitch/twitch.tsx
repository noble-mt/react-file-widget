import * as React from 'react';

import { RFW_FileRenderer } from '../../modals';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import { convertSecondsToTwitchTime } from '../../utils/time';
import { PlayButton, VideoContainer, WrapperContainer } from '../../shared/wrapper-contr';
export const MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
export const MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;
export const MATCH_URL_TWITCH_COLLECTION = /(?:www\.|go\.)?twitch\.tv\/collections\/([a-zA-Z0-9]+)($|\?)/;
export const MATCH_URL_TWITCH =
  /(?:www\.|go\.)?twitch\.tv\/(?:(videos\/(\d+))|(collections\/([a-zA-Z0-9]+))|([a-zA-Z0-9_]+))($|\?)/;

const baseUrl = 'https://player.twitch.tv';

const TwitchRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [preConnected, setPreConnected] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState<boolean>(!config?.videoProps?.disablePreLoad);

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

  const mutedImp = config?.videoProps?.muted ? '&muted=true' : '&muted=false';
  const controls = config?.videoProps?.hideControls ? '0' : '1';
  const autoPlay =
    config?.videoProps?.autoplay || config?.videoProps?.disablePreLoad ? '&autoplay=true' : '&autoplay=false';
  const start = config?.videoProps?.start ? `&#t=${convertSecondsToTwitchTime(config?.videoProps?.start)}` : '';

  const iframeSrc = `${baseUrl}/?${type}=${id}&parent=${config?.twitchProps?.parent}&controls=${controls}${autoPlay}${mutedImp}${start}`;

  React.useEffect(() => {
    if (!config?.twitchProps?.parent) {
      console.log(
        'Error: Twitch Require Parent Property to embed videos. Please pass it like twitchProps: { parent: HOST } }'
      );
    }
  }, [config?.twitchProps?.parent]);

  return (
    <WrapperContainer config={config} className={config?.classNames?.content}>
      {/* <link rel={config?.videoProps?.preLoadMethod ?? 'preload'} href={baseUrl} as="image" /> */}
      {preConnected && iframeSrc ? <link rel="preconnect" href={iframeSrc} /> : ''}
      <VideoContainer
        onPointerOver={() => setPreConnected(true)}
        onClick={() => setShowVideo(true)}
        config={config}
        className={`video-container ${config?.classNames?.videoContainer}`}
        style={{
          backgroundImage: config?.videoProps?.poster ? `url(${config?.videoProps?.poster})` : '',
          ...({
            '--aspect-ratio': `${(9 / 15) * 100}%`,
          } as React.CSSProperties),
        }}
      >
        <PlayButton config={config} className={config?.classNames?.playButton} />
        {showVideo ? (
          <iframe
            title={''}
            width={config?.width ?? '100%'}
            height={config?.height ?? '100%'}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={config?.videoProps?.hideFullScreen}
            src={iframeSrc}
          ></iframe>
        ) : (
          ''
        )}
      </VideoContainer>
    </WrapperContainer>
  );
};

TwitchRender.supportUrlPatterns = MATCH_URL_TWITCH;

export default TwitchRender;
