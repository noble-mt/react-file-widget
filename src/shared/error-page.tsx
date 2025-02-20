import React from 'react';
import styled from '@emotion/styled'
import { useGetConfig, useGetDocument } from '../utils/context-helpers';


const ErrorPageContainer = styled.div((props: { width?: string, height?: string }) => ({
    width: props?.width ?? '100%',
    height: props?.height ?? '250px',
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    a: {
        paddingLeft: "8px",
        textDecoration: "none"
    }
}));


const ErrorPage: React.FC = () => {
    const file = useGetDocument();
    const config = useGetConfig();

    return (
        <ErrorPageContainer width={config?.width} height={config?.height} className={config?.classNames?.error}>
            File not supported
            <a
                href={file?.url}
                download={file?.url}
            >
                Download file
            </a>
        </ErrorPageContainer>
    );
};

export default ErrorPage;