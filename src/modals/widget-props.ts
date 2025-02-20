import { ReactNode } from "react"
import { PDF_MODES } from "./app-props"
import { RFW_File } from "./file"

export interface RFW_WidgetComponentProperties {
    file: RFW_File
    screenProps?: {
        currentZoom: number,
        currentRotation?: number,
        setZoom: (newZoom: number) => void,
        zoomIn: (increment?: number) => void,
        zoomOut: (decrement?: number) => void,
        rotateLeft: () => void,
        rotateRight: () => void,
    }
    pageProps?: {
        currentPage: number,
        totalPages: number,
        currentMode: PDF_MODES,
        paginated?: boolean,
        currentRotation?: number,
        goToPage: (page: number) => void,
        nextPage: () => void,
        prevPage: () => void,
        changeMode: (mode: PDF_MODES) => void,
        togglePagination: (paginated: boolean) => void,
    }
}

export  type RFW_PdfWidgetProps = (props: RFW_WidgetComponentProperties) => ReactNode