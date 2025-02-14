import styled from '@emotion/styled'

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
        width: 100%;
        height: 100%;
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
