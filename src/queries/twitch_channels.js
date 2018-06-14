import gql from 'graphql-tag';

export const getTwitchChannelsQuery = gql`query getTwitchChannels($subDomain: String!) {
    resultData: allTwitchChannels(condition: { organisation: $subDomain }) {
        edges {
            node {
                channelName
            }
        }
    }
}`;
