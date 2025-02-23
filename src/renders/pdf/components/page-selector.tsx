import { useGetConfig, useGetDocument } from "../../../utils/context-helpers";
import { RFW_WidgetComponentProperties } from "../../../modals";
import styled from '@emotion/styled';
import { pdfjs, Document, Page } from "react-pdf";

const PageSelectorContainer = styled.div<{ vertical: boolean }>(props => `
    box-sizing: border-box;
    min-width: ${props.vertical ? "240px" : "100%"};
    min-height: ${props.vertical ? "100%" : "220px"};
    display: flex;
    align-items: ${props.vertical ? "flex-start" : "center"};
    z-index: 10;
    background-color: gray;
    justify-content: center;
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
    div {
        width: ${props.vertical ? "" : "100%"};
    }
`);

const PageWrapper = styled.div<{ vertical: boolean }>(props => `
    display: flex;
    flex-direction: ${props.vertical ? "column" : "row"};;
    gap: 8px;
    cursor: pointer;
    overflow: hide;
`);

export const PageSelector = ({  totalPages, goToPage }: { goToPage: (page: number) => void, totalPages: number }) => {
    const file = useGetDocument();
    const config = useGetConfig();
    const vertical = config?.pdfProps?.pageSelectorPosition !== 'top' && config?.pdfProps?.pageSelectorPosition !== 'bottom';
    return <PageSelectorContainer vertical={vertical}>
        <Document
            file={file?.url ?? file?.file}
            loading={<span>Loading...</span>}
          >
            <PageWrapper vertical={vertical}>
                {Array.from(new Array(totalPages), (_el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={vertical ? 190 : undefined}
                        height={vertical ? undefined : 190 }
                        onClick={() => goToPage(index + 1)}
                    />
                ))}
            </PageWrapper>
          </Document>
    </PageSelectorContainer>
}