import gql from 'graphql-tag';

export const createPageQuery = gql`
mutation createPage($organisation: String!, $pageKey: String, $pageTitle: String, $pageContent: String, $pageSubtitle: String) {
  createPage(input: {page: {
    organisation:$organisation
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

export const getPagesQuery = gql`query getPages($organisation: String!) {
  allPages(condition: {organisation: $organisation}) {
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

export const updatePageQuery = gql`mutation updatePage($id: Int!, $organisation: String!, $pageTitle: String, $pageContent: String, $pageSubtitle: String) {
  updatePageById(input:{id: $id, pagePatch: {
    organisation: $organisation
    pageTitle:$pageTitle
    pageContent: $pageContent
    pageSubtitle: $pageSubtitle
  }}) {
    page {
      id
    }
  }
}`;
