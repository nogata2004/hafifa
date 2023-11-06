import Playlist from './playlist';
import Song from './song';

interface AllSpoofyContext {
    songs: Song[],
    setSongs: React.Dispatch<React.SetStateAction<Song[]>> // remove optional - done
    // combine the contexts - done
    playlists: Playlist[],
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>
};
export default AllSpoofyContext;