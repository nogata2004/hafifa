import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

import useStyles from './playlistItemStyle';
import { ADD_SONG_TO_PLAYLIST } from '../../../../components/db/playlistSong/mutation';
import { AllPlaylistsContext } from '../../../../components/db/context';
import Playlist from '../../../../types/playlist';


interface Props {
    songId: string;
    currentPlaylist: Playlist;
    setIncludePlaylist: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const PlaylistItem: React.FC<Props> = ({ songId, currentPlaylist, setIncludePlaylist }) => {
    const classes = useStyles();
    const [mutationAddSongToPlaylist] = useMutation(ADD_SONG_TO_PLAYLIST);
    const { playlists, setPlaylists } = useContext(AllPlaylistsContext);

    const addToPlaylist = (playlistId: string) => {
        playlists.map((playlist) => {
            if (playlist.id === playlistId) {
                if (playlist.songsID.includes(songId)) {
                    setIncludePlaylist(true);
                }
                else {
                    mutationAddSongToPlaylist({
                        variables: {
                            playlistId: playlistId,
                            songId: songId,
                        },
                        onCompleted(data) {
                            const dataPlaylistSong = data.createPlaylistSong.playlistSong;
                            setPlaylists!(prev => prev.map((playlist) => {
                                if (playlist.id === playlistId) {
                                    playlist.songsID.push(dataPlaylistSong.songId);
                                    return playlist;
                                }
                                return playlist;
                            }));
                            setIncludePlaylist(false);
                        }
                    })
                }
            }
        })
    };

    return (
        <div>
            <Typography
                key={currentPlaylist.id}
                onClick={() => addToPlaylist(currentPlaylist.id)}
                className={classes.playlistItem}
            >
                {currentPlaylist.name}
            </Typography>
        </div >
    );
};

export default PlaylistItem;