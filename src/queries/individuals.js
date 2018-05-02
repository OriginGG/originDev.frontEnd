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
    bannerlImageUrl
		profileImageUrl
		id
  }
}
`;
