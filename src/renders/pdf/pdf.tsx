import { RFW_FileRenderer } from "../../modals/render";
import React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { useGetConfig, useGetDocument } from "../../utils/context-helpers";

const getMetaURL = () => import.meta.url;


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  getMetaURL()
).toString();

const PdfRenderer: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();

  const [numPages, setNumPages] = React.useState<number>(0);

  return (
    <Document
      file={file?.url}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      loading={<span>Loading...</span>}
    >
      <Page
          pageNumber={0}
          // scale={zoomLevel}
          // height={(rendererRect?.height || 100) - 100}
          // width={(rendererRect?.width || 100) - 100}
        />
    </Document>
  );
};

export default PdfRenderer;

PdfRenderer.supportedFileTypes = ["pdf", "application/pdf"];
