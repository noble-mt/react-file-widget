import { RFW_Languages } from './code-lang';

/**
 * Represents a file in the React File Widget.
 */
export interface RFW_File {
    /**
     * The URL of the file.
     * @optional
     */
    url?: string;

    /**
     * The type of the file (e.g., 'image/png', 'application/pdf').
     * @optional
     */
    fileType?: string;

    /**
     * The data of the file, typically in base64 format.
     * @optional
     */
    data?: string;

    /**
     * The language of the file content, if applicable.
     * @optional
     */
    language?: RFW_Languages;

    /**
     * The title of the file.
     * @optional
     */
    title?: string;

    /**
     * The name of the file.
     * @optional
     */
    fileName?: string;

    /**
     * The file object.
     * @optional
     */
    file?: File;
}