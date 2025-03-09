import { RFW_FileRenderer } from '../../modals/render';
import React, { useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { useGetConfig, useGetDocument } from '../../utils/context-helpers';
import { PDF_MODES } from '../../modals';
import styled from '@emotion/styled';
import { PageSelector } from './components/page-selector';
import { WrapperContainer } from '../../shared/wrapper-contr';
import { ContextProps } from 'context-provider';
import { ZoomController } from './widgets/zoom-widget';
const getFlexDirectionForPosition = (position?: string) => {
  if (position === 'left') {
    return 'row-reverse';
  } else if (position === 'right') {
    return 'row';
  } else if (position === 'top') {
    return 'column-reverse';
  } else if (position === 'bottom') {
    return 'column';
  } else {
    return 'row-reverse';
  }
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfWidgetMainContainer = styled.div<{ hidePageSelector?: boolean }>((props) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: 'gray',
  // width: props.hidePageSelector ? '100%' : 'calc(100% - 240px)',
  flexGrow: 1,
  overflow: 'auto',
  maxWidth: '100%',
}));

const PdfDisplayMainContainer = styled.div<{
  position?: string;
  config?: ContextProps;
}>((props) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  flexDirection: getFlexDirectionForPosition(props.position),
  flexGrow: 1,
  overflow: 'auto',
  height: '100%',
}));

const PdfPageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

const PdfPageScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: gray white;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
    border: 2px solid white;
  }
  > div {
    max-width: 100%;
  }
`;

const PdfRenderer: RFW_FileRenderer = () => {
  const file = useGetDocument();
  const config = useGetConfig();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentZoom, setCurrentZoom] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentMode, setCurrentMode] = React.useState<PDF_MODES>(config?.pdfProps?.mode ?? 'single_page_view');
  const [paginated, setPaginated] = React.useState<boolean>(config?.pdfProps?.paginated ?? false);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [rotate, setRotate] = React.useState<number>(0);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = React.useState<number>(300);

  useEffect(() => {
    setCurrentMode(config?.pdfProps?.mode ?? 'single_page_view');
  }, [config?.pdfProps?.mode]);

  useEffect(() => {
    setPaginated(config?.pdfProps?.paginated ?? false);
  }, [config?.pdfProps?.paginated]);

  useEffect(() => {
    setCurrentPage(config?.pdfProps?.currentPage ?? 1);
  }, [config?.pdfProps?.currentPage]);

  useEffect(() => {
    setCurrentZoom(config?.pdfProps?.zoom ?? 1);
  }, [config?.pdfProps?.zoom]);

  useEffect(() => {
    setRotate((config?.pdfProps?.rotation ?? 0) % 360);
  }, [config?.pdfProps?.rotation]);

  const onLoad = (totalPages: number) => {
    setNumPages(totalPages);
    config?.pdfProps?.onLoad?.(totalPages);

    if (pdfContainerRef.current) {
      setPageWidth(pdfContainerRef.current?.clientWidth - 50);
    }
  };

  const zoomIn = (zoom?: number) => {
    setCurrentZoom((prev) => Math.round((prev + (zoom ?? 0.1)) * 100) / 100);
  };

  const zoomOut = (zoom?: number) => {
    setCurrentZoom((prev) => Math.round((prev - (zoom ?? 0.1)) * 100) / 100);
  };

  const setZoom = (value: number) => {
    setCurrentZoom(Math.round(value * 100) / 100);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const changeMode = (mode: PDF_MODES) => {
    setCurrentMode(mode);
  };

  const togglePagination = () => {
    setPaginated((prev) => !prev);
  };
  const rotateLeft = () => {
    setRotate((prev) => (prev - 90) % 360);
  };

  const rotateRight = () => {
    setRotate((prev) => (prev + 90) % 360);
  };

  useEffect(() => {
    if (containerRef.current) {
      const pageElement = containerRef.current.querySelector(
        `.react-pdf__Page[data-page-number="${currentPage}"]`
      );
      if (pageElement) {
        containerRef.current.scrollTop = (pageElement as HTMLElement).offsetTop;
      }
    }
  }, [currentPage]);

  return (
    <WrapperContainer config={config} className={config?.classNames?.content}>
      <PdfDisplayMainContainer position={config?.pdfProps?.pageSelectorPosition} config={config}>
        <PdfWidgetMainContainer hidePageSelector={config?.pdfProps?.hidePageSelector} ref={pdfContainerRef}>
          {file &&
          (!config?.pdfProps?.hidePageSelector ||
            !config?.pdfProps?.hideRotateControls ||
            !config?.pdfProps?.hideZoomControls) ? (
            <ZoomController
              pageProps={{
                totalPages: numPages,
                currentPage,
                paginated,
                currentMode,
                goToPage,
                nextPage,
                prevPage,
                togglePagination,
                changeMode,
              }}
              screenProps={{
                currentZoom,
                currentRotation: rotate,
                setZoom,
                zoomIn,
                zoomOut,
                rotateLeft,
                rotateRight,
              }}
              file={file}
            />
          ) : (
            ''
          )}
          <PdfPageScrollWrapper ref={containerRef}>
            <Document
              file={file?.url ?? file?.file}
              onLoadSuccess={({ numPages }) => onLoad(numPages)}
              loading={<span>Loading...</span>}
            >
              {paginated ? (
                <Page
                  pageNumber={currentPage}
                  scale={currentZoom}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  rotate={rotate}
                  width={pageWidth}
                />
              ) : (
                <>
                  <PdfPageListWrapper>
                    {Array.from(new Array(numPages), (_el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={pageWidth}
                        rotate={rotate}
                        scale={currentZoom}
                      />
                    ))}
                  </PdfPageListWrapper>
                </>
              )}
            </Document>
          </PdfPageScrollWrapper>
        </PdfWidgetMainContainer>
        {config?.pdfProps?.hidePageSelector ? '' : <PageSelector totalPages={numPages} goToPage={goToPage} />}
      </PdfDisplayMainContainer>
    </WrapperContainer>
  );
};

export default PdfRenderer;

PdfRenderer.supportedFileTypes = ['pdf', 'application/pdf'];
