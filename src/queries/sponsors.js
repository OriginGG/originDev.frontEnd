import gql from 'graphql-tag';

export const getSponsorsCountQuery = gql`query getOrganisationSponsorsCount($subDomain: String!) {
  organisationAccountBySubDomain(subDomain: $subDomain) {
    orgSponsorsByOrganisation {
      totalCount
    }
  }
}`;

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

// old queries

// export const getSponsorsQuery = gql`query getSponsors($subDomain: String!) {
//   resultData: allSponsors(condition: {organisation: $subDomain}) {
//     edges {
//       node {
//         id
//         sponsor1
//         sponsor2
//         sponsor3
//         sponsor4
//         hrefLink1
//         hrefLink2
//         hrefLink3
//         hrefLink4
//         sponsorDesc1
//         sponsorDesc2
//         sponsorDesc3
//         sponsorDesc4
//         sponsorName1
//         sponsorName2
//         sponsorName3
//         sponsorName4
//         createdAt
//         updatedAt
//       }
//     }
//   }
// }
// `;

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

