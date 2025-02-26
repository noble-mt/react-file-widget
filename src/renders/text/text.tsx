import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useState } from "react";
import { WrapperContainer } from "./../../shared/wrapper-contr";
import ErrorPage from "../../shared/error-page";

const TextXmlRender: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [content, setContent] = useState<string>(file?.data as string);
  const [error , SetError] = useState<boolean>(false);

  console.log('here')

  useEffect(() => {
      if (file?.url) {
          fetch(file?.url)
              .then(res => res.text())
              .then(res => {
                setContent(res);
              }).catch(() => SetError(true));
      } else if (file?.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setContent(text)
        };
        reader.onerror = () => SetError(true);
        reader.readAsText(file.file);
      }
  }, [file?.url]);

  return (
    <WrapperContainer config={config} className={config?.classNames?.content}>
      {error ? <ErrorPage /> : content}
    </WrapperContainer>
  );
};

export default TextXmlRender;

TextXmlRender.supportedFileTypes = ["txt"];

