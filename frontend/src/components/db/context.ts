import { Context, createContext } from "react";
import AllSongsContext from "../../types/allSongsContext"; // ""
import AllPlaylistsContext from "../../types/allPlaylistsContext";

export const AllSongsContext: Context<AllSongsContext> = createContext<AllSongsContext>({ songs: [] }); // check if u can instantiate setSongs
export const AllPlaylistsContext: Context<AllPlaylistsContext> = createContext<AllPlaylistsContext>({ playlists: [] }); // here too