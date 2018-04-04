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
    instaLink
    twitterFeedUsername
    themeId
    themesByThemeName {
      edges {
        node {
          themeName
          themeData
          themeStructure
        }
      }
    }
    usersByOrganisation {
			edges {
				node {
					id
					firstName
					lastName
				}
			}
		}
  }
}
`;

export const updateOrganisationQuery = gql`mutation updateOrg($subDomain: String!, $name: String, $instaLink: String
		$fbLink: String, $twitterLink: String, $themeId: String, $twitterFeedUsername: String
		$twitchLink: String, $description: String, $logo: String, $primaryColor: String) {
  updateOrganisationAccountBySubDomain(input: {
		subDomain: $subDomain
    organisationAccountPatch: {
      name: $name
      instaLink: $instaLink
      fbLink: $fbLink
      twitterLink: $twitterLink
      twitterFeedUsername: $twitterFeedUsername
      twitchLink: $twitchLink
      description: $description
      themeId: $themeId
      logo: $logo
      primaryColor: $primaryColor
      
    }
  }) {
    organisationAccount {
      subDomain
    }
  }
}
`;

export const createOrganisationQuery = gql`
mutation createOrg($subDomain: String!, $name: String, $description: String,
	$fbLink:String, $instaLink: String, $twitterLink: String, 
	$twitchLink: String, $themeId: String, $logo: String, $primaryColor: String,
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
      themeId: $themeId
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

