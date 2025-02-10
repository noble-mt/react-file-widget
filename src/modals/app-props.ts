import { RFW_File } from "./file";
import { RFW_FileRenderer } from "./render";
import { RFW_SlotsClassNames, RFW_SlotStyleProps } from "./slots";

export interface RFW_AppProps {
  file?: RFW_File;
  classNames?: RFW_SlotsClassNames;
  slotProps?: RFW_SlotStyleProps;
  renderers?: RFW_FileRenderer[];
}
