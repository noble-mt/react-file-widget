import React from 'react';
import styled from '@emotion/styled';
import { useGetConfig, useGetDocument } from '../utils/context-helpers';
import { ContextProps } from 'context-provider';

const ErrorPageContainer = styled.div((props: { config?: ContextProps }) => ({
  width: props?.config?.width ?? '100%',
  height: props?.config?.height ?? '250px',
  backgroundColor: 'gray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  a: {
    paddingLeft: '8px',
    textDecoration: 'none',
  },
  ...(props?.config?.slotProps?.error ?? {}),
}));

const ErrorPage: React.FC = () => {
  const file = useGetDocument();
  const config = useGetConfig();

  return (
    <ErrorPageContainer config={config} className={config?.classNames?.error}>
      File not supported
      <a href={file?.url} download={file?.url}>
        Download file
      </a>
    </ErrorPageContainer>
  );
};

export default ErrorPage;
