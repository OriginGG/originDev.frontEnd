import gql from 'graphql-tag';


export const getSponsorsQuery = gql`query getOrganisationSponsors($organisationId: Int!) {
    allOrgSponsors(condition: {organisationId: $organisationId}) {
      nodes {
        organisationId
        id
        imageUrl
        bgImages
        hrefLink
        name
        description
        createdAt
        updatedAt
        
      }
    }
  }
`;


export const updateSponsorsQuery = gql`mutation updateSponsor($id: Int!, $imageUrl: String, $bgImages: String, $hrefLink: String, $description: String, $name: String) {
  updateOrgSponsorById(input: {id: $id, orgSponsorPatch: {
    imageUrl: $imageUrl
    bgImages: $bgImages
    hrefLink: $hrefLink
    description: $description
    name: $name
  }}) {
    orgSponsor {
      id
    }
  }
}`;

export const deleteSponsorQuery = gql`mutation deletesponsor($id: Int!) {
  deleteOrgSponsorById(input: {id: $id}) {
    orgSponsor {
      id
    }
  }
}`;


export const createSponsorsQuery = gql`mutation createSponsorQuery($organisationId: Int!, $imageUrl: String, $bgImages: String, $hrefLink: String, $description: String, $name: String) {
  createOrgSponsor(input: {orgSponsor: {
    imageUrl: $imageUrl
    bgImages: $bgImages
    organisationId: $organisationId
    hrefLink: $hrefLink
    name: $name
    description: $description
    }
  }) {
    orgSponsor {
      id
    }
  }
} 
`;

