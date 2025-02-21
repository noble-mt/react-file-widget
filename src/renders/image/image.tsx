import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { WrapperContainer } from "./../../shared/wrapper-contr";


const ImageRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  return (
    <WrapperContainer config={config}>
      <img id="image-img" style={{ maxWidth: "auto", height: "auto" }} src={document?.url as string} />
    </WrapperContainer>
  );
};

export default ImageRender;

ImageRender.supportedFileTypes = ["jpeg", "jpg", "bmp", "png", "gif", "svg"];
