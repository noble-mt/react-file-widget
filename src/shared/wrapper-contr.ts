import styled from '@emotion/styled'
import { ContextProps } from 'context-provider';

export const VideoContainer = styled.div`
    background-color: #000;
    position: relative;
    display: block;
    contain: content;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
    &:after {
        content: "";
        display: block; 
        padding-bottom: 56%;
    }
    iframe, video, .video {
        // width: 100%;
        // height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

export const PlayButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 68px;
    height: 48px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid wheat;
    &:before {
        content: "";
        display: inline-block;
        margin-left: 5px;
        border-style: solid;
        border-width: 12px 0 12px 20px;
        border-color: transparent transparent transparent #fff;
    }
`;


export const WrapperContainer = styled.div<{ config?: ContextProps }>(props => {
    const { width, height, inline, hideHeader, theme } = props.config ?? {};
    return {
        width: width ?? "100%",
        height: inline ? undefined : (hideHeader ? "100vh" : "calc(100vh - 64px)"),
        maxHeight: inline ? (height ?? "auto") : undefined,
        overflow: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "gray white",
        boxSizing: "border-box",
        backgroundColor: theme === 'light' ? "#ffffff" : "#f0f0f0", // Suggesting a good white background

        iframe: {
            boxSizing: "border-box",
            width: width ?? "100%",
            height: inline ? (height ?? "auto") : (hideHeader ? "100vh" : "calc(100vh - 64px)"),
            marginTop: "-8px",
            border: "none",
        },

        "&::-webkit-scrollbar": {
            width: "6px",
        },

        "&::-webkit-scrollbar-track": {
            background: "white",
            borderRadius: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: "10px",
            border: "2px solid white",
        }
    }
});

export const RootContainer = styled.div<{ config?: ContextProps }>(props => {
    const { inline, hideHeader } = props.config ?? {};
    return inline ? {
    } : {
        width: "100%",
        height: "100vh",
        position: 'absolute',
        top: '0px',
        left:0,

        ".video-container": {
            height: hideHeader ? "100vh" : "calc(100vh - 64px)"
        }
    }
});