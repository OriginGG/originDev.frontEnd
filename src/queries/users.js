import gql from 'graphql-tag';

export const updateUserQuery = gql`mutation updateuser($id: Int!, $authenticated: Boolean, $subscribed: Boolean) {
    updateUserById(input: {
        id: $id, userPatch: {
            authenticated: $authenticated
            subscribed: $subscribed
        }
    }) {
        user {
            id
        }
    }
}`;

export const getAllNonAdminUsersQuery = gql`query getUsersNonAdmin($organisationId: String!) {
    allUsers(condition:{organisationId: $organisationId, adminUser: false}) {
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

export const getAllAdminUsersQuery = gql`query getUsersNonAdmin($subDomain: String!) {
    allUsers(condition:{organisation: $subDomain, adminUser: true}) {
      edges {
      node {
        subscribed
      }  
    }
  }
}`;


export const getUserByEmailQuery = gql`query getUserByEmail($email:String!) {
  allUsers(condition:{email:$email}) {
    edges {
      node {
        id
        authenticated
      }
    }
  }
}`;

export const getUserByEmailQuery2 = gql`
query getUserEmail($email: String!) {
	userByEmail(email: $email) {
    id
  }  
}
`;

export const getIndividualUserByEmailQuery = gql`query getIndividualUserByEmail($email:String!) {
  allIndividualUsers(condition:{email:$email}) {
    edges {
      node {
        id
        authenticated
      }
    }
  }
}`;


export const getIndividualUserByIdQuery = gql`query getIndividualUserByEmail($id:Int!) {
  allIndividualUsers(condition:{id:$id}) {
    edges {
      node {
        id
        authenticated
        firstName
        lastName
        username
        email
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
    organisationId
    adminUser
    authenticated
    subscribed
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

export const createUserQuery = gql`mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $adminUser: Boolean!, $authenticated: Boolean!) {
    registerUser(input:{firstName: $firstName, lastName:$lastName, email: $email, 
    password: $password,adminUser: $adminUser, authenticated: $authenticated}) {
      user {
        id
      }
    }
  }`;


export const getAllIndividualUsersQuery = gql`query getAllIndividualUsers {
  allIndividualUsers {
    edges {
      node {
        firstName
        lastName
        id
        profileImageUrl
        username
      }
    }
  }
}`;

export const createIndividualUserQuery = gql`mutation registerIndividual($firstName: String!, $lastName: String!, $email: String!, $password: String!, $authenticated: Boolean!, $userName: String! ) {
	individualUserRegister(input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, authenticated: $authenticated, userName: $userName}) {
		individualUser {
			email
      id
		}
	}
}`;

