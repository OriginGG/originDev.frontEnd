import gql from 'graphql-tag';

export const getYouTubeChannelsCountquery = gql`query getYouTubeChannels($subDomain: String!) {
  resultData:allYoutubeChannels(condition: {organisation: $subDomain}) {
    totalCount
  }
}
`;

export const getYouTubeChannelsQuery = gql`query getYouTubeChannels($organisationId: Int!) {
    resultData:allYoutubeChannels(condition: { organisationId: $organisationId }) {
        edges {
            node {
                organisationId
                youtubeVideo1
                youtubeVideo2
                youtubeVideo3
                youtubeVideo4
        createdAt
        updatedAt
        id
              
            }
        }
    }
}`;
export const updateYouTubeChannelQuery = gql`mutation updateyoutubechannel($id: Int!, $link1: String, $link2: String, $link3: String, $link4: String) {
  updateYoutubeChannelById(input:{id: $id, youtubeChannelPatch: {
    youtubeVideo1: $link1
    youtubeVideo2: $link2
    youtubeVideo3: $link3
    youtubeVideo4: $link4
  }}) {
    youtubeChannel {
      id
    }
  }
}`;

export const createYouTubeChannelQuery = gql`mutation createyoutubechannel($organisationId: Int!, $link1: String, $link2: String, $link3: String, $link4: String) {
  createYoutubeChannel(input:{
    youtubeChannel: {
      organisationId: $organisationId
      youtubeVideo1: $link1
      youtubeVideo2: $link2
      youtubeVideo3: $link3
      youtubeVideo4: $link4
    }
  }) {
    youtubeChannel {
      id
    }
  }
}`;
