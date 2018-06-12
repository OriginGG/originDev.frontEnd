import gql from 'graphql-tag';

export const createStaffQuery = gql`mutation createStaff($subDomain: String!, $positionId: Int!) {
  createStaff(input: {staff: {
    subDomain: $subDomain
    positionId: $positionId
  }}) {
    staff {
      id
    }
  }
}`;

export const getStaffByIDQuery = gql`query getStaffById($id: Int!) {
  staffById(id: $id) {
      id
      createdAt
      updatedAt
      subDomain
      positionId
	    staffIndividualsByStaffId {
        edges {
          node {
            id
            individualUserByIndividualId {
              firstName
              lastName
              email
              about
              contactNumber
              id
              accomplishments
              createdAt
              updatedAt
              twitchUrl
              twitterHandle
              youtubeChannel
              youtubeVideo1Url
              youtubeVideo2Url
              youtubeVideo3Url
              bannerImageUrl
              profileImageUrl
              username
            }

          }
        }
      }
    }
  }`;

export const createStaffUserQuery = gql`mutation createStaffUser($staffId: Int!, $individualId: Int!) {
  createStaffIndividual(input: {staffIndividual: {
    individualId: $individualId
    staffId: $staffId
  }) {
    staffIndividual {
      id
    }
  }
}`;

export const deleteStaffUserQuery = gql`mutation deleteStaffUser($id: Int!) {
  deleteStaffIndividualById(input:{id: $id}) {
    staffIndividual {
      id
    }
  }
}`;

export const getStaffQuery = gql`query getStaff($subDomain: String!) {
  	allStaff(condition: { subDomain: $subDomain }) {
        edges {
            node {
                id
                createdAt
                updatedAt
                subDomain
                positionId
                staffIndividualsByStaffId {
                    edges {
                        node {
                            id
                            individualUserByIndividualId {
                                firstName
                                lastName
                                email
                                about
                                contactNumber
                                id
                                accomplishments
                                createdAt
                                updatedAt
                                twitchUrl
                                twitterHandle
                                youtubeChannel
                                youtubeVideo1Url
                                youtubeVideo2Url
                                youtubeVideo3Url
                                bannerImageUrl
                                profileImageUrl
                                username
                            }

                        }
                    }
                }
            }
        }
    }
}`;
