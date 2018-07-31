import gql from 'graphql-tag';

export const createContentTeamQuery = gql`mutation createContentTeam($memberId: Int!) {
  createContentTeam(input: {contentTeam: {
    memberId: $memberId
  }}) {
    contentTeam {
      id
    }
  }
}
`;
export const deleteContentTeamQuery = gql`mutation deleteContentTeam($id: Int!) {
  deleteContentTeamById(input: {id: $id}) {
    contentTeam {
      id
    }
  }
}`;

