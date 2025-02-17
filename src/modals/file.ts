import { RFW_Languages } from "./code-lang";

export interface RFW_File {
    url?: string;
    fileType?: string;
    fileData?: string | ArrayBuffer;
    language?: RFW_Languages
}