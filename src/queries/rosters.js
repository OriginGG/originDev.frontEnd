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
