import gql from 'graphql-tag';

export const authenticateQuery = gql`
    mutation authenticate($email: String!, $password: String!) {
        authenticate(input: {email: $email, password: $password}) {
            resultData: authPayload {
            jwtToken
            isAdmin
            organisation
		}
    }
}
`;
