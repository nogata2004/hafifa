import React, { useState } from 'react';

import useStyles from './mainPageStyle';
import UserInfo from '../../components/userInfo/userInfo';
import ViewSong from '../../components/viewSong/viewSong';
import Song from '../../types/song';
import { AllSpoofyContext } from '../../components/db/context';
import SideBar from '../../components/sideBar/sideBar';
import Playlist from '../../types/playlist';
import { useAppSelector } from '../../redux/hooks';
import { useMainPage } from './useMainPage';
import { useNavigate } from 'react-router-dom';
import { lOG_IN_PAGE_LABEL, routesMapper } from '../../routes/routes';
import { SUB_UPDATE_PLAYLIST } from '../../components/db/playlists/subscription';
import { useSubscription } from '@apollo/client';
import {
  SUB_INSERT_PLAYLIST_SONG,
  SUB_DELETE_PLAYLIST_SONG,
} from '../../components/db/playlistSong/subscription';

interface Props {
  children?: JSX.Element;
}

const MainPage: React.FC<Props> = ({ children }) => {
  const currentSong = useAppSelector((state) => state.song.value); // remove state typing - done
  const currentUser = useAppSelector((state) => state.user.value);
  const classes = useStyles();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useMainPage({
    setSongs,
    setPlaylists,
  });

  useSubscription(SUB_UPDATE_PLAYLIST, {
    onData: ({ data }) => {
      const dataPlaylist: Playlist = {
        id: data.data.listen.relatedNode.id,
        name: data.data.listen.relatedNode.name,
        songsID: [],
      };
      data.data.listen.relatedNode;
      if (!!playlists.find((playlist) => playlist.id === dataPlaylist.id)) {
        setPlaylists((prev) =>
          prev.map((playlist) => {
            if (playlist.id === dataPlaylist.id) {
              return { ...playlist, name: dataPlaylist.name };
            }
            return playlist;
          })
        );
      } else {
        setPlaylists((prev) => [...prev, dataPlaylist]);
      }
    },
  });

  useSubscription(SUB_INSERT_PLAYLIST_SONG, {
    onData: ({ data }) => {
      const dataPlaylistSong: string[] = atob(data.data.listen.relatedNodeId)
        .split('"')
        .map(String);
      const dataSongId: string = dataPlaylistSong[3];
      const dataPlaylistId: string = dataPlaylistSong[1];
      const newSongsId = playlists
        .find((playlist) => playlist.id === dataPlaylistId)
        ?.songsID.push(dataSongId);

      setPlaylists((prev) =>
        prev.map((playlist) => {
          if (playlist.id === dataPlaylistId) {
            return { ...playlist, songsId: newSongsId };
          }
          return playlist;
        })
      );
    },
  });

  useSubscription(SUB_DELETE_PLAYLIST_SONG, {
    onData: ({ data }) => {
      const listData: string[] = atob(data.data.listen.relatedNodeId)
        .split('"')
        .map(String);
      const dataSongId: string = listData[3];
      const dataPlaylistId: string = listData[1];
      const currentPlaylist: Playlist = playlists.find(
        (playlist) => playlist.id === dataPlaylistId
      )!;

      const updatePlaylist: Playlist = {
        id: currentPlaylist.id,
        name: currentPlaylist.name,
        songsID: currentPlaylist.songsID.filter(
          (songId) => songId !== dataSongId
        ),
      };

      setPlaylists((prev) =>
        prev.map((playlist) => {
          if (playlist.id === dataPlaylistId) {
            return updatePlaylist;
          }
          return playlist;
        })
      );
    },
  });

  return (
    <AllSpoofyContext.Provider
      value={{ songs, setSongs, playlists, setPlaylists }}
    >
      {/* combine context - done */}
      {!currentUser ? (
        navigate(routesMapper[lOG_IN_PAGE_LABEL])
      ) : (
        <div className={classes.body}>
          <div className={classes.mainPart}>
            <UserInfo />

            <div className={classes.table}>
              {children}
              {/* // routes // make a mapper ie: tableMapper[currentMode] - done */}
            </div>

            <SideBar />
          </div>

          {!!currentSong && <ViewSong />}
          {/* better use !! -done */}
        </div>
      )}
    </AllSpoofyContext.Provider>
  );
};
export default MainPage;
