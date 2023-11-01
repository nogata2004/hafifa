import Song from "./song";

interface AllSongsContext {
    songs: Song[],
    setSongs?: React.Dispatch<React.SetStateAction<Song[]>> // remove optional
    // combine the contexts
};
export default AllSongsContext;