import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useRef } from "react";

const AudioRenderer: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const audioElement = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
      if (config?.videoProps?.start) {
        if (audioElement?.current) {
          audioElement.current.currentTime = config?.videoProps?.start;
        }
      }
    }, [config?.videoProps?.start]);

    useEffect(() => {
      if (file?.file && audioElement.current) {
        const objectUrl = URL.createObjectURL(file?.file);
        audioElement.current.src = objectUrl;
        return () => URL.revokeObjectURL(objectUrl);
      } else if (file?.url && audioElement.current) {
        audioElement.current.src = file?.url;
      }
    }, [file?.file]);

  return (
    <div id="audio-renderer" >
      <audio
        id="rfw_audio"
        ref={audioElement}
        style={{ width: config?.width ?? "100%"}}
        controls={!config?.videoProps?.hideControls}
        autoPlay={config?.videoProps?.autoplay}
        loop={config?.videoProps?.loop}
        muted={config?.videoProps?.muted}
        playsInline={!config?.videoProps?.disableInlineOnMobile}
      />
    </div>
  );
};

export default AudioRenderer;

AudioRenderer.supportedFileTypes = ["wav", "mp3", "ogg", "audio/wav", "audio/mp3", "audio/ogg", "audio/mpeg"];
