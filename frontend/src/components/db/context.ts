import { Context, createContext } from 'react';
import AllSpoofyContext from '../../types/allSpoofyContext'; // '' - done

export const AllSpoofyContext: Context<AllSpoofyContext> = createContext<AllSpoofyContext>(
    {
        songs: [],
        setSongs: () => undefined,
        playlists: [],
        setPlaylists: () => undefined
    }
); // check if u can instantiate setSongs - done
