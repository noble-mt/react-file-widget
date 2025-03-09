import { useGetConfig } from '../../../utils/context-helpers';
import { RFW_WidgetComponentProperties } from '../../../modals';
import styled from '@emotion/styled';
import zoomIn from './../../../assets/zoom-in-line.svg';
import zoomOut from './../../../assets/zoom-out-line.svg';
import rotateLeft from './../../../assets/anticlockwise-line.svg';
import rotateRight from './../../../assets/clockwise-line.svg';
import skipLeft from './../../../assets/skip-left-line.svg';
import skipRight from './../../../assets/skip-right-line.svg';

const ZoomContainer = styled.div((props) => ({
  position: 'absolute',
  bottom: '10px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '10',
  backgroundColor: '#333',
  borderRadius: '20px',
  padding: '0 10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  color: 'white',
}));

const ZoomButton = styled.button((props) => ({
  color: 'white',
  border: 'none',
  borderRadius: '50/5',
  margin: '0 5px',
  cursor: 'pointer',
  fontSize: '14px',
  background: 'transparent',
}));

const PageInfo = styled.div((props) => ({
  // width: "0px",
  textAlign: 'center',
  fontSize: '14px',
  color: 'white',
}));

export const ZoomController = ({ pageProps, screenProps }: RFW_WidgetComponentProperties) => {
  const config = useGetConfig();
  return (
    <ZoomContainer>
      {config?.pdfProps?.hideRotateControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => screenProps?.rotateLeft?.()}>
          <img width="20px" src={rotateLeft} />
        </ZoomButton>
      )}
      {config?.pdfProps?.hideZoomControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => screenProps?.zoomOut?.()}>
          <img width="20px" src={zoomOut} />
        </ZoomButton>
      )}
      {config?.pdfProps?.hidePageControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => pageProps?.prevPage?.()}>
          <img width="20px" src={skipLeft} />
        </ZoomButton>
      )}
      {config?.pdfProps?.hidePageControls ? (
        ''
      ) : (
        <PageInfo>
          {pageProps?.currentPage} / {pageProps?.totalPages}
        </PageInfo>
      )}
      {config?.pdfProps?.hidePageControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => pageProps?.nextPage?.()}>
          <img width="20px" src={skipRight} />
        </ZoomButton>
      )}
      {config?.pdfProps?.hideZoomControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => screenProps?.zoomIn?.()}>
          <img width="20px" src={zoomIn} />
        </ZoomButton>
      )}
      {config?.pdfProps?.hideRotateControls ? (
        ''
      ) : (
        <ZoomButton onClick={() => screenProps?.rotateRight?.()}>
          <img width="20px" src={rotateRight} />
        </ZoomButton>
      )}
    </ZoomContainer>
  );
};
