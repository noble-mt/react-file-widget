import { ReactNode } from 'react';
import { RFW_File } from './file';
import { RFW_FileRenderer } from './render';
import { RFW_SlotsClassNames, RFW_SlotStyleProps } from './slots';
// import { RFW_PdfWidgetProps } from "./widget-props";
import { ContextProps } from 'context-provider';

export type POSTER_QUALITY = 'low' | 'medium' | 'high';
export type CACHE_POLICY = 'prefetch' | 'preload';

export type PDF_MODES = 'single_page_view';

/**
 * Interface representing the properties for the RFW application.
 */
export interface RFW_AppProps {
  /**
   * The file to be rendered.
   */
  file?: RFW_File;

  /**
   * Custom class names for different slots.
   */
  classNames?: RFW_SlotsClassNames;

  /**
   * Custom style properties for different slots.
   */
  slotProps?: RFW_SlotStyleProps;

  /**
   * Custom renderers for the file.
   */
  renderers?: RFW_FileRenderer[];

  /**
   * Whether to render inline.
   */
  // inline?: boolean;

  /**
   * Width of the component.
   */
  width?: string;

  /**
   * Height of the component.
   */
  height?: string;

  /**
   * Maximum height of the component.
   */
  maxHeight?: string;

  /**
   * Theme of the component, either 'light' or 'dark'.
   */
  theme?: 'light' | 'dark';

  /**
   * Whether to hide the header.
   */
  hideHeader?: boolean;

  /**
   * Custom header renderer function.
   * @param document - The document to be rendered in the header.
   * @param config - The context properties.
   * @returns A ReactNode to be rendered as the header.
   */
  customHeader?: (document: RFW_File, config: ContextProps) => ReactNode;

  /**
   * Properties specific to video rendering.
   */
  videoProps?: {
    /**
     * Whether to hide video controls.
     */
    hideControls?: boolean;

    /**
     * Whether the video should be muted.
     */
    muted?: boolean;

    /**
     * Whether the video should autoplay.
     */
    autoplay?: boolean;

    /**
     * Whether to use no-cookie mode.
     */
    noCookie?: boolean;

    /**
     * Whether to disable keyboard controls.
     */
    disableKeyBoard?: boolean;

    /**
     * Whether to hide the full-screen button.
     */
    hideFullScreen?: boolean;

    /**
     * Whether the video should loop.
     */
    loop?: boolean;

    /**
     * Whether to disable inline playback on mobile devices.
     */
    disableInlineOnMobile?: boolean;

    /**
     * The start time of the video in seconds.
     */
    start?: number;

    /**
     * Whether to disable preloading of the video.
     */
    disablePreLoad?: boolean;

    /**
     * The method to use for preloading the video.
     */
    preLoadMethod?: CACHE_POLICY;

    /**
     * The URL of the poster image to be used as a thumbnail.
     */
    poster?: string;

    /**
     * The quality of the poster image when fetched from video sharing sites.
     */
    posterQuality?: POSTER_QUALITY;
  };

  /**
   * Properties specific to image rendering.
   */
  imageProps?: {
    /**
     * The mode to use for rendering the image.
     */
    pictureMode: 'cover' | 'best-fit';
  };

  /**
   * Properties specific to Twitch rendering.
   */
  twitchProps?: {
    /**
     * The parent domain for the Twitch embed.
     */
    parent?: string;
  };

  /**
   * Properties specific to PDF rendering.
   */
  pdfProps?: {
    /**
     * The current page number.
     */
    currentPage?: number;

    /**
     * The zoom level.
     */
    zoom?: number;

    /**
     * Whether the PDF should be paginated.
     */
    paginated?: boolean;

    /**
     * The mode to use for rendering the PDF.
     */
    mode?: PDF_MODES;

    /**
     * The rotation angle of the PDF.
     */
    rotation?: number;

    /**
     * Callback function to be called when the PDF is loaded.
     * @param totalPages - The total number of pages in the PDF.
     */
    onLoad?: (totalPages: number) => void;

    /**
     * Whether to hide the page selector.
     */
    hidePageSelector?: boolean;

    /**
     * The position of the page selector.
     */
    pageSelectorPosition?: 'left' | 'right' | 'bottom' | 'top';

    /**
     * Whether to hide the page controls.
     */
    hidePageControls?: boolean;

    /**
     * Whether to hide the zoom controls.
     */
    hideZoomControls?: boolean;

    /**
     * Whether to hide the rotate controls.
     */
    hideRotateControls?: boolean;
  };
}
