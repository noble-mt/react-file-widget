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
import { Header } from "./renders/pdf/components/header";
import { PageSelector } from "./renders/pdf/components/page-selector";

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
  PdfRenderer
}

export const AllRenderers = [
  ImageRender,
  VideoRender,
  YoutubeRender,
  VimeoRender,
  TwitchRender,
  PdfRenderer
];

export const getDefaultWidgets = (): RFW_PdfWidgetProps[] => {
  return  [{ position: 'bottom', component: ZoomController}]
}