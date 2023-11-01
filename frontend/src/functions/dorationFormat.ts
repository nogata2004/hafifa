const durationFormat = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19); // getFullHours ?
};
export default durationFormat; // typo in file name

// const toDurationFormat = (seconds: number) => {
//     return new Date(seconds * 1000).toISOString().slice(14, 19);
// };
// export default durationFormat;