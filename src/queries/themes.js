import gql from 'graphql-tag';

export const updateThemeQuery = gql`mutation updateTheme($themeName: String!, $themeData: JSON, $themeStructure: JSON) {
  	        updateThemeByThemeName(input:{themeName:$themeName, themePatch: {themeData: $themeData, themeStructure: $themeStructure}}) {
            theme {
                themeData
                themeStructure
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

