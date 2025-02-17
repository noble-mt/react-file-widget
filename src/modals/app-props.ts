import { ReactNode } from "react";
import { RFW_File } from "./file";
import { RFW_FileRenderer } from "./render";
import { RFW_SlotsClassNames, RFW_SlotStyleProps } from "./slots";

export type POSTER_QUALITY = 'low' | "medium" | 'high';
export type CACHE_POLICY = 'prefetch' | 'preload';

export type PDF_MODES = 'two_page_view' | 'single_page_view';


export interface RFW_WidgetComponentProperties {
  currentZoom: number,
  currentPage: number,
  totalPages: number,
  currentMode: PDF_MODES,
  paginated?: boolean,
  currentRotation?: number,
  setZoom: (newZoom: number) => void,
  zoomIn: (increment?: number) => void,
  zoomOut: (decrement?: number) => void,
  goToPage: (page: number) => void,
  nextPage: () => void,
  prevPage: () => void,
  changeMode: (mode: PDF_MODES) => void,
  togglePagination: (paginated: boolean) => void,
  rotateLeft: () => void,
  rotateRight: () => void,
}

export  type RFW_WidgetComponentProps = (props: RFW_WidgetComponentProperties) => ReactNode;


export  type RFW_PdfWidgetProps = {
  position: 'left' | 'right' | 'top' | 'bottom',
  component: RFW_WidgetComponentProps
}



export interface RFW_AppProps {
  file?: RFW_File;
  classNames?: RFW_SlotsClassNames
  slotProps?: RFW_SlotStyleProps
  renderers?: RFW_FileRenderer[]
  inline?: boolean
  width?: string
  height?: string
  theme?: 'light' | 'dark'
  videoProps?: {
    hideControls?: boolean
    muted?: boolean,
    autoplay?: boolean,
    noCookie?: boolean,
    disableKeyBoard?: boolean,
    hideFullScreen?: boolean,
    loop?: boolean,
    disableInlineOnMobile?: boolean,
    start?: number,
    disablePreLoad?: boolean,
    preLoadMethod?: CACHE_POLICY,
    poster?: string // If Provided will this image will be used as thumbnail image. Or try to fetch from video sharing sites if available. 
    posterQuality?: POSTER_QUALITY // Only applicable when video is fetched from video sharing sites
  },
  // youtubePref?: {
  // },
  // vimeoPref?: {
  //   quality?: '240p' | '360p' | '540p' | '720p' | '1080p' | '2k' | '4k',
  // },
  twitchProps?: {
    parent?: string
  }
  pdfProps?: {
    widgets: RFW_PdfWidgetProps[],
    currentPage?: number,
    zoom?: number,
    paginated?: boolean,
    mode?: PDF_MODES,
    rotation?: number,
    onLoad?: (totalPages: number) => void,
    hidePageSelector?: boolean,
    hideHeader?: boolean,
  }
}
