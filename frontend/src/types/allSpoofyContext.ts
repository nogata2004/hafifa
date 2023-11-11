import Playlist from './playlist';
import Song from './song';

interface AllSpoofyContext {
    songs: Song[],
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>
    playlists: Playlist[],
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>
};
export default AllSpoofyContext;