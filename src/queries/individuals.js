import gql from 'graphql-tag';

export const getIndividualUserByHandleQuery = gql`
 query getindbyhandle($handle: String!) {
	allIndividualUsers(condition: {username: $handle}) {
		nodes {
      id
      email
      authenticated
		}
	}
}
`;

export const getIndividualUserByEmailQuery = gql`query getIndUserByEmail($email: String!) {
  individualUserByEmail(email: $email) {
    id
    authenticated
    username
  }
}`;

export const getIndividualUserQuery = gql`query getIndividual($id: Int!) {
  individualUserById(id: $id) {
    firstName
    lastName
    about
    email
    contactNumber
    updatedAt
    createdAt
		youtubeChannel
    twitchUrl
    twitchUserId
		twitterHandle
		accomplishments
		youtubeVideo1Url
		youtubeVideo2Url
		youtubeVideo3Url
    bannerImageUrl
		profileImageUrl
    facebookLink
    instagramLink
    username
		id
  }
}
`;

export const updateIndividualUserQuery = gql`mutation updateIndividualUser($id: Int!, $firstName: String, $lastName: String, $about: String,
	$contactNumber: String, $accomplishments: String, $twitchUrl: String, 
  $twitterHandle: String, $youtubeChannel: String,
  $youtubeVideo1Url: String,
  $youtubeVideo2Url: String,
  $youtubeVideo3Url: String,
  $bannerImageUrl: String,
  $twitchUserId: Int,
  $profileImageUrl: String,
  $facebookLink: String,
  $instagramLink: String,
  $username: String,
  $authenticated: Boolean
	) {
  	updateIndividualUserById(input:{id: $id, individualUserPatch: {
      firstName: $firstName
      lastName: $lastName
      about: $about
      bannerImageUrl: $bannerImageUrl
      profileImageUrl: $profileImageUrl
      contactNumber: $contactNumber
      accomplishments: $accomplishments
      twitchUrl: $twitchUrl
      twitterHandle: $twitterHandle
      twitchUserId: $twitchUserId
      youtubeChannel: $youtubeChannel
      youtubeVideo1Url: $youtubeVideo1Url
      youtubeVideo2Url: $youtubeVideo2Url
      youtubeVideo3Url: $youtubeVideo3Url
      facebookLink: $facebookLink
      instagramLink: $instagramLink
      username: $username
      authenticated: $authenticated
    }}) {
    individualUser {
      id
    }
  }
}`;
