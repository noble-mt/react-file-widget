import { FC, useEffect, useState } from "react";
import { extractFileExtension } from "../utils/file-extensions";
import { RFW_FileRenderer } from "modals";
import { useGetConfig, useGetDocument } from "../utils/context-helpers";
import ErrorPage from "./../shared/error-page";
import { Header } from "./../shared/header";

interface RendererProps {
  renderers: RFW_FileRenderer[];
}


export const Renderer = ({ renderers }: RendererProps) => {
  const document = useGetDocument();
  const config = useGetConfig();

  const [CurrentRenderer, setCurrentRenderer] = useState<RFW_FileRenderer | undefined | null >(undefined);

  useEffect(() => {
    if (document) {
      if (!document.fileType && document?.url) {
        setCurrentRenderer(undefined);
        const extension = extractFileExtension(document.url);
        const matched = renderers?.some((Render) => {
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
        if (!matched) {
          setCurrentRenderer(null)
        }
      } else if (document.fileType) {
        // Passing File type by custom. Is used for code demo
        setCurrentRenderer(undefined);
        renderers?.some((Render) => {
          if (Render.supportedFileTypes?.find(ext => ext === document.fileType)) {
            setCurrentRenderer(() => Render);
            return true;
          }
        });
      } else if (document.file) {
        // Todo local file data
        setCurrentRenderer(undefined);
        const fileType = document.file?.type?.toLowerCase();
        console.log(document.file)
        renderers?.some((Render) => {
          if (Render.supportedFileTypes?.find(ext => ext === fileType)) {
            setCurrentRenderer(() => Render);
            return true;
          }
        });
      }
    }
  }, [document?.url, document?.fileType])

  return (
    <>
    
      {config?.hideHeader ? '' : <Header />}
      {CurrentRenderer === undefined ? (
        <div>Loading</div>
      ): ''}
      {CurrentRenderer === null ? (
        <ErrorPage  />
      ): ''}
      {CurrentRenderer ? (
        <CurrentRenderer  />
      ) : ''}
    </>
  );
};

