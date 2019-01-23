import gql from 'graphql-tag';

export const getTwitchChannelsQuery = gql`query getTwitchChannels($organisationId: Int!) {
    resultData: allTwitchChannels(condition: { organisationId: $organisationId }) {
        edges {
            node {
                channelName
            }
        }
    }
}`;
