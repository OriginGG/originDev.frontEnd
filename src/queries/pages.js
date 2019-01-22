import gql from 'graphql-tag';

export const createPageQuery = gql`
mutation createPage($organisationId: Int!, $pageKey: String, $pageTitle: String, $pageContent: String, $pageSubtitle: String) {
  createPage(input: {page: {
    organisationId:$organisationId
    pageTitle: $pageTitle
    pageKey:$pageKey
    pageContent: $pageContent
    pageSubtitle: $pageSubtitle
  }}) {
    page {
      id
    }
  }
}
`;

export const getPagesQuery = gql`query getPages($organisationId: Int!) {
  allPages(condition: {organisationId: $organisationId}) {
    edges {
      node {
        pageTitle 
        pageKey
        id
        pageContent
        pageSubtitle
        createdAt
      }
    }
  }
}`;

export const updatePageQuery = gql`mutation updatePage($id: Int!, $pageTitle: String, $pageContent: String, $pageSubtitle: String) {
  updatePageById(input:{id: $id, pagePatch: {
    pageTitle:$pageTitle
    pageContent: $pageContent
    pageSubtitle: $pageSubtitle
  }}) {
    page {
      id
    }
  }
}`;
