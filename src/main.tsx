import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileWidget file={{ url: 'https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' }} renderers={AllRenderers} videoProps={{ hideControls: true  }}/>
  </React.StrictMode>
);
