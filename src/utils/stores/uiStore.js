import { observable, action } from 'mobx';


class UiStore {
    @observable current_organisation = {}
    @observable current_subdomain = ''
    @action
    setOrganisation = (o) => {
        this.current_organisation = o;
    }
    @action
    setSubDomain = (o) => {
        this.current_subdomain = o;
    }
}

export default new UiStore();
