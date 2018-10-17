import gql from 'graphql-tag';

export const createRosterQuery = gql`mutation createRoster($subDomain: String!, $gameId: Int, $rosterType: String, $teamName: String, $positionId: Int) {
  createCombinedRoster(input: {
    combinedRoster: {
      subDomain: $subDomain
      gameId: $gameId
      positionId: $positionId
      teamName: $teamName
      rosterType: $rosterType
  }}) {
     combinedRoster{
     id
      createdAt
      updatedAt
      subDomain
      gameId
      teamName
    	positionId
    	rosterType
      combinedRosterIndividualsByRosterId {
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
              twitchUserId
              username
            }
          }
        }
      }
    }
  }
}`;

// export const createRosterQuery = gql`mutation createRoster($subDomain: String!, $gameId: Int!, $teamName: String) {
//   createRoster(input:{roster: {
//     subDomain: $subDomain
//     gameId:$gameId
//     teamName: $teamName
//   }}) {
//     roster {
//       id
//     }
//   }
// }`;

export const getRosterByIDQuery = gql`
query getRosterById($id: Int!) {  
  combinedRosterById(id: $id) {
      id
      createdAt
      updatedAt
      subDomain
      gameId
      teamName
    	positionId
    	rosterType
      combinedRosterIndividualsByRosterId {
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
              twitchUserId
              profileImageUrl
              username
            }

          }
        }
      }
    }
  }
`;
// export const getRosterByIDQuery = gql`query getRosterById($id: Int!) {
//   rosterById(id: $id) {
//       id
//       createdAt
//       updatedAt
//       subDomain
//       gameId
//       teamName
//       rosterIndividualsByRosterId {
//         edges {
//           node {
//             id
//             individualUserByIndividualId {
//               firstName
//               lastName
//               email
//               about
//               contactNumber
//               id
//               accomplishments
//               createdAt
//               updatedAt
//               twitchUrl
//               twitterHandle
//               youtubeChannel
//               youtubeVideo1Url
//               youtubeVideo2Url
//               youtubeVideo3Url
//               bannerImageUrl
//               profileImageUrl
//               username
//             }

//           }
//         }
//       }
//     }
//   }`;


export const createRosterUserQuery = gql`mutation createRosterUser($rosterId: Int!, $individualId: Int!) {
  createCombinedRosterIndividual(input:{combinedRosterIndividual: {
    individualId: $individualId
    rosterId: $rosterId
  }}) {
     combinedRosterIndividual{
      id
    }
  }
}`;

// export const createRosterUserQuery = gql`mutation createRosterUser($rosterId: Int!, $individualId: Int!) {
//   createRosterIndividual(input:{rosterIndividual: {
//     individualId: $individualId
//     rosterId: $rosterId
//   }}) {
//     rosterIndividual {
//       id
//     }
//   }
// }`;

export const deleteRosterQuery = gql`mutation deleteRoster($id: Int!) {
  deleteCombinedRosterById(input:{id: $id}) {
     combinedRoster{
      id
    }
  }
}
`;
// export const deleteRosterQuery = gql`mutation deleteRoster($id: Int!) {
//   deleteRosterById(input:{id: $id}) {
//     roster {
//       id
//     }
//   }
// }`;

export const deleteRosterUserQuery = gql`mutation deleteRosterUser($id: Int!) {
  deleteCombinedRosterIndividualById(input:{id: $id}) {
    combinedRosterIndividual {
      id
    }
  }
}`;

// export const deleteRosterUserQuery = gql`mutation deleteRosterUser($id: Int!) {
//   deleteRosterIndividualById(input:{id: $id}) {
//     rosterIndividual {
//       id
//     }
//   }
// }`;

export const getRosterQuery = gql`query getRosters($subDomain: String!, $rosterType: String!) {
    allCombinedRosters(condition: { rosterType: $rosterType, subDomain: $subDomain }) {
        edges {
            node {
                id
                createdAt
                updatedAt
                subDomain
                gameId
                teamName
              	rosterType
              	positionId
                combinedRosterIndividualsByRosterId {
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
                                twitchUserId
                                username
                            }

                        }
                    }
                }
            }
        }
    }
}
`;
// export const getRosterQuery = gql`query getRosters($subDomain: String!) {
//     allRosters(condition: { subDomain: $subDomain }) {
//         edges {
//             node {
//                 id
//                 createdAt
//                 updatedAt
//                 subDomain
//                 gameId
//                 teamName
//                 rosterIndividualsByRosterId {
//                     edges {
//                         node {
//                             id
//                             individualUserByIndividualId {
//                                 firstName
//                                 lastName
//                                 email
//                                 about
//                                 contactNumber
//                                 id
//                                 accomplishments
//                                 createdAt
//                                 updatedAt
//                                 twitchUrl
//                                 twitterHandle
//                                 youtubeChannel
//                                 youtubeVideo1Url
//                                 youtubeVideo2Url
//                                 youtubeVideo3Url
//                                 bannerImageUrl
//                                 profileImageUrl
//                                 username
//                             }

//                         }
//                     }
//                 }
//             }
//         }
//     }
// }`;
