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
