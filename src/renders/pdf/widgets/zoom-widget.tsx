import { useGetConfig } from "../../../utils/context-helpers";
import { RFW_WidgetComponentProperties } from "../../../modals";
import styled from '@emotion/styled'

const ZoomContainer = styled.div(props => ({
    position: 'absolute',
    bottom: '10px',
    height: "40px",
    display: "flex",
    alignItems: "center",
    zIndex: "10"
}))

export const ZoomController = ({ pageProps, screenProps }: RFW_WidgetComponentProperties) => {
    
    const config = useGetConfig();
    return <ZoomContainer >
        <button onClick={() => screenProps?.rotateLeft?.()}>Rotate Left</button>
        <button onClick={() => screenProps?.zoomOut?.()}>Zoom Out</button>
        <div style={{ width: "100px", textAlign: "center"}}>{pageProps?.currentPage} / {pageProps?.totalPages}</div>
        <button onClick={() => screenProps?.zoomIn?.()}>Zoom In</button>
        <button onClick={() => screenProps?.rotateRight?.()}>Rotate Right</button>
    </ZoomContainer>
}