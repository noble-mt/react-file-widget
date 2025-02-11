import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileWidget file={{ url: 'https://www.youtube.com/playlist?list=PLbpi6ZahtOH4x7Nr-foVTUSX5rhsYcsoT' }} width="400px"  renderers={AllRenderers} videoProps={{ hideControls: true  }}/>
  </React.StrictMode>
);
