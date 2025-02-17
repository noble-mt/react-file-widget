import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect } from "react";


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
    <div id="html-renderer" >
      <iframe id="rfw_html_container" width={config?.width ?? "100%"} height={config?.height ?? 'auto'} sandbox="allow-same-origin" src={file?.url ?? ''} />
    </div>
  );
};

export default HTMLRender;

HTMLRender.supportedFileTypes = ["html"];

