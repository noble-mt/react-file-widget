import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./renders";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileWidget file={{ url: 'https://www.gstatic.com/webp/gallery3/1.png' }} renderers={AllRenderers} />
  </React.StrictMode>
);
