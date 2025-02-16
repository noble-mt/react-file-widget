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

export const ZoomController = ({ currentPage, totalPages, zoomIn, zoomOut, rotateLeft, rotateRight }: RFW_WidgetComponentProperties) => {
    
    const config = useGetConfig();
    return <ZoomContainer >
        <button onClick={() => rotateLeft()}>Rotate Left</button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <div style={{ width: "100px", textAlign: "center"}}>{currentPage} / {totalPages}</div>
        <button onClick={() => zoomIn()}>Zoom In</button>
        <button onClick={() => rotateRight()}>Rotate Right</button>
    </ZoomContainer>
}