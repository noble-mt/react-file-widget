import { CSSProperties, FC } from "react";
import { RFW_File, SlotsClassNames, SlotStyleProps } from "modals";
import { DocRenderer } from "modals/render";
import { Renderer } from "renders";
import { FileWidgetCommonProps } from "modals/sharedProps";
import ImageRender from "renders/image/image";


export interface FileWidgetProps extends FileWidgetCommonProps {
  renderers: DocRenderer[];
}

export const FileWidget = (props: FileWidgetProps) => {
  const { document, classNames, slotProps } = props;

  if (!document || document === undefined) {
    throw new Error(
      "No Document Found"
    );
  }

  return (
      <div
        id="react-file-widget"
        data-testid="react-file-widget"
        className={`rfw-root ${classNames?.root}`}
        style={slotProps?.root}
      > 
        <Renderer {...props} />
      </div>
  );
};

export default FileWidget;

export {
  ImageRender
}