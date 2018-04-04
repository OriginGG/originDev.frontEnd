import gql from 'graphql-tag';

export const getSponsorsQuery = gql`query getSponsors($subDomain: String!) {
  resultData: allSponsors(condition: {organisation: $subDomain}) {
    edges {
      node {
        id
        sponsor1
        sponsor2
        sponsor3
        sponsor4
        createdAt
        updatedAt
      }
    }
  }
}
`;

export const updateSponsorsQuery = gql`mutation updatesponsor($id: Int!, $link1: String, $link2: String, $link3: String, $link4: String) {
  updateSponsorById(input:{id: $id, sponsorPatch: {
    sponsor1: $link1
    sponsor2: $link2
    sponsor3: $link3
    sponsor4: $link4
  }}) {
    sponsor {
      id
    }
  }
}`;

export const createSponsorsQuery = gql`mutation createsponsor($subDomain: String!, $link1: String, $link2: String, $link3: String, $link4: String) {
  createSponsor(input:{
    sponsor: {
      organisation: $subDomain
      sponsor1: $link1
      sponsor2: $link2
      sponsor3: $link3
      sponsor4: $link4
  }}) {
    sponsor {
      id
    }
  }
}`;

