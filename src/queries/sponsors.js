import gql from 'graphql-tag';

export const getSponsorsCountQuery = gql`query getOrganisationSponsorsCount($subDomain: String!) {
  organisationAccountBySubDomain(subDomain: $subDomain) {
    orgSponsorsByOrganisation {
      totalCount
    }
  }
}`;

export const getSponsorsQuery = gql`query getOrganisationSponsors($subDomain: String!) {
  organisationAccountBySubDomain(subDomain: $subDomain) {
    orgSponsorsByOrganisation {
      nodes {
        organisation
        id
        imageUrl
        hrefLink
        name
        description
        createdAt
        updatedAt
        
      }
    }
  }
}`;

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

export const updateSponsorsQuery = gql`mutation updateSponsor($id: Int!, $imageUrl: String, $hrefLink: String, $description: String, $name: String) {
  updateOrgSponsorById(input: {id: $id, orgSponsorPatch: {
    imageUrl: $imageUrl
    hrefLink: $hrefLink
    description: $description
    name: $name
  }}) {
    orgSponsor {
      id
    }
  }
}`;

export const createSponsorsQuery = gql`mutation createsponsor($subDomain: String!, $link1: String, $link2: String, $link3: String, $link4: String,
$href_link1: String, $href_link2: String, $href_link3: String, $href_link4: String,
$desc1: String, $desc2: String, $desc3: String, $desc4: String, $name1: String, $name2: String, $name3: String, $name4: String
) {
  createSponsor(input:{
    sponsor: {
      organisation: $subDomain
      sponsor1: $link1
      sponsor2: $link2
      sponsor3: $link3
      sponsor4: $link4
      hrefLink1: $href_link1
      hrefLink2: $href_link2
      hrefLink3: $href_link3
      hrefLink4: $href_link4
      sponsorDesc1: $desc1
      sponsorDesc2: $desc2
      sponsorDesc3: $desc3
      sponsorDesc4: $desc4
      sponsorName1: $name1
      sponsorName2: $name2
      sponsorName3: $name3
      sponsorName4: $name4
  }}) {
    sponsor {
      id
    }
  }
}`;

