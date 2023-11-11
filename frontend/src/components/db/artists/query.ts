import { gql } from '@apollo/client';

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
