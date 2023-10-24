import Playlist from "./playlist";

interface AllPlaylistsContext {
    playlists: Playlist[],
    setPlaylists?: React.Dispatch<React.SetStateAction<Playlist[]>>
};
export default AllPlaylistsContext;