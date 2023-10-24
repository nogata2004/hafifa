import { gql } from "@apollo/client";

export const DELETE_USER = gql`
mutation MyMutation($id: UUID!) {
  deleteUserById(input: {id: $id}) {
    query {
      allUsers {
        nodes {
          id
          firstName
          lastName
        }
      }
    }
  }
}
`
