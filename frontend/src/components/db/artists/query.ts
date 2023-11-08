import { gql } from '@apollo/client';

// myquery - done
export const GET_ALL_ARTISTS = gql`
  query getAllArtists {
    allArtists {
      nodes {
        id
        name
      }
    }
  }
`;
