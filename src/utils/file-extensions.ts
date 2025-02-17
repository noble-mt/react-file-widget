import { RFW_codeLangExtensions } from "../modals/code-lang";

export const extractFileExtension = (url: string) => {
    return url?.split?.('.')?.pop()?.toLowerCase() ?? 'default';
}

export const getPrimsSyntaxTypeForCode = (url: string) => {
    return RFW_codeLangExtensions?.[url?.split?.('.')?.pop()?.toLowerCase() ?? ''] ?? 'markup';
}