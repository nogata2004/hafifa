export const durationFormat = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19); 
    // getFullHours ? - גdone - option below:

    // const newTime: Date = new Date(seconds * 1000);
    // return `${newTime.getMinutes()}:${newTime.getSeconds()}`;
};
 // typo in file name - done
