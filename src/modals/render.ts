import { FC } from "react";

export interface RFW_FileRenderer extends FC<{}> {
    supportedFileTypes: string[];
    // fileLoader?: FileLoaderFunction | null | undefined;
  }
  