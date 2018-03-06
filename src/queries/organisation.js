import gql from 'graphql-tag';

export const getOrganisationQuery = gql`
    query getOrg($subDomain: String!) {
        organisationAccountBySubDomain(subDomain: $subDomain) {
            name
            description
            fbLink
            twitterLink
            twitchLink
            logo
            primaryColor
            twitterFeedUsername
            themesByThemeName {
            edges {
                node {
                themeName
                themeData
                }
            }
        }
    }
}
`;

