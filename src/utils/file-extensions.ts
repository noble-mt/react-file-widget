export const extractFileExtension = (url: string) => {
    return url?.split?.('.')?.pop()?.toLowerCase() ?? 'default';
}

export const supportedLanguageMap = {
    "php": "php",
    "perl": "pl",
    "yaml": "xml",
    "xml": "xml",
    "css": "css",
    "scss": "scss",
    "ts": "ts",
    "tsx": "tsx",
    "js": "js",
    "jsx": "jsx",
    "html": "html",
    "svg": "svg",
    "sql": "sql"
}

export const getPrimsSyntaxTypeForCode = (url: string) => {
    const ext = url?.split?.('.')?.pop()?.toLowerCase() ?? 'default';
}