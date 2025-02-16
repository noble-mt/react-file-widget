import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "./json.css";

const JSONRenderer: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const [content, setContent] = useState<string>("");
  const [error, SetError] = useState<boolean>(false);

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
	if (content) {
		Prism.highlightAll();
	}
  }, [content]);

  return (
    <div id="txt-renderer">
      <div
        id="txt"
        style={{ width: config?.width, height: config?.height ?? "auto" }}
      >
        <pre>
          <code className="language-json">{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default JSONRenderer;

JSONRenderer.supportedFileTypes = ["json"];
