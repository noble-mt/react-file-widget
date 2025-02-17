import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useState } from "react";

const TextXmlRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [content, setContent] = useState<string>(file?.url ? "" : file?.fileData as string);
  const [error , SetError] = useState<boolean>(false);

  console.log('here')

  useEffect(() => {
      if (file?.url) {
          fetch(file?.url)
              .then(res => res.text())
              .then(res => {
                setContent(res);
              }).catch(() => SetError(true));
      }
  }, [file?.url]);

  return (
    <div id="txt-renderer" >
      <div id="txt" style={{width: config?.width, height: config?.height ?? 'auto' }} >
        {content}
      </div>
    </div>
  );
};

export default TextXmlRender;

TextXmlRender.supportedFileTypes = ["txt"];

