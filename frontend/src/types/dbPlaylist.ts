export interface DBPlaylist {
    id: string;
    name: string;
    playlistSongsByPlaylistId: { nodes: { songId: string }[] };
};
