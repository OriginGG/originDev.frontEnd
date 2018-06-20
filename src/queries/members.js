import gql from 'graphql-tag';

export const createOrganisationMemberQuery = gql`
  mutation createOrganisationMember($subDomain: String!, $userId: Int) {
  createOrganisationMember(input: {organisationMember: {organisation: $subDomain, individalUserId: $userId}}) {
    organisationMember {
      id
    }
  }
}
`;

export const getOrganisationMemberByIDQuery = gql`
query getMemberByEmail($id: Int!) {
  allOrganisationMembers(condition: {individalUserId: $id}) {
    edges {
      node {
        id
      }
    }
  }
}`;
export const getOrganisationMembersQuery = gql`
query getMembers($subDomain: String!) {
  allOrganisationMembers(condition: {organisation: $subDomain}) {
    edges {
      node {
        individualUserByIndividalUserId {
          firstName
          lastName
          email
          id
          createdAt
          updatedAt
          profileImageUrl
          username
        }
      }
    }
  }
}`;

