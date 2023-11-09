import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LogInPage from './pages/logInPage/logInPage';
import MainPage from './pages/mainPage/mainPage';
import {
  FAVORITE_TABLE_LABEL,
  LOCATION_LABEL,
  MAIN_PAGE_LABEL,
  PLAYLIST_TABLE_LABEL,
  SONG_TABLE_LABEL,
  lOG_IN_PAGE_LABEL,
  routesMapper,
} from './routes/routes';
import SongDataGrid from './components/dataGrids/songDataGrid/songDataGrid';
import PlaylistDataGrid from './components/dataGrids/playlistDataGrid/playlistDataGrid';
import FavoriteDataGrid from './components/dataGrids/favoriteDataGrid/favoriteDataGrid';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routesMapper[lOG_IN_PAGE_LABEL]}
          element={<LogInPage />}
        ></Route>
        <Route
          path={routesMapper[MAIN_PAGE_LABEL]}
          element={<MainPage />}
        ></Route>

        <Route
          path={routesMapper[SONG_TABLE_LABEL]}
          element={
            <MainPage>
              <SongDataGrid />
            </MainPage>
          }
        ></Route>

        <Route
          path={routesMapper[PLAYLIST_TABLE_LABEL]}
          element={
            <MainPage>
              <PlaylistDataGrid />
            </MainPage>
          }
        ></Route>

        <Route
          path={routesMapper[FAVORITE_TABLE_LABEL]}
          element={
            <MainPage>
              <FavoriteDataGrid />
            </MainPage>
          }
        ></Route>

        <Route
          path={routesMapper[LOCATION_LABEL]}
          element={
            <MainPage>
              <FavoriteDataGrid />
            </MainPage>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
