import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";


const MSDocRender: RFW_FileRenderer = () => {
  const document = useGetDocument();
  const config = useGetConfig();

  return (
    <div id="image-renderer" >
      {document?.url ? (
        <iframe
          id="msdoc-iframe"
          title="msdoc-iframe"
          width={config?.width}
          height={config?.height ?? 'auto'}
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            document.url
          )}`}
          frameBorder="0"
        />
      ) : ''}
    </div>
  );
};

export default MSDocRender;

MSDocRender.supportedFileTypes = ["doc", "docx", "xlsx", "ppt", "pptx"];