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
          width="100%"
          height="100%"
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

MSDocRender.supportedFileTypes = [
  "doc",
  "application/msword",
  "docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "xls",
  "application/vnd.ms-excel",
  "xlsx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "ppt",
  "application/vnd.ms-powerpoint",
  "pptx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "xls"
];