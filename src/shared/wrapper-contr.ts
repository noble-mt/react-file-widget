import styled from '@emotion/styled';
import { ContextProps } from 'context-provider';

export const VideoContainer = styled.div<{ config?: ContextProps }>((props) => ({
  width: props?.config?.width ?? '100%',
  height: props?.config?.height ?? '100%',
  backgroundColor: '#000',
  position: 'relative',
  display: 'block',
  contain: 'content',
  backgroundPosition: '50%',
  backgroundSize: 'cover',
  cursor: 'pointer',
  '&:after': {
    content: '""',
    display: 'block',
    paddingBottom: '56%',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  '.video': {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ...(props?.config?.slotProps?.videoContainer ?? {}),
}));

export const PlayButton = styled.div<{ config?: ContextProps }>((props) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '68px',
  height: '48px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid wheat',
  '&:before': {
    content: '""',
    display: 'inline-block',
    marginLeft: '5px',
    borderStyle: 'solid',
    borderWidth: '12px 0 12px 20px',
    borderColor: 'transparent transparent transparent #fff',
  },
  ...(props?.config?.slotProps?.playButton ?? {}),
}));

export const WrapperContainer = styled.div<{ config?: ContextProps }>((props) => {
  const { width, height, hideHeader, theme } = props.config ?? {};
  return {
    display: 'flex',
    flexDirection: 'column',
    width: width ?? '100%',
    maxHeight: height ?? 'auto',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: 'gray white',
    boxSizing: 'border-box',
    backgroundColor: theme === 'light' ? '#ffffff' : '#f0f0f0', // Suggesting a good white background

    pre: {
      scrollbarWidth: 'thin',
      scrollbarColor: 'gray white',
    },

    iframe: {
      boxSizing: 'border-box',
      width: width ?? '100%',
      height: height ?? '100%',
      border: 'none',
    },
    '&::-webkit-scrollbar': {
      width: '6px',
    },

    '&::-webkit-scrollbar-track': {
      background: 'white',
      borderRadius: '10px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'gray',
      borderRadius: '10px',
      border: '2px solid white',
    },
    ...(props?.config?.slotProps?.content ?? {}),
  };
});

export const RootContainer = styled.div<{ config?: ContextProps }>((props) => {
  const { width, height, hideHeader } = props.config ?? {};
  return  {
        borderRadius: '8px',
        overflow: 'hidden',
        width: width ?? '100%',
        '.video-container': {
          height: height ?? '100%',
        },
        ...(props?.config?.slotProps?.root ?? {}),
      }
});
