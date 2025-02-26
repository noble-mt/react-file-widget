import { CSSProperties } from "react"

export interface RFW_SlotsClassNames {
    root?: string,
    header?: string,
    content?: string,
    videoContainer?: string,
    playButton?: string,
    error?: string,
    loading?: string
}

export interface RFW_SlotStyleProps {
    root?: CSSProperties,
    header?: CSSProperties,
    content?: CSSProperties,
    videoContainer?: CSSProperties,
    playButton?: CSSProperties,
    error?: CSSProperties,
    loading?: CSSProperties,
}