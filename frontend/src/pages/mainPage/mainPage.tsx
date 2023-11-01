import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import useStyles from './mainPageStyle';
import UserInfo from '../../components/userInfo/userInfo';
import Mode from '../../types/mode';
import ViewSong from '../../components/viewSong/viewSong';
import { useAppSelector } from '../../redux/hooks';
import SongDataGrid from '../../components/dataGrids/songDataGrid/songDataGrid';
import PlaylistDataGrid from '../../components/dataGrids/playlistDataGrid/playlistDataGrid';
import FavoriteDataGrid from '../../components/dataGrids/favoriteDataGrid/favoriteDataGrid';
import Song from '../../types/song';
import { GET_ALL_SONGS } from '../../components/db/songs/query';
import { AllPlaylistsContext, AllSongsContext } from '../../components/db/context';
import SideBar from '../../components/sideBar/sideBar';
import User from '../../types/user';
import { GET_PLAYLISTS_BY_USER } from '../../components/db/playlists/query';
import Playlist from '../../types/playlist';

interface SongId { // remove
    songId: string
};

const MainPage: React.FC = () => {
    const currentSong = useAppSelector((state: { song: { value: Song | undefined }; }) => state.song.value); // remove state typing
    const currentUser = useAppSelector((state: { user: { value: User | undefined }; }) => state.user.value);
    const classes = useStyles();
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [currentMode, setCurrentMode] = React.useState<Mode>(Mode.song);

    useQuery(GET_ALL_SONGS, {
        variables: { "userId": currentUser?.id }, // ', in any case shouldnt be tring
        onCompleted: (data) => {
            const allSongs = data.allSongs.nodes; // better to type allSongs // create interface DBSong
            allSongs.map((song: {
                id: string;
                name: string;
                duration: number;
                artistByArtistId: { id: string; name: string; };
                favoritesBySongId: { totalCount: number; };
            }) => {
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
                setSongs(prev => [...prev, newSong]) // this needs to be outside of iterator (the map)
            })
        }
    });

    useQuery(GET_PLAYLISTS_BY_USER, {
        variables: { userId: currentUser?.id },
        onCompleted: (data) => {
            const allPlaylists = data.allPlaylists.nodes; // define type here
            allPlaylists.map((playlist: { // kanal interface
                id: string;
                name: string;
                playlistSongsByPlaylistId: { nodes: SongId[] };
            }) => {
                const newPlaylist: Playlist = {
                    id: playlist.id,
                    name: playlist.name,
                    songsID: playlist.playlistSongsByPlaylistId.nodes.map(songs => { return songs.songId }) // remove the brackets and return
                }
                setPlaylists(prev => [...prev, newPlaylist]) // kanal 
            })
        }
    });

    return (
        <AllSongsContext.Provider value={{ songs, setSongs }}> // combine
            <AllPlaylistsContext.Provider value={{ playlists, setPlaylists }}>
                <div className={classes.body}>
                    <div className={classes.mainPart}>
                        <UserInfo />

                        <div className={classes.table}>
                            {currentMode === Mode.song && <SongDataGrid />} // routes // make a mapper ie: tableMapper[currentMode]
                            {currentMode === Mode.playlist && <PlaylistDataGrid />}
                            {currentMode === Mode.favorite && <FavoriteDataGrid />}
                        </div>

                        <SideBar
                            currentMode={currentMode}
                            setCurrentMode={setCurrentMode}
                        />
                    </div>

                    {currentSong && <ViewSong />} // better use !!
                </div>
            </AllPlaylistsContext.Provider>
        </AllSongsContext.Provider>
    );
};
export default MainPage;
