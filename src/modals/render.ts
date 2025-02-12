import { FC } from "react";

export interface RFW_FileRenderer extends FC<{}> {
    supportedFileTypes?: string[];
    supportUrlPatterns?: RegExp;
    // fileLoader?: FileLoaderFunction | null | undefined;
  }
  