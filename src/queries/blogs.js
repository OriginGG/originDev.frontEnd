import gql from 'graphql-tag';


export const deleteBlogQuery = gql`mutation deleteBlog($id: Int!) {
  deleteBlogById(input:{id: $id}) {
    blog {
      id
    }
  }
}`;
export const getBlogsQuery = gql`
  query getBlogs($organisationId: Int!) {
    resultData: allBlogs(orderBy: CREATED_AT_DESC, condition: { organisationId: $organisationId }) {
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
}`;

export const getSingleBlogQuery = gql`
query getBlog($id: Int!) {
  resultData: blogById(id: $id) {
        id
        blogTitle
        blogContent
        blogMedia
        createdAt
        updatedAt
        featured
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
mutation createBlogPost($blogTitle: String!, $organisationId: Int!, $blogContent: String!, $featured: Boolean, $blogMedia: String) {
  createBlog(input:{blog: {
    organisationId: $organisationId,
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
