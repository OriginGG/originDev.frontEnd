import React, { Component } from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import { Modal } from 'antd';

import PropTypes from 'prop-types';
import { getOrganisationQuery } from '../../../queries/organisation';
import historyStore from '../../../utils/stores/browserHistory';
import { getPagesQuery } from '../../../queries/pages';
import { getYouTubeChannelsCountquery } from '../../../queries/youtube_channels';
import { getBlogsCountQuery } from '../../../queries/blogs';


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
        OrganizationPageComponentRender: null,
        OrganizationVideoController: null,
        OrganizationTwitterController: null,
        OrganizationSponsorController: null,
        OrganizationMatchesController: null,
        OrganizationNavController: null,
        OrganizationLogoController: null,
        OrganizationNewsController: null,
        visible: false,
        about_modal_open: false
    };

    componentWillMount = async () => {
        const domainInfo = this.props.appManager.getDomainInfo();
        const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
        if (subDomain === 'origin') {
            historyStore.push('/signup');
        } else {
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            if (o.resultData === null) {
                historyStore.push('/');
            } else {
                this.props.uiStore.setOrganisation(o.resultData);
                this.props.uiStore.setSubDomain(subDomain);
                const theme = this.props.uiStore.current_organisation.themeId;
                const OrganizationPageComponentRender = await import(`../../render_components/themes/${theme}_theme/${theme}_OrganizationPageComponentRender`);
                const OrganizationVideoController = await import('./sub_controllers/OrganizationVideoController');
                const OrganizationTwitterController = await import('./sub_controllers/OrganizationTwitterController');
                const OrganizationSponsorController = await import('./sub_controllers/OrganizationSponsorController');
                const OrganizationMatchesController = await import('./sub_controllers/OrganizationMatchesController');
                const OrganizationNavController = await import('./sub_controllers/OrganizationNavController');
                const OrganizationLogoController = await import('./sub_controllers/OrganizationLogoController');
                const OrganizationNewsController = await import('./sub_controllers/OrganizationNewsController');
                const OrganizationAboutModalComponentRender = await import(`../../render_components/themes/${theme}_theme/${theme}_OrganizationAboutModalComponentRender`);
                const pages = await this.props.appManager.executeQuery('query', getPagesQuery, {
                    organisation: this.props.uiStore.current_organisation.subDomain
                });
                const { edges } = pages.allPages;
                this.bcontent = <div dangerouslySetInnerHTML={this.createMarkup(edges[0].node.pageContent)} />;
                this.about_us = edges[0].node;
                this.video_display = false;
                this.news_display = false;
                const youTubeChannels = await this.props.appManager.executeQuery('query', getYouTubeChannelsCountquery, { subDomain: this.props.uiStore.current_organisation.subDomain });
                if (youTubeChannels.resultData.totalCount !== 0) {
                    this.video_display = true;
                }
                const blogs = await this.props.appManager.executeQuery('query', getBlogsCountQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
                if (blogs.resultData.totalCount !== 0) {
                    this.news_display = true;
                }
                this.setState({
                    visible: true,
                    OrganizationPageComponentRender: OrganizationPageComponentRender.default,
                    OrganizationVideoController: OrganizationVideoController.default,
                    OrganizationTwitterController: OrganizationTwitterController.default,
                    OrganizationSponsorController: OrganizationSponsorController.default,
                    OrganizationMatchesController: OrganizationMatchesController.default,
                    OrganizationNavController: OrganizationNavController.default,
                    OrganizationLogoController: OrganizationLogoController.default,
                    OrganizationNewsController: OrganizationNewsController.default,
                    OrganizationAboutModalComponentRender: OrganizationAboutModalComponentRender.default
                });
            }
        }
        // } else {
        //     historyStore.push('/');
        // }
    }
    createMarkup = (content) => {
        return { __html: content };
    }
    handleAboutClick = () => {
        this.setState({ about_modal_open: true });
    }
    closeModal = () => {
        this.setState({ about_modal_open: false });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'none' };
        if (this.about_us.pageTitle) {
            s = { display: 'inherit' };
        }
        let vs = { display: 'none' };
        if (this.video_display) {
            vs = { display: 'inherit' };
        }
        let ns = { display: 'none' };
        if (this.news_display) {
            ns = { display: 'inherit' };
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
        return (
            <ThemeProvider theme={this.props.uiStore.current_theme_data}>
                <div ref={(c) => { this.ref_node = c; }}>
                    <OrganizationPageComponentRender
                        theme="light"
                        newsContent={<OrganizationNewsController theme="light" />}
                        twitterContent={<OrganizationTwitterController theme="light" />}
                        matchesContent={<OrganizationMatchesController theme="light" subDomain={subDomain} />}
                        videoContent={<OrganizationVideoController theme="light" />}
                        topSponsorContent={<OrganizationSponsorController theme="light" />}
                        bottomSponsorContent={<OrganizationSponsorController theme="light" />}
                        navContent={<OrganizationNavController news_style={ns} video_style={vs} about_style={s} theme="light" handleAboutClick={this.handleAboutClick} />}
                        logoContent={<OrganizationLogoController roster_games={<span />} theme="light" />}
                        footer_style={{ backgroundColor: this.props.uiStore.current_organisation.primaryColor }}
                    />
                    <AboutModal
                        modal_open={this.state.about_modal_open}
                        content={<OrganizationAboutModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_button_text="CLOSE" about_title={this.about_us.pageTitle} about_content={this.bcontent}  />}
                    />
                </div>
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
