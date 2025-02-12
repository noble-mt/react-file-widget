import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileWidget file={{ url: 'https://www.youtube.com/watch?v=hd1-CKDyHXE' }} width="400px"  renderers={AllRenderers} videoProps={{ hideControls: false, autoplay: true, start: 40  }}/>
  </React.StrictMode>
);
