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
      if (!document.fileType && document?.url) {
        setCurrentRenderer(undefined);
        const extension = extractFileExtension(document.url);
        renderers?.some((Render) => {
          if (Render.supportUrlPatterns) {
            if(Render.supportUrlPatterns.test(document.url ?? '')) {
              setCurrentRenderer(() => Render);
              return true;
            }
          } else if (Render.supportedFileTypes?.find(ext => ext === extension)) {
            setCurrentRenderer(() => Render);
            return true;
          }
        });
        // if (!CurrentRenderer) {
        //   setCurrentRenderer(null)
        // }
      } else if (document.fileType) {
        // Todo local file data
        setCurrentRenderer(undefined);
        renderers?.some((Render) => {
          if (Render.supportedFileTypes?.find(ext => ext === document.fileType)) {
            setCurrentRenderer(() => Render);
            return true;
          }
        });
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

