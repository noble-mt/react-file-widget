import { FC, useEffect, useState } from "react";
import { extractFileExtension } from "../utils/file-extensions";
import { RFW_FileRenderer } from "modals";
import { useGetDocument } from "../utils/context-helpers";

interface RendererProps {
  renderers: RFW_FileRenderer[];
}


export const Renderer = ({ renderers }: RendererProps) => {
  const document = useGetDocument();

  const [CurrentRenderer, setCurrentRenderer] = useState<RFW_FileRenderer | undefined | null >(undefined);

  console.log('re-render', CurrentRenderer)
  useEffect(() => {
    if (document) {
      if (!document.fileType && document.url) {
        console.log('resetting')
        setCurrentRenderer(undefined);
        const extension = extractFileExtension(document.url);
        renderers?.some((Render) => {
          if (Render.supportUrlPatterns) {
            if(Render.supportUrlPatterns.test(document.url)) {
              setCurrentRenderer(() => Render);
              return true;
            }
          } else {
            if (Render.supportedFileTypes?.find(ext => ext === extension)) {
              console.log('matched', Render)
              setCurrentRenderer(() => Render);
              return true;
            }
          }
        });
        // if (!CurrentRenderer) {
        //   setCurrentRenderer(null)
        // }
      } 
      if (document.fileType) {
        // Todo local file data
      }
    }
  }, [document?.url, document?.fileType])

  return (
    <>
      {CurrentRenderer === undefined ? (
        <div>Loading</div>
      ): ''}
      {CurrentRenderer === null ? (
        <div>Not Matched-</div>
      ): ''}
      {CurrentRenderer ? (
        <CurrentRenderer  />
      ) : ''}
    </>
  );
};

