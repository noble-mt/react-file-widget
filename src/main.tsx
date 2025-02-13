import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";
import { POSTER_QUALITY } from "modals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div style={{ paddingLeft: "200px", paddingRight: "200px", maxWidth: "100%" }}>
      <FileWidget
        file={{ url: 'https://player.vimeo.com/video/90509568' }}
        width="700px"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high'  }}
      />
      <div style={{ height: "100px"}} />
      <FileWidget
        file={{ url: 'https://www.youtube.com/watch?v=hd1-CKDyHXE' }}
        width="500px"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high', hideFullScreen: true  }}
      />
      <div style={{ height: "100px"}} />
      <FileWidget
        file={{ url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high',  hideFullScreen: true  }}
      />
    </div>
  </React.StrictMode>
);
