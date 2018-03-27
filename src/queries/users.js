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

export const createUserQuery = gql`mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $adminUser: Boolean! ) {
    registerUser(input:{firstName: $firstName, lastName:$lastName, email: $email, 
    password: $password,adminUser: $adminUser }) {
      user {
        id
      }
    }
  }`;

