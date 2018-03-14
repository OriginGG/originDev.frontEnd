import gql from 'graphql-tag';

export const updateUserQuery = gql`mutation updateuser($id: Int!, $organisation: String) {
    updateUserById(input: {
        id: $id, userPatch: {
            organisation: $organisation
        }
    }) {
        user {
            id
        }
    }
}`;

export const getUserQuery = gql`query getUser($id:Int!) {
  resultData: userById(id:$id) {
    firstName
    lastName
    email
    organisation
    adminUser
    
  }
}`;
