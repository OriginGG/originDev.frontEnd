import { observable, action } from 'mobx';


class UiStore {
    @observable current_organisation = {}
    @action
    setOrganisation = (o) => {
        this.current_organisation = o;
    }
}

export default new UiStore();
