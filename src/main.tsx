import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";
import { POSTER_QUALITY } from "modals";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div style={{ paddingLeft: "200px", paddingRight: "200px", maxWidth: "100%" }}>
      {/* <FileWidget
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
      <div style={{ height: "100px"}} /> */}
      <FileWidget
        file={{ url: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high',  hideFullScreen: true  }}
      />
      <div style={{ height: "100px"}} />
      {/* <FileWidget
        file={{ url: 'https://www.twitch.tv/bean' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high',  hideFullScreen: true  }}
        twitchProps={{ parent: 'localhost' }}
      /> */}
      {/* <FileWidget
        file={{ url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      />
       */}
    </div>
  </React.StrictMode>
);
