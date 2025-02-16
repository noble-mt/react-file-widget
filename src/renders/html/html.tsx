import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";


const HTMLRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();


  return (
    <div id="html-renderer" >
      <iframe id="html-img" width={config?.width} height={config?.height ?? 'auto'} sandbox="allow-same-origin" src={document?.url} />
    </div>
  );
};

export default HTMLRender;

HTMLRender.supportedFileTypes = ["html"];

