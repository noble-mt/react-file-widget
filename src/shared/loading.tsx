/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ContextProps } from '../context-provider';
import { useGetConfig } from '../utils/context-helpers';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div<{ config?: ContextProps }>((props) => ({
    width: props?.config?.width ?? '100%',
    height: props?.config?.height ?? '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '.spinner': {
        border: '16px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '16px solid #3498db',
        width: '120px',
        height: '120px',
        animation: `${spin} 2s linear infinite`,
    },

    'p': {
        marginTop: '16px',
    },
    ...(props?.config?.slotProps?.loading ?? {})
}));

const Loading: React.FC = () => {
    const config = useGetConfig();
    return (
        <LoadingContainer config={config} className={config?.classNames?.loading}>
            <div className="spinner" />
            <p>Loading...</p>
        </LoadingContainer>
    );
};

export default Loading;