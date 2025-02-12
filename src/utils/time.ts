export const convertSecondsToVideoTime = (time?: number) => {
    if (time && time > 0) {
        const minute = Math.floor(time/60);
        const seconds = Math.floor(time % 60);
        return `${minute}m${seconds}s`
    }
    return 0;
}