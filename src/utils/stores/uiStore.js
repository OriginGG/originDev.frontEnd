import { observable, action } from 'mobx';


class UiStore {
    @observable current_organisation = {}
    @observable current_subdomain = ''
    @observable current_theme_data = {}
    @observable current_theme_structure = {}
    @observable origin_theme_data = {}
    @observable origin_theme_structure = {}
    setOrganisation = (o) => {
        const { themeData } = o.themesByThemeName.edges[0].node;
        const { themeStructure } = o.themesByThemeName.edges[0].node;
        this.current_theme_data = JSON.parse(themeData);
        this.current_theme_structure = JSON.parse(themeStructure);
        this.current_organisation = o;
    }
    @action
    setSubDomain = (o) => {
        this.current_subdomain = o;
    }
    @action
    setOriginTheme = (o) => {
        const { themeData } = o;
        const { themeStructure } = o;
        this.origin_theme_data = JSON.parse(themeData);
        this.origin_theme_structure = JSON.parse(themeStructure);
    }
}

export default new UiStore();
