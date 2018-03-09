import gql from 'graphql-tag';

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
