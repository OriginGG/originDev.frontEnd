import gql from 'graphql-tag';

export const getSponsorsQuery = gql`query getSponsors($subDomain: String!) {
  resultData: allSponsors(condition: {organisation: $subDomain}) {
    edges {
      node {
        linkUrl
        imageUrl
        createdAt
        updatedAt
      }
    }
  }
}
`;
