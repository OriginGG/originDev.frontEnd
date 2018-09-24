import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { StripeProvider } from 'react-stripe-elements';
import { Accordion, Sidebar, Segment, Icon, Menu } from 'semantic-ui-react/dist/commonjs';
// import { push as Menu } from 'react-burger-menu';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationAdminPageComponentRender from '../../render_components/admin/OrganizationAdminPageComponentRender';
import OrganizationAdminMenuComponentRender from '../../render_components/admin/OrganizationAdminMenuComponentRender';
import AdminProfileController from './sub_controllers/AdminProfileController';
import AdminBlogController from './sub_controllers/AdminBlogController';
import AdminMembersController from './sub_controllers/AdminMembersController';
import AdminAboutController from './sub_controllers/AdminAboutController';
import AdminSubscriptionController from './sub_controllers/AdminSubscriptionController';
import AdminMediaController from './sub_controllers/AdminMediaController';
import AdminSponsorController from './sub_controllers/AdminSponsorController';
import AdminRosterController from './sub_controllers/AdminRosterController';
import AdminStaffController from './sub_controllers/AdminStaffController';
import AdminThemeController from './sub_controllers/AdminNewThemeController';
import AdminCollaboratorController from './sub_controllers/AdminCollaboratorController';
import AdminRecentMatchesController from './sub_controllers/AdminRecentMatchesController';
import AdminContentTeamController from './sub_controllers/AdminContentTeamController';
import AdminCustomDomainController from './sub_controllers/AdminCustomDomainController';
import { getOrganisationQuery } from '../../../queries/organisation';
import { getUserQuery } from '../../../queries/users';
import historyStore from '../../../utils/stores/browserHistory';


const { confirm } = Modal;

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
                        Manage Content
          </Accordion.Title>
                    <Accordion.Content active={this.state.open}>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('theme', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="paint brush icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Theme
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('about', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="comment outline icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    About
                                </div>
                            </div>
                        </a>
                        {<a className="item">
                            <div className={this.props.classes.menu_item} tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('staff', e); }}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="id card icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Staff
                                </div>
                            </div>
                        </a>}
                        <a className="item">
                            <div className={this.props.classes.menu_item} tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('roster', e); }}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="bullseye icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Roster
                                </div>
                            </div>
                        </a>
                        <a className="item">
                            <div className={this.props.classes.menu_item} tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('content_team', e); }}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="group icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Content Team
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('blog', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="keyboard icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Blog
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('media', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="file alternate icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Media
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('recentmatches', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="trophy icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Recent Matches
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('sponsors', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="dollar sign icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Sponsors
                                </div>
                            </div>
                        </a>
                        <a className="item" tabIndex={-1} role="menuitem" onClick={(e) => { this.handleMenuClick('add_custom_domain', e); }}>
                            <div className={this.props.classes.menu_item}>
                                <div className={this.props.classes.menu_item_icon}>
                                    <i className="linkify icon" />
                                </div>
                                <div className={this.props.classes.menu_item_label}>
                                    Add a custom domain
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
    componentDidMount = async () => {
        if (this.props.appManager.admin_logged_in) {
            const { user_id } = this.props.uiStore;
            const user = await this.props.appManager.executeQuery('query', getUserQuery, { id: user_id });
            this.subscribed = user.resultData.subscribed;
            const domainInfo = this.props.appManager.getDomainInfo();
            const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            if (o.resultData === null) {
                console.log('sub domain does not exist!');
            } else {
                this.props.uiStore.setOrganisation(o.resultData);
                this.props.uiStore.setSubDomain(subDomain);
                this.setState({ visible: true });
                this.autorun_tracker = autorun(() => {
                    if (this.props.uiStore.current_theme_structure.header.logo.imageData) {
                        if (this.initialized === true) {
                            this.my_key += 1;
                            this.setState({ visible: true });
                        }
                    }
                });
            }
            console.log(user_id);
            this.initialized = true;
        } else {
            historyStore.push('/admin');
        }
    }
    componentWillUnmount() {
        if (this.autorun_tracker) {
            this.autorun_tracker();
        }
    }
    autorun_tracker = null;
    initialized = false;
    my_key = 1;
    handleClick = () => {
        const f = this.state.isOpen;
        this.setState({ isOpen: !f });
    }
    showSubscribeConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Subscription Required',
                content: 'To add your own custom domain, you require a subscription.',
                okText: 'Subscribe',
                cancelText: 'Cancel',
                onOk: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    };
    subscriptionClick = async () => {
        const action = await this.showSubscribeConfirm();
        if (action) {
            this.setState({ page: 'subscription' });
        }
    }
    hasSubscribed = () => {
        this.subscribed = true;
        this.setState({ page: 'company' });
    }
    handleManageClick = async (v) => {
        if (v === 'add_custom_domain' && !this.subscribed) {
            this.subscriptionClick();
        } else {
            this.setState({ page: v });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let p_component = <span />;
        switch (this.state.page) {
            case 'subscription': {
                p_component = <AdminSubscriptionController callback={this.hasSubscribed} subscribed={this.subscribed} domain={this.props.uiStore.current_organisation.subDomain} user_id={this.props.uiStore.user_id} />;
                break;
            }
            case 'add_custom_domain': {
                p_component = <AdminCustomDomainController />;
                break;
            }
            case 'company': {
                p_component = <AdminProfileController />;
                break;
            }
            case 'roster': {
                p_component = <AdminRosterController />;
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
                p_component = <AdminSponsorController subscribed={this.subscribed} />;
                break;
            }
            case 'theme': {
                p_component = <AdminThemeController />;
                break;
            }
            case 'collaborators': {
                p_component = <AdminCollaboratorController />;
                break;
            }
            case 'members': {
                p_component = <AdminMembersController />;
                break;
            }
            case 'recentmatches': {
                p_component = <AdminRecentMatchesController />;
                break;
            }
            case 'content_team': {
                p_component = <AdminContentTeamController />;
                break;
            }
            case 'about': {
                p_component = <AdminAboutController />;
                break;
            }
            case 'staff': {
                p_component = <AdminStaffController />;
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
                <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK_KEY} >
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} animation="push" width="wide" visible={this.state.isOpen} icon="labeled" vertical inverted>
                            <OrganizationAdminMenuComponentRender key={`admin_sidebar_key_${this.my_key}`} handleMainMenuClick={this.handleManageClick} dropdown={<MenuDrop handleManageClick={this.handleManageClick} classes={this.props.classes} />} fullname={full_name} image_src={this.props.uiStore.current_theme_structure.header.logo.imageData} />
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <div style={{ height: '100vh', overflowY: 'auto' }}>
                                    <OrganizationAdminPageComponentRender admin_content={p_component} handleClick={this.handleClick} />
                                </div>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </StripeProvider>
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
