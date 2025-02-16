import { useGetConfig } from "../../../utils/context-helpers";
import { RFW_WidgetComponentProperties } from "../../../modals";
import styled from '@emotion/styled'

const HeaderContainer = styled.div(props => ({
    top: '10px',
    width: "100%",
    height: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "10",
    backgroundColor: 'red'
}))

export const Header = () => {
    return <HeaderContainer >
        Show Pdf
    </HeaderContainer>
}