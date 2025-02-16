import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget, getDefaultWidgets } from "./index";
import { AllRenderers } from "./index";
import { POSTER_QUALITY } from "./modals";
import { ZoomController } from "./renders/pdf/widgets/zoom-widget";
import { Header } from "./renders/pdf/components/header";
import { PageSelector } from "./renders/pdf/components/page-selector";

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
      <div style={{ height: "100px"}} />
      <FileWidget
        file={{ url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high',  hideFullScreen: true  }}
      />
      <div style={{ height: "100px"}} />
      <FileWidget
        file={{ url: 'https://www.twitch.tv/bean' }}
        width="100%"
        height="100%"
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high',  hideFullScreen: true  }}
        twitchProps={{ parent: 'localhost' }}
      />
      <div style={{ height: "100px"}} /> */}
      {/* <div style={{ height: "600px"}} >
        <FileWidget
          file={{ url: 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf' }}
          width="800px"
          height="600px"
          renderers={AllRenderers}
          pdfProps={{
            paginated: true,
            widgets: getDefaultWidgets(),
            hidePageSelector: false,
            hideHeader: true
          }}
        />
      </div>
      <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/code/html/sample1.html' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      />
      */}
       {/* <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/document/docx/sample1.docx' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      /> */}
      {/* <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/document/csv/sample2.csv' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      /> */}
      {/* <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/document/txt/sample1.txt' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      />
      <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/code/xml/sample2.xml' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      /> */}
      <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/code/json/sample2.json' }}
        width="800px"
        height="100%"
        renderers={AllRenderers}
      />

    </div>
  </React.StrictMode>
);
