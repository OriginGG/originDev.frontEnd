import { observable, action } from 'mobx';


class UiStore {
    @observable current_organisation = {}
    @observable current_subdomain = ''
    @observable current_theme_data = {}
    @observable current_theme_structure = {}
    @observable origin_theme_data = {}
    @observable origin_theme_structure = {}
    @observable user_id = 0;
    @observable individual_user_id = 0;
    @observable current_blog = {}
    setOrganisation = (o) => {
        const { themeData } = o.themesByThemeName.edges[0].node;
        const { themeStructure } = o.themesByThemeName.edges[0].node;
        this.current_theme_data = JSON.parse(themeData);
        this.current_theme_structure = JSON.parse(themeStructure);
        this.current_organisation = o;
    }
    @action setUserID = (id) => {
        this.user_id = id;
    }
    @action setIndividualUserID = (id) => {
        this.individual_user_id = id;
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
    @action
    setBlogStory = (o) => {
        this.current_blog = o;
    }
}

export default new UiStore();
