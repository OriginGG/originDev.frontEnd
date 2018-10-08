import gql from 'graphql-tag';

export const createRecentMatchQuery = gql`mutation createRecentMatch($subDomain: String!, $oppositeTeamName: String, $gameName: String!,
<<<<<<< HEAD
  $gameLogo:String!, $score: String!, $eventDescription: String, $type: String) {
  createRecentmatch(input:{recentmatch:{organisation:$subDomain, oppositeTeamName: $oppositeTeamName,
  gameName: $gameName, score: $score, gameLogo: $gameLogo, eventDescription: $eventDescription, type: $type}}) {
=======
  $gameLogo:String!, $score: String!, $eventDescription: String, $eventDate: String, $eventUrl: String, $eventInfo: String) {
  createRecentmatch(input:{recentmatch:{organisation:$subDomain, oppositeTeamName: $oppositeTeamName,
  gameName: $gameName, score: $score, gameLogo: $gameLogo, eventDescription: $eventDescription, eventUrl: $eventUrl, eventInfo: $eventInfo, eventDate: $eventDate}}) {
>>>>>>> daff722471f3dc4fdf7975d627d0eab51106ca26
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
