import gql from 'graphql-tag';

export const getOrganisationQuery = gql`
    query getOrg($subDomain: String!) {
  resultData: organisationAccountBySubDomain(subDomain: $subDomain) {
    name
    description
    fbLink
    twitterLink
    twitchLink
    logo
    subDomain
    primaryColor
    twitterFeedUsername
    themesByThemeName {
      edges {
        node {
          themeName
          themeData
          themeStructure
        }
      }
    }
  }
}
`;

export const createOrganisationQuery = gql`
mutation createOrg($subDomain: String!, $name: String, $description: String,
	$fbLink:String, $instaLink: String, $twitterLink: String, 
	$twitchLink: String, $logo: String, $primaryColor: String,
	$twitterFeedUsername: String) {
  resultData: createOrganisationAccount(input: {
    organisationAccount: {
      subDomain: $subDomain
      name: $name
      description: $description
      fbLink: $fbLink
      instaLink: $instaLink
      twitterLink: $twitterLink
      twitchLink: $twitchLink
      logo: $logo
      primaryColor: $primaryColor
      twitterFeedUsername: $twitterFeedUsername
    }
  })
    {
      organisationAccount {
        subDomain
      }
    }
  
  } 
`;

