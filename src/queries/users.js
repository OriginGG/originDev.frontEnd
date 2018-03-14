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
