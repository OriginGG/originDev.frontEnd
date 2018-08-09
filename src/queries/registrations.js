import gql from 'graphql-tag';

export const setPasswordOrganisationQuery = gql`mutation resetPasswordOrg($id: Int!, $password: String!) {
  setPasswordOrganisation(input:{id: $id, password: $password}) {
    boolean
  }
}`;

export const setPasswordIndividualQuery = gql`mutation resetPasswordInd($id: Int!, $password: String!) {
  setPasswordIndividual(input:{id: $id, password: $password}) {
    boolean
  }
}`;


export const createEmailRegistrationQuery = gql`mutation createEmailRegistration($email: String!, $payload: String!) {
  createRegistrationEmail(input:{registrationEmail: {
    email:$email
    payload: $payload
  }}) {
    registrationEmail {
      email
    }
  }
}`;


export const deleteEmailRegistrationQuery = gql`mutation deleteEmailRegistration($email: String!) {
  deleteRegistrationEmailByEmail(input:{email:$email}) {
    registrationEmail {
      email
    }
  }  
}`;

export const getEmailRegistrationQuery = gql`query getEmailRegistration($email: String!) {
    registrationEmailByEmail(email: $email) {
        email
        payload
    }
}`;
