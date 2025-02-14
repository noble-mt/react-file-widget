export const convertSecondsToVimeoTime = (time?: number) => {
    if (time && time > 0) {
        const minute = Math.floor(time/60);
        const seconds = Math.floor(time % 60);
        return `${minute}m${seconds}s`
    }
    return 0;
}

export const convertSecondsToTwitchTime = (time?: number) => {
    if (time && time > 0) {
        const hour = Math.floor(time/3600);
        const minute = Math.floor((time % 3600)/60);
        const seconds = Math.floor(time % 60);
        return `${hour}h${minute}m${seconds}s`
    }
    return 0;
}