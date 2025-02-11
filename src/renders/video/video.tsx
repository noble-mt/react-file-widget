import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";


const VideoRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  return (
    <div id="video-renderer" >
      <video id="video-img" width={config?.width} height={config?.height ?? 'auto'} src={document?.url as string} controls={!config?.videoProps?.hideControls} />
    </div>
  );
};

export default VideoRender;

VideoRender.supportedFileTypes = ["mp4"];
