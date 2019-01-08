import gql from 'graphql-tag';

export const updateThemeQuery = gql`mutation updateTheme($id: Int!, $themeData: JSON, $themeStructure: JSON) {
  	        updateThemeById(input:{id:$id, themePatch: {themeData: $themeData, themeStructure: $themeStructure}}) {
            theme {
                id
                themeData
                themeStructure
            	    }
        	}
}`;

export const getThemeQuery = gql`
    query getTheme($organisationId: Int!) {
     resultData: allThemes(condition: {organisationId: $organisationId}) {
    nodes {
      id
      themeData
        themeStructure
        themeName
      }
    }
  }
`;

export const getThemeByNameQuery = gql`
    query getTheme($themeName: String!) {
     resultData: allThemes(condition: {themeName: $themeName}) {
    nodes {
      id
      themeData
        themeStructure
        themeName
      }
    }
  }
`;

export const createThemeQuery = gql`mutation createTheme($themeName: String!, $themeData: JSON!, $themeStructure: JSON!) {
  createTheme(input: {theme: {
    themeName: $themeName
    themeData: $themeData
    themeStructure: $themeStructure
  }}) {
    theme {
      id
      themeName
    }
  }
}`;

