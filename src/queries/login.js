import gql from 'graphql-tag';

export const authenticateQuery = gql`
    mutation authenticate {
        authenticate(input: {email: "stefan.walker@gmail.com", password: "buzz1968"}) {
            resultData: authPayload {
            jwtToken
		}
    }
}
`;
