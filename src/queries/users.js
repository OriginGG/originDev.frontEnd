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

export const getUserByEmailQuery = gql`query getUserByEmail($email:String!) {
  allUsers(condition:{email:$email}) {
    edges {
      node {
        id
      }
    }
  }
}`;

export const getIndividualUserByEmailQuery = gql`query getIndividualUserByEmail($email:String!) {
  allIndividualUsers(condition:{email:$email}) {
    edges {
      node {
        id
      }
    }
  }
}`;

export const authenticatePreUserQuery = gql`mutation authenticatePre($email: String!, $password: String!) {
  preUserAuthenticate(input:{email: $email, password: $password}) {
		jwtToken
		}
  }
`;

export const getUserQuery = gql`query getUser($id:Int!) {
  resultData: userById(id:$id) {
    firstName
    lastName
    email
    organisation
    adminUser
    
  }
}`;

export const deletePreUserQuery = gql`mutation deletePreUser($id: Int!) {
  deletePreUserById(input:{id: $id}) {
    preUser {
      id
    }
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

export const createIndividualUserQuery = gql`mutation registerIndividual($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
	individualUserRegister(input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
		individualUser {
			email
		}
	}
}`;

