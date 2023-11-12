import { useQuery, useSubscription } from '@apollo/client';

import Playlist from '../../types/playlist';
import Song from '../../types/song';
import { GET_ALL_SONGS } from '../../components/db/songs/query';
import { GET_PLAYLISTS_BY_USER } from '../../components/db/playlists/query';
import { useAppSelector } from '../../redux/hooks';
import { DBSong } from '../../types/dbSong';
import { DBPlaylist } from '../../types/dbPlaylist';
import { SUB_UPDATE_PLAYLIST } from '../../components/db/playlists/subscription';
import {
  SUB_DELETE_PLAYLIST_SONG,
  SUB_INSERT_PLAYLIST_SONG,
} from '../../components/db/playlistSong/subscription';

interface Props {
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
  playlists: Playlist[];
}

interface PlaylistSong {
  playlistId: string;
  songId: string;
}

export const useMainPage = (props: Props) => {
  const { setSongs, setPlaylists, playlists } = props;
  const currentUser = useAppSelector((state) => state.user.value);

  useQuery(GET_ALL_SONGS, {
    variables: { userId: currentUser?.id },
    onCompleted: (data) => {
      const allSongs: DBSong[] = data.allSongs.nodes;
      // fix map : (no need for push) - done
      const newSongs: Song[] = allSongs.map((song: DBSong) => {
        return {
          id: song.id,
          name: song.name,
          duration: song.duration,
          artist: {
            id: song.artistByArtistId.id,
            name: song.artistByArtistId.name,
          },
          isFavorite: song.favoritesBySongId.totalCount === 1,
        };
      });
      setSongs(newSongs);
    },
  });

  useQuery(GET_PLAYLISTS_BY_USER, {
    variables: { userId: currentUser?.id },
    onCompleted: (data) => {
      const allPlaylists: DBPlaylist[] = data.allPlaylists.nodes;
      // same story as above - done
      const newPlaylists: Playlist[] = allPlaylists.map((playlist) => {
        return {
          id: playlist.id,
          name: playlist.name,
          songsID: playlist.playlistSongsByPlaylistId.nodes.map(
            (songs) => songs.songId
          ),
        };
      });
      setPlaylists(newPlaylists);
    },
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
      console.log(data.data.listen.relatedNode);
      const newPlaylistSong: PlaylistSong = data.data.listen.relatedNode;
      const newSongsId = playlists
        .find((playlist) => playlist.id === newPlaylistSong.playlistId)
        ?.songsID.push(newPlaylistSong.songId);

      setPlaylists((prev) =>
        prev.map((playlist) => {
          if (playlist.id === newPlaylistSong.playlistId) {
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
      const dataSongId: string = listData[5];
      const dataPlaylistId: string = listData[3];
      const currentPlaylist: Playlist = playlists.find(
        (playlist) => playlist.id === dataPlaylistId
      )!;

      const updatePlaylist: Playlist = {
        ...currentPlaylist,
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
};
