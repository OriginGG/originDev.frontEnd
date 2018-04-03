import React, { Component } from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import Modal from 'react-responsive-modal';


import PropTypes from 'prop-types';
import OrganizationPageComponentRender from '../../render_components/OrganizationPageComponentRender';
import OrganizationVideoController from './sub_controllers/OrganizationVideoController';
import OrganizationTwitterController from './sub_controllers/OrganizationTwitterController';
import OrganizationSponsorController from './sub_controllers/OrganizationSponsorController';
import OrganizationMatchesController from './sub_controllers/OrganizationMatchesController';
import OrganizationNavController from './sub_controllers/OrganizationNavController';
import OrganizationLogoController from './sub_controllers/OrganizationLogoController';
import OrganizationNewsController from './sub_controllers/OrganizationNewsController';
import { getOrganisationQuery } from '../../../queries/organisation';
import OrganizationNewsComponentRender from '../../render_components/OrganizationNewsComponentRender';
import historyStore from '../../../utils/stores/browserHistory';
import { getPagesQuery } from '../../../queries/pages';


const AboutModal = (props) => {
    return (
        <Modal
            open={props.modal_open}
            classNames={{
                transitionEnter: 'transition-enter',
                transitionEnterActive: 'transition-enter-active',
                transitionExit: 'transition-exit-active',
                transitionExitActive: 'transition-exit-active',
            }}
            animationDuration={1000}
        >
            <div style={{ width: 'calc(100vw - 680px)' }}    >
                {props.content}
            </div>
        </Modal >);
};

class OrganizationPageController extends Component {
    state = { visible: false, about_modal_open: false };

    componentWillMount = async () => {
        if (this.props.appManager.logged_in === true) {
            const domainInfo = this.props.appManager.getDomainInfo();
            const subDomain = (domainInfo.subDomain === null) ? process.env.REACT_APP_DEFAULT_THEME_NAME : domainInfo.subDomain;
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain });
            if (o.resultData === null) {
                console.log('sub domain does not exist!');
            } else {
                this.props.uiStore.setOrganisation(o.resultData);
                this.props.uiStore.setSubDomain(subDomain);
                const pages = await this.props.appManager.executeQuery('query', getPagesQuery, {
                    organisation: this.props.uiStore.current_organisation.subDomain
                });
                const { edges } = pages.allPages;
                this.bcontent = <div dangerouslySetInnerHTML={this.createMarkup(edges[0].node.pageContent)} />;
                this.about_us = edges[0].node;
                this.setState({ visible: true });
            }
        } else {
            historyStore.push('/');
        }
    }
    createMarkup = (content) => {
        return { __html: content };
    }
    handleAboutClick = () => {
        this.setState({ about_modal_open: true });
    }
    handleBlogButtonClick = () => {
        this.setState({ about_modal_open: false });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { subDomain } = this.props.uiStore.current_organisation;
        return (
            <ThemeProvider theme={this.props.uiStore.current_theme_data}>
                <div ref={(c) => { this.ref_node = c; }}>
                    <OrganizationPageComponentRender
                        newsContent={<OrganizationNewsController />}
                        twitterContent={<OrganizationTwitterController />}
                        matchesContent={<OrganizationMatchesController subDomain={subDomain} />}
                        videoContent={<OrganizationVideoController />}
                        topSponsorContent={<OrganizationSponsorController />}
                        bottomSponsorContent={<OrganizationSponsorController />}
                        navContent={<OrganizationNavController handleAboutClick={this.handleAboutClick} />}
                        logoContent={<OrganizationLogoController />}
                        footer_style={{ backgroundColor: this.props.uiStore.current_organisation.primaryColor }}

                    />
                    <AboutModal
                        modal_open={this.state.about_modal_open}
                        content={<OrganizationNewsComponentRender handleBlogButtonClick={this.handleBlogButtonClick} blog_button_text="CLOSE" blog_title={this.about_us.pageTitle} blog_content={this.bcontent} blog_media={null} />}
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
