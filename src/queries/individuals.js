import gql from 'graphql-tag';

export const searchIndividualUsersByHandleQuery = gql`query srchIndbyhandle($handle: String!) {
  allIndividualUsers(filter: 
    {username: {includesInsensitive: $handle }}) {
		nodes {
    firstName
    lastName
    about
    email
    contactEmail
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
    authenticated
		}
	}
}
`;

export const getIndividualUserByHandleQuery = gql`query getIndbyhandle($handle: String!) {
  allIndividualUsers(filter: 
    {username: {endsWithInsensitive: $handle }}) {
		nodes {
    firstName
    lastName
    about
    email
    contactEmail
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

export const deleteIndQueryNew = gql`mutation delinduser($id: Int!) {
  deleteIndividualUserById(input: {id: $id}) {
    individualUser {
      id
    }
  }
}`;

export const getIndividualUserQuery = gql`query getIndividual($id: Int!) {
  individualUserById(id: $id) {
    firstName
    lastName
    about
    email
    contactEmail
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
    authenticated
  }
}
`;

export const createIndUserQueryNew = gql`mutation createIndUser($email: String!, $password: String!, $userName: String!, $firstName: String!, $lastName: String!) {
  createIndividualUser(input: {
    individualUser: {
      firstName: $firstName
      passwordHash: $password,
      email: $email,
      lastName: $lastName
      username: $userName
      authenticated: true
    }
  }) {
    individualUser {
      id
    }
  }
}`;

export const updateIndividualUserQuery = gql`mutation updateIndividualUser($id: Int!, $firstName: String, $lastName: String, $about: String,
	$contactEmail: String, $accomplishments: String, $twitchUrl: String, 
  $twitterHandle: String, $youtubeChannel: String,
  $youtubeVideo1Url: String,
  $youtubeVideo2Url: String,
  $youtubeVideo3Url: String,
  $bannerImageUrl: String,
  $twitchUserId: String,
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
      contactEmail: $contactEmail
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
