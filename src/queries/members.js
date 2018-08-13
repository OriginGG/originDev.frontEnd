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

export const deleteOrganisaionMemberQuery = gql`
mutation deleteMemberQuery($id: Int!) {
  deleteOrganisationMemberById(input:{id: $id}) {
    organisationMember {
      id
    }
  }
}`;

export const getOrganisationMembersQuery = gql`
query getMembers($subDomain: String!) {
  allOrganisationMembers(condition: {organisation: $subDomain}) {
    edges {
      node {
        id
        contentTeamsByMemberId {
          nodes {
            id 
            memberId
          }
        }
        individualUserByIndividalUserId {
          firstName
          lastName
          email
          id
          createdAt
          updatedAt
          profileImageUrl
          twitchUrl
          username
        }
      }
    }
  }
}
`;

