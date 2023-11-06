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

interface Props {
  children?: JSX.Element;
}

const MainPage: React.FC<Props> = ({ children }) => {
  const currentSong = useAppSelector((state) => state.song.value); // remove state typing - done
  const classes = useStyles();
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useMainPage({ songs, setSongs, playlists, setPlaylists });

  return (
    <AllSpoofyContext.Provider
      value={{ songs, setSongs, playlists, setPlaylists }}
    >
      {/* combine context - done */}
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
    </AllSpoofyContext.Provider>
  );
};
export default MainPage;
