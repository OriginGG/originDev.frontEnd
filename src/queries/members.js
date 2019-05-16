import gql from 'graphql-tag';

export const createOrganisationMemberQuery = gql`
  mutation createOrganisationMember($organisationId: Int!, $userId: Int) {
  createOrganisationMember(input: {organisationMember: {organisationId: $organisationId, individalUserId: $userId}}) {
    organisationMember {
      id
    }
  }
}
`;

export const getOrganisationMemberByIDQuery = gql`
query getMemberByEmail($id: Int!, $organisationId: Int!) {
  allOrganisationMembers(condition: {individalUserId: $id, organisationId: $organisationId}) {
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
query getMembers($organisationId: Int!) {
  allOrganisationMembers(condition: {organisationId: $organisationId}) {
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
          about
          email
          contactEmail
          updatedAt
          createdAt
          youtubeChannel
          twitchUrl
          twitchUserId
          twitterHandle
          accomplishments
          youtubeVideo1Url
          youtubeVideo2Url
          youtubeVideo3Url
          bannerImageUrl
          profileImageUrl
          facebookLink
          instagramLink
          username
          id
          authenticated
        }
      }
    }
  }
}
`;

