import gql from 'graphql-tag';

export const getYouTubeChannelsQuery = gql`query getYouTubeChannels($subDomain: String!) {
    resultData:allYoutubeChannels(condition: { organisation: $subDomain }) {
        edges {
            node {
                channelName
            }
        }
    }
}`;
