import React from "react";
import ReactDOM from "react-dom/client";
import { FileWidget } from "./index";
import { AllRenderers } from "./index";
import { POSTER_QUALITY } from "./modals";
import { ZoomController } from "./renders/pdf/widgets/zoom-widget";
import { Header } from "./shared/header";
import { PageSelector } from "./renders/pdf/components/page-selector";
import { useState } from "react";
import { languages } from "prismjs";

const App = () => {
  const Files = [
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/code/html/sample2.html'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/xls/sample2.xls'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/txt/sample2.txt'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/pptx/sample2.pptx'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/pdf/sample2.pdf'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/docx/sample2.docx'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/docx/sample2.docx'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/document/doc/sample2.doc'
    },
    {
      title: 'This is a header Example',
      url: 'https://gist.githubusercontent.com/noble-mt/91aee9b17e3cef0f743d8b7a2c75589d/raw/22f80c273e297d9ee9a57e911b9352f9e4eede79/sample-csv-file-for-live-testing.csv'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/image/svg/sample2.svg'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/image/png/sample2.png'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/image/jpg/sample2.jpg'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/image/bmp/sample2.bmp'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/code/yaml/sample2.yaml'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/code/xml/sample2.xml'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/code/json/sample2.json'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.filesampleshub.com/download/audio/wav/sample2.WAV'
    },
    {
      title: 'This is a header Example',
      url: 'https://player.vimeo.com/video/90509568'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.youtube.com/watch?v=hd1-CKDyHXE'
    },
    {
      title: 'This is a header Example',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4'
    },
    {
      title: 'This is a header Example',
      url: 'https://www.twitch.tv/bean'
    },
    {
      fileType: 'code',
      language: 'python' as const,
      data:`
class Greeter:
def __init__(self, name):
  self.name = name

def greet(self):
  print(f"Hello, {self.name}!")

greeter = Greeter("Alice")
greeter.greet()
`
    }
  ];
  return (
    <>
      {Files.map(item => <>
          <div style={{ height: "100px"}} />
          <FileWidget
            file={item}
            renderers={AllRenderers}
            width="600px"
            height="500px"
            theme="dark"
            inline
            // hideHeader
            imageProps={{
              pictureMode: 'best-fit'
            }}
            videoProps={{
              disablePreLoad: true
            }}
            pdfProps={{
              pageSelectorPosition: 'left',
              hidePageSelector: false,
            }}
            widgets={[ZoomController]}
          />
        </>
      )}
    </>
  )
}
const FileUpload = () => {
  const [fileData, setFileData] = useState<File | null>(null);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileData(file);
      // console.log(file.arrayBuffer);
      // // console.log(fileType);
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   if (e.target?.result) {
      //     setFileData(e.target?.result);
      //   }
      // };
      // reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {fileData ? (
        <FileWidget
          file={{ 
            file: fileData
          }}
          // width="700px"
          // height="100%"
          inline
          renderers={AllRenderers}
          videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high'  }}
        />
      ) : ''}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div style={{ paddingLeft: "200px", paddingRight: "200px", maxWidth: "100%" }}>
     
      <App />
      <FileUpload />
      {/* <App /> */}
      {/* <App /> */}
      <FileWidget
        file={{ url: 'https://playerss.vimseo.com/video/90509568' }}
        // width="700px"
        // height="100%"
        inline
        renderers={AllRenderers}
        videoProps={{ disablePreLoad: true, hideControls: false, autoplay: true, start: 40, posterQuality: 'high'  }}
        classNames={{
          error: "the total error class"
        }}
        slotProps={{
          error: {
            // height: "250px",
            // backgroundColor: 'red'
          }
        }}
      />
      {/* <div style={{ height: "100px"}} />
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
      /> */}
      {/* <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/code/xml/sample2.xml2' }}
        // width="800px"
        height="400px"
        renderers={AllRenderers}
        theme="dark"
      /> */}
      
      {/* <FileWidget
        file={{ url: 'https://www.filesampleshub.com/download/code/html/sample3.html' }}
        renderers={AllRenderers}
      /> */}
      {/* <FileWidget
        file={{ fileData: "adfjalsdjf lakjsf <p>BOld</p><b>Parra</b> asdf asdf asdfalsdfj asdf asdfasdf asdf asdf asdf ", fileType: 'html'}}
        renderers={AllRenderers}
      /> */}

    </div>
  </React.StrictMode>
);
