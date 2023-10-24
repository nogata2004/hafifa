import Song from "./song";

interface AllSongsContext {
    songs: Song[],
    setSongs?: React.Dispatch<React.SetStateAction<Song[]>>
};
export default AllSongsContext;