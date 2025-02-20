import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";


const ImageRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  return (
    <div id="image-renderer" >
      <img id="image-img" width={config?.width ?? "100%"} height={config?.height ?? 'auto'} src={document?.url as string} />
    </div>
  );
};

export default ImageRender;

ImageRender.supportedFileTypes = ["jpeg", "jpg", "bmp", "png", "gif", "svg"];
