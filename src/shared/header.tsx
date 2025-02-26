import styled from '@emotion/styled';
import { useGetConfig, useGetDocument } from './../utils/context-helpers';
import { ContextProps } from '../context-provider';

const HeaderContainer = styled.div<{ config?: ContextProps }>(props => ({
    top: '10px',
    width: props?.config?.width ?? "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "10",
    padding: '32px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    ...(props?.config?.slotProps?.header ?? {})
}));

export const Header = () => {
    const file = useGetDocument();
    const config = useGetConfig();
    return <HeaderContainer config={config} className={config?.classNames?.header}>
        <h3>{file?.title ?? file?.fileName ?? file?.file?.name}</h3>
    </HeaderContainer>
}