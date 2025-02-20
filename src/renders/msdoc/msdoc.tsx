import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { WrapperContainer } from "./../../shared/wrapper-contr";


const MSDocRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  return (
    <WrapperContainer config={config}>
      {document?.url ? (
        <iframe
          id="msdoc-iframe"
          title="msdoc-iframe"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            document.url
          )}`}
          frameBorder="0"
        />
      ) : ''}
    </WrapperContainer>
  );
};

export default MSDocRender;

MSDocRender.supportedFileTypes = ["doc", "docx", "xlsx", "ppt", "pptx", "xls"];