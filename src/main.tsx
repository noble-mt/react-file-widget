import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "renders";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileWidget document={{ url: 'https://www.seek.com.au/jobs/in-Parramatta-&-Western-Suburbs-Sydney-NSW/part-time?jobId=81785074&type=standard' }} renderers={AllRenderers} />
  </React.StrictMode>
);
