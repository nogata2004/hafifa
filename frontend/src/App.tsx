import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LogInPage from './pages/logInPage/logInPage';
import MainPage from './pages/mainPage/mainPage';
import { routeMapper } from './routes/routes';
import SongDataGrid from './components/dataGrids/songDataGrid/songDataGrid';
import PlaylistDataGrid from './components/dataGrids/playlistDataGrid/playlistDataGrid';
import FavoriteDataGrid from './components/dataGrids/favoriteDataGrid/favoriteDataGrid';
import UserMap from './components/userMap/userMap';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routeMapper.LOGIN} element={<LogInPage />} />
      </Routes>

      <MainPage>
        <Routes>
          <Route path={routeMapper.MAIN_PAGE} />
          {/* remove boilerplate mainpage - done, also remove the routes closer tags - done*/}
          <Route path={routeMapper.SONG} element={<SongDataGrid />} />
          <Route path={routeMapper.PLAYLIST} element={<PlaylistDataGrid />} />
          <Route path={routeMapper.FAVORITE} element={<FavoriteDataGrid />} />
          <Route path={routeMapper.LOCATION} element={<UserMap />} />
        </Routes>
      </MainPage>
    </BrowserRouter>
  );
};
export default App;
