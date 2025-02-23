import { ReactNode } from "react";
import { RFW_File } from "./file";
import { RFW_FileRenderer } from "./render";
import { RFW_SlotsClassNames, RFW_SlotStyleProps } from "./slots";
import { RFW_PdfWidgetProps } from "./widget-props";

export type POSTER_QUALITY = 'low' | "medium" | 'high';
export type CACHE_POLICY = 'prefetch' | 'preload';

export type PDF_MODES = 'two_page_view' | 'single_page_view';


export interface RFW_AppProps {
  file?: RFW_File;
  classNames?: RFW_SlotsClassNames
  slotProps?: RFW_SlotStyleProps
  renderers?: RFW_FileRenderer[]
  inline?: boolean
  width?: string
  height?: string
  maxHeight?: string
  theme?: 'light' | 'dark'
  hideHeader?: boolean,
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
  imageProps?: {
    pictureMode: 'cover' | 'best-fit'
  },
  twitchProps?: {
    parent?: string
  },
  widgets?: RFW_PdfWidgetProps[],
  pdfProps?: {
    currentPage?: number,
    zoom?: number,
    paginated?: boolean,
    mode?: PDF_MODES,
    rotation?: number,
    onLoad?: (totalPages: number) => void,
    hidePageSelector?: boolean,
    pageSelectorPosition: 'left' | 'right' | 'bottom' | 'top'
  }
}
