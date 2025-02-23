import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "./code.css";
import { RFW_codeLangExtensions } from "./../../modals/code-lang";
import { getPrimsSyntaxTypeForCode } from "../../utils/file-extensions";
import 'prismjs/plugins/autoloader/prism-autoloader';
import { WrapperContainer } from "./../../shared/wrapper-contr";
Prism.plugins.autoloader.languages_path = `https://unpkg.com/prismjs@latest/components/`;


const CodeRenderer: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [content, setContent] = useState<string>(file?.url ? "" : file?.data as string);
  const [error, SetError] = useState<boolean>(false);
  const codeElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (file?.url) {
      fetch(file?.url)
        .then((res) => res.text())
        .then((res) => {
          setContent(res);
        })
        .catch(() => SetError(true));
    }
  }, [file?.url]);

  useEffect(() => {
    if (content && codeElement.current) {
      Prism.highlightElement(codeElement.current)
    }
  }, [content]);

  const lang = file?.language ?? getPrimsSyntaxTypeForCode(file?.url ?? '')

  return (
    <WrapperContainer config={config} className={config?.theme === 'light' ? "parent-code-class-light" : "parent-code-class-dark"}>
      <pre>
        <code className={`language-${lang}`} ref={codeElement}>{content}</code>
      </pre>
    </WrapperContainer>
  );
};


export default CodeRenderer;

CodeRenderer.supportedFileTypes = [ "code", ...Object.keys(RFW_codeLangExtensions)];
