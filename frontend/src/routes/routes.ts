const lOG_IN_PAGE_ROUTE = '/'; // PUT THESE IN ROUTES_ENUM todo
const MAIN_PAGE_ROUTE = '/spoofy';
const SONG_TABLE_ROUTE = '/songTable';
const PLAYLIST_TABLE_ROUTE = '/playlistTable';
const FAVORITE_TABLE_ROUTE = '/favoriteTable';
const LOCATION_ROUTE = '/location';

export const lOG_IN_PAGE_LABEL = 'logIn';
export const MAIN_PAGE_LABEL = 'mainPage';
export const SONG_TABLE_LABEL = 'songs';
export const PLAYLIST_TABLE_LABEL = 'playlists';
export const FAVORITE_TABLE_LABEL = 'favorites';
export const LOCATION_LABEL = 'location';

export const routesMapper = {
  [lOG_IN_PAGE_LABEL]: lOG_IN_PAGE_ROUTE,
  [MAIN_PAGE_LABEL]: MAIN_PAGE_ROUTE,
  [SONG_TABLE_LABEL]: SONG_TABLE_ROUTE,
  [PLAYLIST_TABLE_LABEL]: PLAYLIST_TABLE_ROUTE,
  [FAVORITE_TABLE_LABEL]: FAVORITE_TABLE_ROUTE,
  [LOCATION_LABEL]: LOCATION_ROUTE,
};

export enum routeMapper {
  LOGIN = lOG_IN_PAGE_ROUTE,
  MAIN_PAGE = MAIN_PAGE_ROUTE,
  SONG = SONG_TABLE_ROUTE,
  PLAYLIST = PLAYLIST_TABLE_ROUTE,
  FAVORITE = FAVORITE_TABLE_ROUTE,
  LOCATION = LOCATION_ROUTE,
}
