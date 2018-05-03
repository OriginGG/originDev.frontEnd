import gql from 'graphql-tag';

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
		twitterHandle
		accomplishments
		youtubeVideo1Url
		youtubeVideo2Url
		youtubeVideo3Url
    bannerImageUrl
		profileImageUrl
		id
  }
}
`;

export const updateIndividualUserQuery = gql`mutation updateIndividualUser($id: Int!, $firstName: String, $about: String,
	$contactNumber: String, $accomplishments: String, $twitchUrl: String,
  $twitterHandle: String, $youtubeChannel: String,
  $youtubeVideo1Url: String,
  $youtubeVideo2Url: String,
  $youtubeVideo3Url: String,
  $bannerImageUrl: String,
  $profileImageUrl: String
	) {
  	updateIndividualUserById(input:{id: $id, individualUserPatch: {
      firstName: $firstName
      about: $about
      bannerImageUrl: $bannerImageUrl
      profileImageUrl: $profileImageUrl
      contactNumber: $contactNumber
      accomplishments: $accomplishments
      twitchUrl: $twitchUrl
      twitterHandle: $twitterHandle
      youtubeChannel: $youtubeChannel
      youtubeVideo1Url: $youtubeVideo1Url
      youtubeVideo2Url: $youtubeVideo2Url
      youtubeVideo3Url: $youtubeVideo3Url
    }}) {
    individualUser {
      id
    }
  }
}`;
