interface Song {
    id: string,
    name: string,
    artist: {
        id: string,
        name: string
    },
    duration: number
    isFavorite: boolean
};
export default Song;