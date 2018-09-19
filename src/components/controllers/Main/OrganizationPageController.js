import React, { Component } from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { slide as Menu } from 'react-burger-menu';
import { GlobalStyles } from 'Theme/Theme';
import Favicon from 'react-favicon';
import { isMobile } from 'react-device-detect';
import DocumentTitle from 'react-document-title';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getOrganisationQuery } from '../../../queries/organisation';
import historyStore from '../../../utils/stores/browserHistory';
import { getPagesQuery } from '../../../queries/pages';
import { getRosterQuery } from '../../../queries/rosters';
import { getSponsorsQuery } from '../../../queries/sponsors';
import { getIndividualUserByEmailQuery } from '../../../queries/individuals';
import { createOrganisationMemberQuery, getOrganisationMemberByIDQuery } from '../../../queries/members';

// import { getStaffQuery } from '../../../queries/staff';
import { gameOptions } from '../Admin/sub_controllers/data/AllGames';


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
        OrganizationSponserListController: null,
        OrganizationStaffController: null,
        OrganizationMobileMenuComponentRender: null,
        OrganizationBlogController: null,
        OrganizationTwitchController: null,
        // OrganizationMobileSubMenuComponentRender: null,
        visible: false,
        display_rosters: false,
        display_staff: false,
        roster_style: { display: 'none' }
    };

    componentDidMount = async () => {
        const token = this.props.appManager.GetQueryParams('ipl');
        this.invite_details = null;
        console.log(token);
        if (token) {
            const d = JSON.parse(Buffer.from(token, 'hex').toString('utf8'));
            const { email } = d;
            const user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, {
                email
            });
            const exists = await this.props.appManager.executeQuery('query', getOrganisationMemberByIDQuery, {
                id: user.individualUserByEmail.id
            });
            if (exists.allOrganisationMembers.edges.length > 0) {
                toast.error(`${user.individualUserByEmail.username} has already been made a member of this organization!`, {
                    autoClose: false
                });
            } else {
                console.log(exists);
                await this.props.appManager.executeQuery('mutation', createOrganisationMemberQuery, {
                    subDomain: d.organisation,
                    userId: user.individualUserByEmail.id
                });
                this.invite_details = user.individualUserByEmail;
            }
        }
        this.current_roster_id = -1;
        const domainToken = await this.props.appManager.getDomainToken();
        if (domainToken && domainToken.token) {
            this.props.appManager.serveDomain = domainToken.host;
        }
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
                const themeBase = this.props.uiStore.current_organisation.themeBaseId;
                const OrganizationPageComponentRender = await import(`../../render_components/themes/${theme}/OrganizationPageComponentRender`);
                const OrganizationMobileMenuComponentRender = await import(`../../render_components/themes/${theme}/OrganizationMobileMenuComponentRender`);
                const OrganizationVideoController = await import('./sub_controllers/OrganizationVideoController');
                const OrganizationTwitterController = await import('./sub_controllers/OrganizationTwitterController');
                const OrganizationSponsorController = await import('./sub_controllers/OrganizationSponsorController');
                const OrganizationMatchesController = await import('./sub_controllers/OrganizationMatchesController');
                const OrganizationNavController = await import('./sub_controllers/OrganizationNavController');
                const OrganizationLogoController = await import('./sub_controllers/OrganizationLogoController');
                const OrganizationNewsController = await import('./sub_controllers/OrganizationNewsController');
                const OrganizationRosterController = await import('./sub_controllers/OrganizationRosterController');
                const OrganizationSponserListController = await import('./sub_controllers/OrganizationSponserListController');
                const OrganizationBlogListController = await import('./sub_controllers/OrganizationBlogListController');
                const OrganizationBlogViewController = await import('./sub_controllers/OrganizationBlogViewController');
                const OrganizationStaffController = await import('./sub_controllers/OrganizationStaffController');
                let OrganizationBlogController = null;
                let OrganizationBlogControllerDefault = null;
                let OrganizationTwitchController = null;
                let OrganizationTwitchControllerDefault = null;
                if (themeBase === 'obliviot') {
                    OrganizationBlogController = await import('./sub_controllers/OrganizationBlogController');
                    OrganizationBlogControllerDefault = OrganizationBlogController.default;
                    OrganizationTwitchController = await import('./sub_controllers/OrganizationTwitchController');
                    OrganizationTwitchControllerDefault = OrganizationTwitchController.default;
                    // OrganizationTwitchController = null;
                    // OrganizationTwitchControllerDefault = null;
                }
                this.roster_display = false;
                if (this.isMobile()) {
                    const org_roster_sub = await import(`../../render_components/themes/${theme}/OrganizationMobileSubMenuComponentRender`);
                    const OrganizationMobileSubMenuComponentRender = org_roster_sub.default;
                    const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
                    this.mobile_roster_data = [];
                    roster_data.allRosters.edges.forEach((r) => {
                        this.roster_display = true;
                        const { gameId } = r.node;
                        const currGame = _.find(gameOptions, (or) => {          // eslint-disable-line
                            return or.game_id === gameId;
                        });
                        this.mobile_roster_data.push(<div onClick={() => { this.handleRosterClick(r.node.id); }} role="menuItem" tabIndex={-1} key={`mobile_roster_${r.node.id}`}><OrganizationMobileSubMenuComponentRender name={currGame.text} /></div>);
                    });
                }


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
                this.sponser_display = false;
                const sponsor_data = await this.props.appManager.executeQuery('query', getSponsorsQuery, { subDomain });
                const { nodes } = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation;
                nodes.forEach(n => {
                    if (n.description && n.description.length > 1) {
                        this.sponser_display = true;
                    }
                });
                // this.sponsor_desc1 = sponsor_data.resultData.edges[0].node.sponsorDesc1;
                // this.sponsor_desc2 = sponsor_data.resultData.edges[0].node.sponsorDesc2;
                // this.sponsor_desc3 = sponsor_data.resultData.edges[0].node.sponsorDesc3;
                // this.sponsor_desc4 = sponsor_data.resultData.edges[0].node.sponsorDesc4;
                // this.sponser_display = true;

                // if ((this.sponsor_desc1 && this.sponsor_desc1.length < 1) && (this.sponsor_desc2 && this.sponsor_desc2.length < 1) && (this.sponsor_desc3 && this.sponsor_desc3.length < 1) && (this.sponsor_desc4 && this.sponsor_desc4.length < 1)) {
                //     this.sponser_display = false;
                // }
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
                    OrganizationSponserListController: OrganizationSponserListController.default,
                    OrganizationBlogListController: OrganizationBlogListController.default,
                    OrganizationBlogViewController: OrganizationBlogViewController.default,
                    OrganizationStaffController: OrganizationStaffController.default,
                    OrganizationBlogController: OrganizationBlogControllerDefault,
                    OrganizationTwitchController: OrganizationTwitchControllerDefault,
                    // OrganizationMobileSubMenuComponentRender: OrganizationMobileSubMenuComponentRender.default
                });
                if (this.invite_details) {
                    toast.success(`${this.invite_details.username} has been successfully invited`, {
                        autoClose: false
                    });
                }
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
    handleSponsersClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        /* this.setState({ about_modal_open: true }); */
        this.setState({ roster_style: { display: 'table', width: '100%', height: '100vh' }, display_sponsers: true });
    }
    handleBlogClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        /* this.setState({ about_modal_open: true }); */
        this.setState({ roster_style: { display: 'table', width: '100%', height: '100vh' }, display_blogs: true });
    }
    handleViewBlogClick = () => {
        console.log('view more blogs clicked');
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        /* this.setState({ about_modal_open: true }); */
        this.setState({ roster_style: { display: 'table', width: '100%', height: '100vh' }, display_blogs: true });
    }
    handleAboutClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        /* this.setState({ about_modal_open: true }); */
        this.setState({ roster_style: { display: 'table', width: '100%', height: '100vh' }, display_staff: true });
    }
    handleStoreClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        if (this.props.uiStore.current_organisation.companyStoreLink) {
            window.open(this.props.uiStore.current_organisation.companyStoreLink, '_blank');
        }
    }
    handleNewsClick = (blog) => {
        this.setState({ roster_style: { display: 'none' }, display_blogs: false });
        console.log(`blog = ${JSON.stringify(blog)}`);
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        /* this.setState({ about_modal_open: true }); */
        const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blog.node.blogContent)} />;
        this.setState({
            roster_style: { display: 'table', width: '100%', height: '100vh' }, display_blog_view: true, b_media: blog.node.blogMedia, b_content: bcontent
        });
    }
    inIframe = () => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }
    handleLoginClick = () => {
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        if (this.inIframe()) {
            parent.postMessage({ command: 'link', id: 'login' }, "*");           // eslint-disable-line
        } else {
            historyStore.push('/signup_org');
        }
    }
    isMenuOpen = (state) => {
        this.setState({ menu_open: state.isOpen });
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
        if (this.isMobile() && this.state.menu_open) {
            this.setState({ menu_open: false });
        }
        this.current_roster_id = r;
        this.setState({ roster_style: { display: 'table', width: '100%', height: '100vh' }, display_rosters: true });
    }
    closeRosters = () => {
        this.setState({ roster_style: { display: 'none' }, display_rosters: false });
    }
    closeSponsers = () => {
        this.setState({ roster_style: { display: 'none' }, display_sponsers: false });
    }
    closeBlogs = () => {
        this.setState({ roster_style: { display: 'none' }, display_blogs: false });
    }
    closeBlogView = () => {
        this.setState({ roster_style: { display: 'none' }, display_blog_view: false });
    }
    closeStaff = () => {
        this.setState({ roster_style: { display: 'none' }, display_staff: false });
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
        let sss = { display: 'none' };
        if (this.sponser_display) {
            sss = { display: 'inherit' };
        }

        let ssss = { display: 'none' };
        if (this.roster_display && this.isMobile()) {
            ssss = { display: 'inherit' };
        }

        const ob_inherit = { display: 'inherit' };
        const ob_none = { display: 'none' };

        const ob_light = { backgroundColor: '#fff' };
        const ob_dark = { backgroundColor: '#000', height: '100%' };

        // const { OrganizationMobileSubMenuComponentRender } = this.state;
        const { subDomain } = this.props.uiStore.current_organisation;
        const { OrganizationPageComponentRender } = this.state;
        const { OrganizationNewsController } = this.state;
        const { OrganizationTwitterController } = this.state;
        const { OrganizationMatchesController } = this.state;
        const { OrganizationVideoController } = this.state;
        const { OrganizationSponsorController } = this.state;
        const { OrganizationNavController } = this.state;
        const { OrganizationLogoController } = this.state;
        const { OrganizationMobileMenuComponentRender } = this.state;
        const { OrganizationRosterController } = this.state;
        const { OrganizationSponserListController } = this.state;
        const { OrganizationBlogListController } = this.state;
        const { OrganizationBlogViewController } = this.state;
        const { OrganizationStaffController } = this.state;
        const { OrganizationBlogController } = this.state;
        const { OrganizationTwitchController } = this.state;

        let rosterComponent = <span />;
        if (this.isMobile()) {
            rosterComponent = this.mobile_roster_data;
        }

        // let ml = -200;
        let SideBar = <div />;
        let nv_content = <OrganizationNavController
            store_style={ss}
            about_style={s}
            sponsers_style={sss}
            home_style={{ display: 'inherit' }}
            login_style={{ display: 'inherit' }}
            handleStoreClick={this.handleStoreClick}
            handleBlogClick={this.handleBlogClick}
            handleLoginClick={this.handleLoginClick}
            handleRosterClick={this.handleRosterClick}
            handleSponsersClick={this.handleSponsersClick}
            handleAboutClick={this.handleAboutClick} />;
        if (this.isMobile() && this.state.display_rosters === false) {
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
                                rosterContent={rosterComponent}
                                mobile_roster_item={ssss}
                                handleSocial={this.handleSocial}
                                handleStoreClick={this.handleStoreClick}
                                handleLoginClick={this.handleLoginClick}
                                handleSponsersClick={this.handleSponsersClick}
                                handleAboutClick={this.handleAboutClick} />
                        </div>
                    </div></Menu>;
            nv_content = <span />;
        }
        const theme = this.props.uiStore.current_organisation.themeId;
        const real_theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const cp = `© ${this.props.uiStore.current_organisation.name}. All rights reserved.`;
        let c_name = `${theme}_gradient_bg`;
        let disp = <OrganizationPageComponentRender
            roster_style={this.state.roster_style}
            copyright={cp}
            newsContent={<OrganizationNewsController handleNewsClick={this.handleNewsClick} />}
            blogContent={<OrganizationBlogController handleNewsClick={this.handleNewsClick} />}
            twitchContent={<OrganizationTwitchController />}
            twitterContent={<OrganizationTwitterController />}
            matchesContent={<OrganizationMatchesController subDomain={subDomain} />}
            videoContent={<OrganizationVideoController />}
            rosterContent={<span />}
            handleViewBlogClick={this.handleViewBlogClick}
            obliviot_hidden_style={ob_inherit}
            obliviot_page_style={ob_light}
            topSponsorContent={<OrganizationSponsorController />}
            bottomSponsorContent={<OrganizationSponsorController />}
            navContent={nv_content}
            logoContent={<OrganizationLogoController handleRosterClick={this.handleRosterClick} />}
            footer_style={{ backgroundColor: this.props.uiStore.current_organisation.primaryColor }}
        />;
        if (this.state.display_rosters) {
            console.log(`real_theme = ${real_theme}`);
            if (real_theme === 'enigma/light') {
                c_name = 'lightBG';
            } else {
                c_name = 'blackBG';
            }
            disp = <OrganizationPageComponentRender
                roster_style={this.state.roster_style}
                copyright={cp}
                obliviot_hidden_style={ob_none}
                obliviot_page_style={ob_dark}
                rosterContent={<OrganizationRosterController closeRosters={this.closeRosters} roster_id={this.current_roster_id} />}
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

        if (this.state.display_blog_view) {
            console.log(`real_theme = ${real_theme}`);
            if (real_theme === 'enigma/light') {
                c_name = 'lightBG';
            } else {
                c_name = 'blackBG';
            }
            disp = <OrganizationPageComponentRender
                roster_style={this.state.roster_style}
                copyright={cp}
                obliviot_hidden_style={ob_none}
                obliviot_page_style={ob_dark}
                rosterContent={<OrganizationBlogViewController closeBlogView={this.closeBlogView} roster_id={this.current_roster_id} blog_media={this.state.b_media} blog_content={this.state.b_content} />}
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

        if (this.state.display_sponsers) {
            console.log(`real_theme = ${real_theme}`);
            if (real_theme === 'enigma/light') {
                c_name = 'lightBG';
            } else {
                c_name = 'blackBG';
            }
            disp = <OrganizationPageComponentRender
                roster_style={this.state.roster_style}
                copyright={cp}
                obliviot_hidden_style={ob_none}
                obliviot_page_style={ob_dark}
                rosterContent={<OrganizationSponserListController closeSponsers={this.closeSponsers} roster_id={this.current_roster_id} />}
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

        if (this.state.display_blogs) {
            console.log(`real_theme = ${real_theme}`);
            if (real_theme === 'enigma/light') {
                c_name = 'lightBG';
            } else {
                c_name = 'blackBG';
            }
            disp = <OrganizationPageComponentRender
                roster_style={this.state.roster_style}
                copyright={cp}
                obliviot_hidden_style={ob_none}
                obliviot_page_style={ob_dark}
                rosterContent={<OrganizationBlogListController closeBlogs={this.closeBlogs} roster_id={this.current_roster_id} handleNewsClick={this.handleNewsClick} />}
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

        if (this.state.display_staff) {
            console.log(`real_theme = ${real_theme}`);
            if (real_theme === 'enigma/light') {
                c_name = 'lightBG';
            } else {
                c_name = 'blackBG';
            }
            disp = <OrganizationPageComponentRender
                roster_style={this.state.roster_style}
                copyright={cp}
                obliviot_hidden_style={ob_none}
                obliviot_page_style={ob_dark}
                rosterContent={<OrganizationStaffController about_title={this.about_us.pageTitle} about_content={this.bcontent} closeStaff={this.closeStaff} />}
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

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationPageController));
