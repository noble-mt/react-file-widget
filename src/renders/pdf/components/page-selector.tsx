import { useGetConfig, useGetDocument } from "../../../utils/context-helpers";
import { RFW_WidgetComponentProperties } from "../../../modals";
import styled from '@emotion/styled';
import { pdfjs, Document, Page } from "react-pdf";

const PageSelectorContainer = styled.div`
    box-sizing: border-box;
    min-width: 240px;
    display: flex;
    align-items: flex-start;
    padding: 10px;
    z-index: 10;
    background-color: gray;
    justify-content: center;
    overflow: auto;
`

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: pointer;
    overflow: hide;
`

export const PageSelector = ({  totalPages, goToPage }: { goToPage: (page: number) => void, totalPages: number }) => {
    const file = useGetDocument();
    const config = useGetConfig();
    return <PageSelectorContainer >
        <Document
            file={file?.url}
            loading={<span>Loading...</span>}
          >
            <PageWrapper>
                {Array.from(new Array(totalPages), (_el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={150}
                        onClick={() => goToPage(index + 1)}
                    />
                ))}
            </PageWrapper>
          </Document>
    </PageSelectorContainer>
}