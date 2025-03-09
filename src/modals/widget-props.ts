import { ReactNode } from 'react';
import { PDF_MODES } from './app-props';
import { RFW_File } from './file';

/**
 * Properties for the RFW_WidgetComponent.
 */
export interface RFW_WidgetComponentProperties {
    /**
     * The file object containing the data to be displayed.
     */
    file: RFW_File;

    /**
     * Properties related to screen interactions.
     */
    screenProps?: {
        /**
         * The current zoom level of the widget.
         */
        currentZoom: number;

        /**
         * The current rotation angle of the widget.
         */
        currentRotation?: number;

        /**
         * Function to set a new zoom level.
         * @param newZoom - The new zoom level to be set.
         */
        setZoom: (newZoom: number) => void;

        /**
         * Function to increase the zoom level.
         * @param increment - The amount to increase the zoom level by. Defaults to a predefined value if not provided.
         */
        zoomIn: (increment?: number) => void;

        /**
         * Function to decrease the zoom level.
         * @param decrement - The amount to decrease the zoom level by. Defaults to a predefined value if not provided.
         */
        zoomOut: (decrement?: number) => void;

        /**
         * Function to rotate the widget to the left.
         */
        rotateLeft: () => void;

        /**
         * Function to rotate the widget to the right.
         */
        rotateRight: () => void;
    };

    /**
     * Properties related to page interactions.
     */
    pageProps?: {
        /**
         * The current page number being displayed.
         */
        currentPage: number;

        /**
         * The total number of pages available.
         */
        totalPages: number;

        /**
         * The current mode of the PDF viewer.
         */
        currentMode: PDF_MODES;

        /**
         * Indicates whether pagination is enabled.
         */
        paginated?: boolean;

        /**
         * The current rotation angle of the page.
         */
        currentRotation?: number;

        /**
         * Function to navigate to a specific page.
         * @param page - The page number to navigate to.
         */
        goToPage: (page: number) => void;

        /**
         * Function to navigate to the next page.
         */
        nextPage: () => void;

        /**
         * Function to navigate to the previous page.
         */
        prevPage: () => void;

        /**
         * Function to change the mode of the PDF viewer.
         * @param mode - The new mode to be set.
         */
        changeMode: (mode: PDF_MODES) => void;

        /**
         * Function to toggle pagination on or off.
         * @param paginated - Boolean indicating whether pagination should be enabled or disabled.
         */
        togglePagination: (paginated: boolean) => void;
    };
}
export type RFW_PdfWidgetProps = (props: RFW_WidgetComponentProperties) => ReactNode;
