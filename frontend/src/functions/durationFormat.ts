export const durationFormat = (seconds: number) => { // isnt this ms? todo:
    return new Date(seconds * 1000).toISOString().slice(14, 19); 
    // getFullHours ? -  - option below:

    // const newTime: Date = new Date(seconds * 1000);
    // return `${newTime.getMinutes()}:${newTime.getSeconds()}`;
};
