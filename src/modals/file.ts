import { RFW_Languages } from "./code-lang";

export interface RFW_File {
    url?: string;
    fileType?: string;
    data?: string,
    language?: RFW_Languages,
    title?: string,
    fileName?: string
    file?: File;
}