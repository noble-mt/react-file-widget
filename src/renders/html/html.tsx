import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect } from "react";
import { WrapperContainer } from "./../../shared/wrapper-contr";


const HTMLRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  
  useEffect(() => {
    if (!file?.url) {
      let iframeCont = document.getElementById(
        "rfw_html_container"
      ) as HTMLIFrameElement | null;
      let iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
      if (!iframe) return;

      const iframeDoc = iframe.document;
      iframeDoc.open();
      iframeDoc.write(`${file?.fileData}`);
      iframeDoc.close();
    }
  }, []);

  return (
    <WrapperContainer config={config}>
      <iframe id="rfw_html_container" width="100%" height="100%"  sandbox="allow-same-origin" src={file?.url ?? ''} />
    </WrapperContainer>
  );
};

export default HTMLRender;

HTMLRender.supportedFileTypes = ["html"];

