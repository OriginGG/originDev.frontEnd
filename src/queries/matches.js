import gql from 'graphql-tag';

export const createRecentMatchQuery = gql`mutation createRecentMatch($organisationId: Int!, $oppositeTeamName: String, $gameName: String!,
  $gameLogo:String!, $score: String!, $eventDescription: String, $eventDate: String, $eventUrl: String, $eventInfo: String) {
  createRecentmatch(input:{recentmatch:{organisationId:$organisationId, oppositeTeamName: $oppositeTeamName,
  gameName: $gameName, score: $score, gameLogo: $gameLogo, eventDescription: $eventDescription, eventUrl: $eventUrl, eventInfo: $eventInfo, eventDate: $eventDate}}) {
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
         query recentMatches($organisationId: Int!) {
           resultdata: allRecentmatches(orderBy: CREATED_AT_DESC, condition: { organisationId: $organisationId }) {
             edges {
               node {
                id
                 organisationId
                 oppositeTeamName
                 oppositeTeamLogo
                 gameName
                 gameLogo
                 score
                 createdAt
                 type
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
