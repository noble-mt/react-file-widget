export const extractFileExtension = (url: string) => {
    return url?.split?.('.')?.pop()?.toLowerCase() ?? 'default';
}