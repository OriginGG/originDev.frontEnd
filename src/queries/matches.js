import gql from 'graphql-tag';

export const recentMatchesQuery = gql`
   query recentMatches($organisation: String!) {
    resultdata: allRecentmatches(condition: { organisation: $organisation }) {
        edges {
            node
            {
                id
                organisation
                oppositeTeamName
                oppositeTeamLogo
                gameName
                gameLogo
                score
            }
        }
    }
}
`;
