import React, { Component } from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import { slide as Menu } from 'react-burger-menu';
import { Modal } from 'antd';
import Favicon from 'react-favicon';
import { isMobile } from 'react-device-detect';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { getOrganisationQuery } from '../../../queries/organisation';
import historyStore from '../../../utils/stores/browserHistory';
import { getPagesQuery } from '../../../queries/pages';


const AboutModal = (props) => {
    return (
        <Modal
            width="max-content"
            closable={false}
            footer={null}
            visible={props.modal_open}
            animationDuration={1000}
        >
            <div style={{ display: 'block' }}>
                {props.content}
            </div>
        </Modal >);
};

class OrganizationPageController extends Component {
    state = {
        menu_open: false,
        OrganizationPageComponentRender: null,
        OrganizationVideoController: null,
        OrganizationTwitterController: null,
        OrganizationSponsorController: null,
        OrganizationMatchesController: null,
        OrganizationNavController: null,
        OrganizationLogoController: null,
        OrganizationNewsController: null,
        OrganizationRosterController: null,
        OrganizationMobileMenuComponentRender: null,
        visible: false,
        about_modal_open: false,
        display_rosters: false
    };

    componentWillMount = async () => {
        this.current_roster_id = -1;
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_ORGANISATION_NAME : domainInfo.subDomain;
        if (subDomain === 'origin') {
            historyStore.push('/signup');
        } else {
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            if (o.resultData === null) {
                historyStore.push('/');
            } else {
                this.props.uiStore.setOrganisation(o.resultData);
                this.props.uiStore.setSubDomain(subDomain);
                const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
                const OrganizationPageComponentRender = await import(`../../render_components/themes/${theme}/OrganizationPageComponentRender`);
                const OrganizationMobileMenuComponentRender = await import(`../../render_components/themes/${theme}/OrganizationMobileMenuComponentRender`);
                const OrganizationVideoController = await import('./sub_controllers/OrganizationVideoController');
                const OrganizationTwitterController = await import('./sub_controllers/OrganizationTwitterController');
                const OrganizationSponsorController = await import('./sub_controllers/OrganizationSponsorController');
                const OrganizationMatchesController = await import('./sub_controllers/OrganizationMatchesController');
                const OrganizationNavController = await import('./sub_controllers/OrganizationNavController');
                const OrganizationLogoController = await import('./sub_controllers/OrganizationLogoController');
                const OrganizationNewsController = await import('./sub_controllers/OrganizationNewsController');
                const OrganizationAboutModalComponentRender = await import(`../../render_components/themes/${theme}/OrganizationAboutModalComponentRender`);
                const OrganizationRosterController = await import('./sub_controllers/OrganizationRosterController');

                const pages = await this.props.appManager.executeQuery('query', getPagesQuery, {
                    organisation: this.props.uiStore.current_organisation.subDomain
                });
                const { edges } = pages.allPages;
                this.bcontent = <div dangerouslySetInnerHTML={this.createMarkup(edges[0].node.pageContent)} />;
                this.about_us = edges[0].node;
                this.store_display = false;
                if (this.props.uiStore.current_organisation.companyStoreLink) {
                    this.store_display = true;
                }
                this.setState({
                    visible: true,
                    OrganizationMobileMenuComponentRender: OrganizationMobileMenuComponentRender.default,
                    OrganizationPageComponentRender: OrganizationPageComponentRender.default,
                    OrganizationVideoController: OrganizationVideoController.default,
                    OrganizationTwitterController: OrganizationTwitterController.default,
                    OrganizationSponsorController: OrganizationSponsorController.default,
                    OrganizationMatchesController: OrganizationMatchesController.default,
                    OrganizationNavController: OrganizationNavController.default,
                    OrganizationLogoController: OrganizationLogoController.default,
                    OrganizationNewsController: OrganizationNewsController.default,
                    OrganizationRosterController: OrganizationRosterController.default,
                    OrganizationAboutModalComponentRender: OrganizationAboutModalComponentRender.default
                });
            }
        }
        // } else {
        //     historyStore.push('/');
        // }
    }

    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    toggleMenu = () => {
        const f = this.state.menu_open;
        this.setState({ menu_open: !f });
    }
    isMobile = () => {
        // return true;
        return isMobile;
    }

    createMarkup = (content) => {
        return { __html: content };
    }
    handleAboutClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        this.setState({ about_modal_open: true });
    }
    handleStoreClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        if (this.props.uiStore.current_organisation.companyStoreLink) {
            window.open(this.props.uiStore.current_organisation.companyStoreLink, '_blank');
        }
    }
    handleLoginClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        historyStore.push('/signup');
    }
    isMenuOpen = (state) => {
        this.setState({ menu_open: state.isOpen });
    }
    closeModal = () => {
        this.setState({ about_modal_open: false });
    }

    handleSocial = (t) => {
        switch (t) {
            case 'fb': {
                if (this.props.uiStore.current_organisation.fbLink) {
                    window.open(this.props.uiStore.current_organisation.fbLink, '_blank');
                }
                break;
            }
            case 'twitter': {
                if (this.props.uiStore.current_organisation.twitterFeedUsername) {
                    const p_string = `https://twitter.com/${this.props.uiStore.current_organisation.twitterFeedUsername}`;
                    window.open(p_string, '_blank');
                }
                break;
            }
            case 'youtube': {
                if (this.props.uiStore.current_organisation.youtubeLink) {
                    window.open(this.props.uiStore.current_organisation.youtubeLink, '_blank');
                }
                break;
            }
            default:
                break;
        }
    }
    handleRosterClick = (r) => {
        this.current_roster_id = r;
        this.setState({ display_rosters: true });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'none' };
        if (this.about_us.pageTitle) {
            s = { display: 'inherit' };
        }
        let ss = { display: 'none' };
        if (this.store_display) {
            ss = { display: 'inherit' };
        }

        const { subDomain } = this.props.uiStore.current_organisation;
        const { OrganizationPageComponentRender } = this.state;
        const { OrganizationNewsController } = this.state;
        const { OrganizationTwitterController } = this.state;
        const { OrganizationMatchesController } = this.state;
        const { OrganizationVideoController } = this.state;
        const { OrganizationSponsorController } = this.state;
        const { OrganizationNavController } = this.state;
        const { OrganizationLogoController } = this.state;
        const { OrganizationAboutModalComponentRender } = this.state;
        const { OrganizationMobileMenuComponentRender } = this.state;
        const { OrganizationRosterController } = this.state;

        // let ml = -200;
        let SideBar = <div />;
        let nv_content = <OrganizationNavController
            store_style={ss}
            about_style={s}
            home_style={{ display: 'inherit' }}
            login_style={{ display: 'inherit' }}
            handleStoreClick={this.handleStoreClick}
            handleLoginClick={this.handleLoginClick}
            handleAboutClick={this.handleAboutClick} />;
        if (this.isMobile()) {
            SideBar =
                <Menu
                    pageWrapId="page-wrap"
                    outerContainerId="outer-container"
                    isOpen={this.state.menu_open}
                    onStateChange={this.isMenuOpen}
                    width="100%"
                    height="100%"
                    right
                ><div id="page-wrap">
                        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                            <OrganizationMobileMenuComponentRender
                                handleSocial={this.handleSocial}
                                handleStoreClick={this.handleStoreClick}
                                handleLoginClick={this.handleLoginClick}
                                handleAboutClick={this.handleAboutClick} />
                        </div>
                    </div></Menu>;
            nv_content = <span />;
        }
        const theme = this.props.uiStore.current_organisation.themeId;
        const cp = `© ${this.props.uiStore.current_organisation.name}. All rights reserved.`;
        let c_name = `${theme}_gradient_bg`;
        let disp = <OrganizationPageComponentRender
            copyright={cp}
            newsContent={<OrganizationNewsController />}
            twitterContent={<OrganizationTwitterController />}
            matchesContent={<OrganizationMatchesController subDomain={subDomain} />}
            videoContent={<OrganizationVideoController />}
            rosterContent={<span />}
            topSponsorContent={<OrganizationSponsorController />}
            bottomSponsorContent={<OrganizationSponsorController />}
            navContent={nv_content}
            logoContent={<OrganizationLogoController handleRosterClick={this.handleRosterClick} />}
            footer_style={{ backgroundColor: this.props.uiStore.current_organisation.primaryColor }}
        />;
        if (this.state.display_rosters) {
            c_name = 'blackBG';
            disp = <OrganizationPageComponentRender
                copyright={cp}
                rosterContent={<OrganizationRosterController roster_id={this.current_roster_id} />}
                newsContent={<span />}
                twitterContent={<span />}
                matchesContent={<span />}
                videoContent={<span />}
                topSponsorContent={<OrganizationSponsorController />}
                bottomSponsorContent={<span />}
                navContent={<span />}
                logoContent={<span />}
                footer_style={{ backgroundColor: this.props.uiStore.current_organisation.primaryColor }}
            />;
        }


        return (
            <ThemeProvider theme={this.props.uiStore.current_theme_data}>
                <DocumentTitle title={this.props.uiStore.current_organisation.name}>
                    <div id="outer-container" ref={(c) => { this.ref_node = c; }}>
                        <Favicon url={this.props.uiStore.current_theme_structure.header.logo.imageData} />
                        {SideBar}
                        <div className={c_name} >
                            {disp}
                            <AboutModal
                                modal_open={this.state.about_modal_open}
                                content={<OrganizationAboutModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_button_text="CLOSE" about_title={this.about_us.pageTitle} about_content={this.bcontent} />}
                            />
                        </div>
                    </div>
                </DocumentTitle>
            </ThemeProvider>
        );
    }
}
OrganizationPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

AboutModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationPageController));
