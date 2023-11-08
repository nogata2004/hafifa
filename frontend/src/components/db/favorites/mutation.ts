import { gql } from '@apollo/client';

export const ADD_FAVORITE = gql`
  mutation addFavorite($songId: UUID!, $userId: UUID!) {
    createFavorite(input: { favorite: { userId: $userId, songId: $songId } }) {
      favorite {
        songId
        userId
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($songId: UUID!, $userId: UUID!) {
    deleteFavoriteByUserIdAndSongId(
      input: { userId: $userId, songId: $songId }
    ) {
      clientMutationId
      deletedFavoriteId
    }
  }
`;
