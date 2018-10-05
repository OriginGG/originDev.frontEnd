import gql from 'graphql-tag';

export const createRecentMatchQuery = gql`mutation createRecentMatch($subDomain: String!, $oppositeTeamName: String, $gameName: String!,
  $gameLogo:String!, $score: String!, $eventDescription: String) {
  createRecentmatch(input:{recentmatch:{organisation:$subDomain, oppositeTeamName: $oppositeTeamName,
  gameName: $gameName, score: $score, gameLogo: $gameLogo, eventDescription: $eventDescription}}) {
    recentmatch {
      id
    }
  }
}`;
export const deleteRecentMatchQuery = gql`mutation deleteRecentMatch($id: Int!) {
  deleteRecentmatchById(input: {id: $id}) {
    recentmatch {
      id
    }
  }
}`;

export const recentMatchesQuery = gql`
         query recentMatches($organisation: String!) {
           resultdata: allRecentmatches(orderBy: CREATED_AT_DESC, condition: { organisation: $organisation }) {
             edges {
               node {
                id
                 organisation
                 oppositeTeamName
                 oppositeTeamLogo
                 gameName
                 gameLogo
                 score
                 createdAt
                 eventDescription
								type
								eventUrl
								eventLeague
								eventDate
								eventInfo
               }
             }
           }
         }
       `;
