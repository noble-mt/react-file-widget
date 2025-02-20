import styled from '@emotion/styled';
import { useGetDocument } from './../utils/context-helpers';

const HeaderContainer = styled.div({
    top: '10px',
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "10",
    padding: '32px',
    backgroundColor: 'green',
    boxSizing: 'border-box'
})

export const Header = () => {
    const file = useGetDocument();
    return <HeaderContainer >
        <h3>{file?.title}</h3>
    </HeaderContainer>
}