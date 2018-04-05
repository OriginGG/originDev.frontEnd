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

export const getAllNonAdminUsersQuery = gql`query getUsersNonAdmin($subDomain: String!) {
    allUsers(condition:{organisation: $subDomain, adminUser: false}) {
      edges {
      node {
        firstName
        lastName
        email
        passwordHash
      }  
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

export const getPreUserQuery = gql`query getPreUser($id:Int!) {
  resultData: preUserById(id:$id) {
    name
    email
    password
    adminUser
  }
}`;

export const createPreUserQuery = gql`mutation preRegister($name: String!, $email: String!, $password: String!, $adminUser: Boolean!) {
  	preRegisterUser(input: {name: $name, email: $email, password: $password, adminUser:$adminUser}) {
		jwtToken
		
		
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

