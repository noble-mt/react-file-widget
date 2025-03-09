import { Renderer } from './renders';
import { RFW_AppProps } from './modals/app-props';
import ImageRender from './renders/image/image';
import { AppProvider } from './context-provider';
import VideoRender from './renders/video/video';
import YoutubeRender from './renders/youtube/youtube';
import VimeoRender from './renders/vimeo/vimeo';
import TwitchRender from './renders/twitch/twitch';
import PdfRenderer from './renders/pdf/pdf';
import { ZoomController } from './renders/pdf/widgets/zoom-widget';
import HTMLRender from './renders/html/html';
import MSDocRender from './renders/msdoc/msdoc';
import CSVRender from './renders/csv/csv';
import TextXmlRender from './renders/text/text';
import CodeRenderer from './renders/code/code';
import AudioRenderer from './renders/audio/audio';
import { RootContainer } from './shared/wrapper-contr';
import ErrorPage from './shared/error-page';
import Loading from './shared/loading';
import { WrapperContainer } from './shared/wrapper-contr';
import { useGetConfig, useGetDocument } from './utils/context-helpers';

export {
  ErrorPage,
  Loading,
  WrapperContainer,
  useGetConfig,
  useGetDocument
}


export const FileWidget = (props: RFW_AppProps) => {
  const { file, renderers, ...rest } = props;

  if (!document || document === undefined) {
    throw new Error('No Document Found');
  }

  return (
    <AppProvider file={file} {...rest}>
      <RootContainer config={rest} className={`rfw-root ${rest?.classNames?.root ?? ''}`} style={rest?.slotProps?.root}>
        <Renderer renderers={renderers ?? []} />
      </RootContainer>
    </AppProvider>
  );
};

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
  CodeRenderer,
  AudioRenderer,
};

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
  CodeRenderer,
  AudioRenderer,
];

export type {
  RFW_AppProps,
  RFW_File,
  RFW_FileRenderer,
  RFW_SlotStyleProps,
  RFW_SlotsClassNames,
  RFW_Languages
} from "./modals";