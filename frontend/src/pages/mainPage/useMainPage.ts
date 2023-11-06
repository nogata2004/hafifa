import { useQuery } from "@apollo/client";

import Playlist from "../../types/playlist";
import Song from "../../types/song";
import { GET_ALL_SONGS } from '../../components/db/songs/query';
import { GET_PLAYLISTS_BY_USER } from '../../components/db/playlists/query';
import { useAppSelector } from "../../redux/hooks";
import { DBSong } from "../../types/dbSong";
import { DBPlaylist } from "../../types/dbPlaylist";


interface Props {
    songs: Song[];
    setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
    playlists: Playlist[];
    setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
};

export const useMainPage = (props: Props) => {
    const { songs, setSongs, playlists, setPlaylists } = props;
    const currentUser = useAppSelector((state) => state.user.value);

    useQuery(GET_ALL_SONGS, {
        variables: { 'userId': currentUser?.id }, // ', in any case shouldnt be tring - done
        onCompleted: (data) => {
            const allSongs: DBSong[] = data.allSongs.nodes; // better to type allSongs // create interface DBSong - done
            const newSongs: Song[] = [];
            allSongs.map((song: DBSong) => {
                const newSong: Song = {
                    id: song.id,
                    name: song.name,
                    duration: song.duration,
                    artist: {
                        id: song.artistByArtistId.id,
                        name: song.artistByArtistId.name
                    },
                    isFavorite: song.favoritesBySongId.totalCount === 1 // david
                }
                newSongs.push(newSong);
            })
            setSongs(newSongs) // this needs to be outside of iterator (the map)- done
        }
    });

    useQuery(GET_PLAYLISTS_BY_USER, {
        variables: { userId: currentUser?.id },
        onCompleted: (data) => {
            const allPlaylists: DBPlaylist[] = data.allPlaylists.nodes; // define type here - done
            const newPlaylists: Playlist[] = [];
            allPlaylists.map((playlist: DBPlaylist) => { // kanal interface - done
                const newPlaylist: Playlist = {
                    id: playlist.id,
                    name: playlist.name,
                    songsID: playlist.playlistSongsByPlaylistId.nodes.map(songs => songs.songId) // remove the brackets and return -done
                }
                newPlaylists.push(newPlaylist);
            })
            setPlaylists(newPlaylists) // kanal - done
        }
    });
};
