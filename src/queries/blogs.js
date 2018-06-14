import gql from 'graphql-tag';

export const getBlogsCountQuery = gql`query getBlogsCount($subDomain: String!) {
  resultData:allBlogs(condition: {organisation: $subDomain}) {
    totalCount
  }
}
`;

export const deleteBlogQuery = gql`mutation deleteBlog($id: Int!) {
  deleteBlogById(input:{id: $id}) {
    blog {
      id
    }
  }
}`;
export const getBlogsQuery = gql`
  query getBlogs($subDomain: String!) {
    resultData: allBlogs(orderBy: CREATED_AT_DESC, condition: { organisation: $subDomain }) {
        edges {
            node {
                id
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

export const updateBlogPostQuery = gql`
mutation updateBlogPost($id: Int!, $blogTitle: String!, $blogContent: String!, $featured: Boolean, $blogMedia: String) {
  updateBlogById(input:{id: $id, blogPatch: {
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
