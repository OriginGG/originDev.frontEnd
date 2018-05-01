import gql from 'graphql-tag';

export const getIndividualUserQuery = gql`query getIndividual($id: Int!) {
  individualUserById(id: $id) {
    firstName
    lastName
    about
    contactNumber
    createdAt
    updatedAt
  }
}
`;
