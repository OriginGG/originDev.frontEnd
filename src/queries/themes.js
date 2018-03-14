import gql from 'graphql-tag';

export const updateThemeQuery = gql`
    mutation updateTheme($themeName: String!, $themeData: String!) {
        updateTheme(input: { themePatch: { themeName: $themeName, themeData: $themeData } }) {
        theme {
            themeName
            themeData
        }
    }
}`;

export const getThemeQuery = gql`
    query getTheme($subDomain: String!) {
    resultData: themeByThemeName(themeName: $subDomain) {
        themeData
        themeStructure
        themeName
    }
}`;

export const createThemeQuery = gql`mutation createTheme($themeName: String!, $themeData: JSON!, $themeStructure: JSON!) {
  createTheme(input: {theme: {
    themeName: $themeName
    themeData: $themeData
    themeStructure: $themeStructure
  }}) {
    theme {
      themeName
    }
  }
}`;

