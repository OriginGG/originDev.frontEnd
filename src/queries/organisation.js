import gql from 'graphql-tag';

export const getOrganisationQuery = gql`
    query getOrg($subDomain: String!) {
  resultData: organisationAccountBySubDomain(subDomain: $subDomain) {
    name
    companyStoreLink
    description
    fbLink
    twitterLink
    twitchLink
    logo
    subDomain
    primaryColor
    instaLink
    youtubeLink
    twitterFeedUsername
    themeId
    themeBaseId
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
		$fbLink: String, $twitterLink: String, $youtubeLink: String, $themeId: String, $themeBaseId: String, $twitterFeedUsername: String
		$twitchLink: String, $description: String, $logo: String, $primaryColor: String, $companyStoreLink: String) {
  updateOrganisationAccountBySubDomain(input: {
		subDomain: $subDomain
    organisationAccountPatch: {
      name: $name
      companyStoreLink: $companyStoreLink
      instaLink: $instaLink
      fbLink: $fbLink
      twitterLink: $twitterLink
      twitterFeedUsername: $twitterFeedUsername
      twitchLink: $twitchLink
      youtubeLink: $youtubeLink
      description: $description
      themeId: $themeId
      themeBaseId: $themeBaseId
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
	$fbLink:String, $instaLink: String, $twitterLink: String, $youtubeLink: String
	$twitchLink: String, $themeId: String, $themeBaseId: String, $logo: String, $primaryColor: String,
	$twitterFeedUsername: String, $companyStoreLink: String) {
  resultData: createOrganisationAccount(input: {
    organisationAccount: {
      subDomain: $subDomain
      name: $name
      companyStoreLink: $companyStoreLink
      description: $description
      fbLink: $fbLink
      youtubeLink: $youtubeLink
      instaLink: $instaLink
      twitterLink: $twitterLink
      twitchLink: $twitchLink
      themeId: $themeId
      themeBaseId: $themeBaseId
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

