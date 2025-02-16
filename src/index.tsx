import { Renderer } from "./renders";
import { RFW_AppProps, RFW_PdfWidgetProps } from "./modals/app-props";
import ImageRender from "./renders/image/image";
import { AppProvider } from "./context-provider";
import VideoRender from "./renders/video/video";
import YoutubeRender from "./renders/youtube/youtube";
import VimeoRender from "./renders/vimeo/vimeo";
import TwitchRender from "./renders/twitch/twitch";
import PdfRenderer from "./renders/pdf/pdf";
import { ZoomController } from "./renders/pdf/widgets/zoom-widget";
import HTMLRender from "./renders/html/html";
import MSDocRender from "./renders/msdoc/msdoc";
import CSVRender from "./renders/csv/csv";
import TextXmlRender from "./renders/textXml/textXml";
import JSONRenderer from "./renders/json/json";
import React from "react";

export const FileWidget = (props: RFW_AppProps) => {
  const { file, renderers, ...rest } = props;

  if (!document || document === undefined) {
    throw new Error(
      "No Document Found"
    );
  }

  return (
    <AppProvider file={file} {...rest}>
      <div
        id="react-file-widget"
        data-testid="react-file-widget"
        className={`rfw-root ${rest?.classNames?.root}`}
        style={rest?.slotProps?.root}
      > 
        <Renderer renderers={renderers ?? []} />
      </div>
    </AppProvider>
  );
};

export default FileWidget;

export {
  ImageRender,
  VideoRender,
  YoutubeRender,
  VimeoRender,
  TwitchRender,
  PdfRenderer,
  HTMLRender,
  MSDocRender,
  CSVRender,
  TextXmlRender,
  JSONRenderer
}

export const AllRenderers = [
  ImageRender,
  VideoRender,
  YoutubeRender,
  VimeoRender,
  TwitchRender,
  PdfRenderer,
  HTMLRender,
  MSDocRender,
  CSVRender,
  TextXmlRender,
  JSONRenderer
];

export const getDefaultWidgets = (): RFW_PdfWidgetProps[] => {
  return  [{ position: 'bottom', component: ZoomController}]
}