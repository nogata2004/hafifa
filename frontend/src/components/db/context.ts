import { Context, createContext } from "react";
import AllSongsContext from "../../types/allSongsContext";
import AllPlaylistsContext from "../../types/allPlaylistsContext";

export const AllSongsContext: Context<AllSongsContext> = createContext<AllSongsContext>({ songs: [] });
export const AllPlaylistsContext: Context<AllPlaylistsContext> = createContext<AllPlaylistsContext>({ playlists: [] });