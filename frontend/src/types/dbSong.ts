export interface DBSong {
    id: string;
    name: string;
    duration: number;
    artistByArtistId: { id: string; name: string; };
    favoritesBySongId: { totalCount: number };
}; 