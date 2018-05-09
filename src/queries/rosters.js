import gql from 'graphql-tag';

export const createRosterQuery = gql`mutation createRoster($subDomain: String!, $gameId: Int!, $teamName: String) {
  createRoster(input:{roster: {
    subDomain: $subDomain
    gameId:$gameId
    teamName: $teamName
  }}) {
    roster {
      id
    }
  }
}`;

export const getRosterByIDQuery = gql`query getRosterById($id: Int!) {
  rosterById(id: $id) {
      id
      createdAt
      updatedAt
      subDomain
      gameId
      teamName
      rosterIndividualsByRosterId {
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
            }

          }
        }
      }
    }
  }`;

export const createRosterUserQuery = gql`mutation createRosterUser($rosterId: Int!, $individualId: Int!) {
  createRosterIndividual(input:{rosterIndividual: {
    individualId: $individualId
    rosterId: $rosterId
  }}) {
    rosterIndividual {
      id
    }
  }
}`;

export const deleteRosterUserQuery = gql`mutation deleteRosterUser($id: Int!) {
  deleteRosterIndividualById(input:{id: $id}) {
    rosterIndividual {
      id
    }
  }
}`;

export const getRosterQuery = gql`query getRosters($subDomain: String!) {
    allRosters(condition: { subDomain: $subDomain }) {
        edges {
            node {
                id
                createdAt
                updatedAt
                subDomain
                gameId
                teamName
                rosterIndividualsByRosterId {
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
                            }

                        }
                    }
                }
            }
        }
    }
}`;
