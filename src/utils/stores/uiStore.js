import { observable, action } from 'mobx';


class UiStore {
    @observable current_theme = ''
    @action
    setCurrentTheme = (t) => {
        this.current_theme = t;
    }
}

export default new UiStore();
