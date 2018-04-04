import gql from 'graphql-tag';

export const getBlogsCountQuery = gql`query getBlogsCount($subDomain: String!) {
  resultData:allBlogs(condition: {organisation: $subDomain}) {
    totalCount
  }
}
`;

export const getBlogsQuery = gql`
  query getBlogs($subDomain: String!) {
    resultData: allBlogs(condition: { organisation: $subDomain }) {
        edges {
            node {
                blogTitle
                blogContent
                blogMedia
                createdAt
                updatedAt
                featured
            }
        }
    }
}
`;

export const createBlogPostQuery = gql`
mutation createBlogPost($blogTitle: String!, $organisation: String!, $blogContent: String!, $featured: Boolean, $blogMedia: String) {
  createBlog(input:{blog: {
    organisation: $organisation,
    blogTitle: $blogTitle
    blogContent: $blogContent
    blogMedia: $blogMedia
    featured: $featured
  }}) {
    blog {
      id
    }
  }
}`;
