import { RFW_FileRenderer } from "modals";
import { useGetDocument } from "../../utils/context-helpers";


const ImageRender: RFW_FileRenderer = () => {
  const document = useGetDocument();

  return (
    <div id="image-renderer" >
      <img id="image-img" src={document?.url as string} />
    </div>
  );
};

export default ImageRender;

ImageRender.supportedFileTypes = ["jpeg", "jpg", "bmp", "png", "gif"];
