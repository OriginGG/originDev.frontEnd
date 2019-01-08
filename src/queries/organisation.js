import gql from 'graphql-tag';

export const getOrganisationByName = gql`
  query getSubdomainByName($subdomain: String!) {
    getorganisationbyname(subdomain: $subdomain) {
      edges {
        node {
          subDomain
          name
        }
      }
    }
  }`;
export const getOrganisationQuery = gql`
    query getOrg($subDomain: String!) {
  resultData: allOrganisationAccounts(condition: {subDomain: $subDomain}) {
    nodes {
    id
    name
    companyStoreLink
    description
    fbLink
    twitterLink
    twitchLink
    streamTeamUrl
    discordUrl
    logo
    subDomain
    supportContactEmail
    businessContactEmail
    primaryColor
    instaLink
    youtubeLink
    twitterFeedUsername
    themeId
    themeBaseId
    themesByOrganisationId {
      edges {
        node {
          id
          themeName
          themeData
          themeStructure
        }
      }
    }
    usersByOrganisationId {
			edges {
				node {
          id
          email
					firstName
					lastName
				}
			}
		}
  }
} }
`;

export const updateOrganisationQuery = gql`mutation updateOrg($id: Int!, $name: String, $instaLink: String
		$fbLink: String, $twitterLink: String, $youtubeLink: String, $themeId: String, $themeBaseId: String, $twitterFeedUsername: String
    $twitchLink: String, $streamTeamUrl: String, $description: String, $logo: String, $primaryColor: String, $companyStoreLink: String, $discordUrl: String
    $businessContactEmail: String, $supportContactEmail: String) {
  updateOrganisationAccountById(input: {
		id: $id
    organisationAccountPatch: {
      name: $name
      companyStoreLink: $companyStoreLink
      instaLink: $instaLink
      fbLink: $fbLink
      discordUrl: $discordUrl
      twitterLink: $twitterLink
      twitterFeedUsername: $twitterFeedUsername
      twitchLink: $twitchLink
      streamTeamUrl: $streamTeamUrl      
      supportContactEmail: $supportContactEmail
      businessContactEmail: $businessContactEmail
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
	$twitchLink: String, $streamTeamUrl: String, $themeId: String, $themeBaseId: String, $logo: String, $primaryColor: String,
  $twitterFeedUsername: String, $companyStoreLink: String, $discordUrl: String
  $businessContactEmail: String, $supportContactEmail: String) {
  resultData: createOrganisationAccount(input: {
    organisationAccount: {
      subDomain: $subDomain
      name: $name
      companyStoreLink: $companyStoreLink
      description: $description
      fbLink: $fbLink
      youtubeLink: $youtubeLink
      instaLink: $instaLink
      discordUrl: $discordUrl
      twitterLink: $twitterLink
      twitchLink: $twitchLink
      streamTeamUrl: $streamTeamUrl
      supportContactEmail: $supportContactEmail
      businessContactEmail: $businessContactEmail
      themeId: $themeId
      themeBaseId: $themeBaseId
      logo: $logo
      primaryColor: $primaryColor
      twitterFeedUsername: $twitterFeedUsername
    }
  })
    {
      organisationAccount {
        id
        subDomain
      }
    }
  
  } 
`;

