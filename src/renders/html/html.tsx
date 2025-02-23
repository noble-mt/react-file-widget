import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useState } from "react";
import { WrapperContainer } from "./../../shared/wrapper-contr";
import ErrorPage from "../../shared/error-page";


const HTMLRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [error, SetError] = useState<Boolean>(false);

  const updateData = (data: string) => {
    let iframeCont = document.getElementById(
      "rfw_html_container"
    ) as HTMLIFrameElement | null;
    let iframe = iframeCont?.contentWindow && iframeCont.contentWindow;
    if (!iframe) return;

    const iframeDoc = iframe.document;
    iframeDoc.open();
    iframeDoc.write(`${data}`);
    iframeDoc.close();
  }
  
  useEffect(() => {
    if (!file?.url && file?.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        updateData(text)
      };
      reader.onerror = () => {
        SetError(true);
      };
      reader.readAsText(file.file);
    } else if (!file?.url && file?.data) {
      updateData(file.data)
    }
  }, []);

  return (
    <WrapperContainer config={config}>
      {error ? (
        <ErrorPage />
      ) : (
        <iframe id="rfw_html_container" width="100%" height="100%"  sandbox="allow-same-origin" src={file?.url ?? ''} />
      )}
    </WrapperContainer>
  );
};

export default HTMLRender;

HTMLRender.supportedFileTypes = ["html", "text/html"];

