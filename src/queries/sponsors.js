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
        hrefLink1
        hrefLink2
        hrefLink3
        hrefLink4
        sponsorDesc1
        sponsorDesc2
        sponsorDesc3
        sponsorDesc4
        createdAt
        updatedAt
      }
    }
  }
}
`;

export const updateSponsorsQuery = gql`mutation updatesponsor($id: Int!, 
$link1: String, $link2: String, $link3: String, $link4: String,
$href_link1: String, $href_link2: String, $href_link3: String, $href_link4: String,
$desc1: String, $desc2: String, $desc3: String, $desc4: String
) {
  updateSponsorById(input:{id: $id, sponsorPatch: {
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
  }}) {
    sponsor {
      id
    }
  }
}`;

export const createSponsorsQuery = gql`mutation createsponsor($subDomain: String!, $link1: String, $link2: String, $link3: String, $link4: String,
$href_link1: String, $href_link2: String, $href_link3: String, $href_link4: String,
$desc1: String, $desc2: String, $desc3: String, $desc4: String

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
  }}) {
    sponsor {
      id
    }
  }
}`;

