import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Accordion, Sidebar, Segment, Icon, Menu } from 'semantic-ui-react';

// import { push as Menu } from 'react-burger-menu';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationAdminPageComponentRender from '../../render_components/OrganizationAdminPageComponentRender';
import OrganizationAdminMenuComponentRender from '../../render_components/OrganizationAdminMenuComponentRender';
import AdminProfileController from './sub_controllers/AdminProfileController';
import AdminBlogController from './sub_controllers/AdminBlogController';
import AdminMediaController from './sub_controllers/AdminMediaController';
import AdminSponsorController from './sub_controllers/AdminSponsorController';
import AdminThemeController from './sub_controllers/AdminThemeController';
import { getOrganisationQuery } from '../../../queries/organisation';
import historyStore from '../../../utils/stores/browserHistory';

// import PropTypes from 'prop-types';
class MenuDrop extends Component {
    state = { open: false };

    handleMenuClick = (v, e) => {
        console.log(v, e);
        this.props.handleManageClick(v);
    }

    handleClick = () => {
        const f = this.state.open;
        this.setState({ open: !f });
    }
    render() {
        return (
            <div>
                <Accordion fluid inverted >
                    <Accordion.Title active={this.state.open} index={0} onClick={this.handleClick}>
                        <Icon name="dropdown" />
                        Manage
          </Accordion.Title>
                    <Accordion.Content active={this.state.open}>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('theme', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Theme
                                </div>
                            </div>
                        </a>
                        <a className="item">
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    About
                                </div>
                            </div>
                        </a>
                        <a className="item">
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Roster
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('blog', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Blog
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('media', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Media
                                </div>
                            </div>
                        </a>
                        <a className="item">
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Recent Matches
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('sponsors', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="block layout icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Sponsors
                                </div>
                            </div>
                        </a>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
}
class AdminPageController extends Component {
    state = { page: 'company', isOpen: false, visible: false };
    componentWillMount = async () => {
        if (this.props.appManager.admin_logged_in) {
            const domainInfo = this.props.appManager.getDomainInfo();
            const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            if (o.resultData === null) {
                console.log('sub domain does not exist!');
            } else {
                this.props.uiStore.setOrganisation(o.resultData);
                this.props.uiStore.setSubDomain(subDomain);
                this.setState({ visible: true });
            }
            const { user_id } = this.props.uiStore;
            console.log(user_id);
        } else {
            historyStore.push('/admin');
        }
    }
    handleClick = () => {
        const f = this.state.isOpen;
        this.setState({ isOpen: !f });
    }

    handleManageClick = (v) => {
        this.setState({ page: v });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let p_component = <span />;
        switch (this.state.page) {
            case 'company': {
                p_component = <AdminProfileController />;
                break;
            }
            case 'media': {
                p_component = <AdminMediaController />;
                break;
            }
            case 'blog': {
                p_component = <AdminBlogController />;
                break;
            }
            case 'sponsors': {
                p_component = <AdminSponsorController />;
                break;
            }
            case 'theme': {
                p_component = <AdminThemeController />;
                break;
            }
            default: {
                break;
            }
        }
        const nd = this.props.uiStore.current_organisation.usersByOrganisation.edges[0].node;
        const full_name = `${nd.firstName} ${nd.lastName}`;
        return (
            <div id="outer-container">
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="push" width="wide" visible={this.state.isOpen} icon="labeled" vertical inverted>
                        <OrganizationAdminMenuComponentRender handleMainMenuClick={this.handleManageClick} dropdown={<MenuDrop handleManageClick={this.handleManageClick} classes={this.props.classes} />} fullname={full_name} image_src={this.props.uiStore.current_theme_structure.header.logo.imageData} />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <OrganizationAdminPageComponentRender admin_content={p_component} handleClick={this.handleClick} />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
AdminPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
MenuDrop.propTypes = {
    classes: PropTypes.object.isRequired,
    handleManageClick: PropTypes.func.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminPageController));
