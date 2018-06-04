import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationNavController extends Component {
    state = { visible: false, OrganizationNavComponentRender: null };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationNavComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNavComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.header.logo.imageData;
        this.setState({ visible: true, OrganizationNavComponentRender: OrganizationNavComponentRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    handleBlogButtonClick = () => {
    }
    openPage = page => {
        window.open(page, '_blank');
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationNavComponentRender } = this.state;
        const social_links = [];
        if (this.props.uiStore.current_organisation.twitterFeedUsername) {
            social_links.push(<i
                key="social_item1"
                role="menuItem"
                tabIndex={-1}
                onClick={() => {
                    const p_string = `https://twitter.com/${this.props.uiStore.current_organisation.twitterFeedUsername}`;
                    this.openPage(p_string);
                }}
                className="fa fa-twitter" />);
        }
        if (this.props.uiStore.current_organisation.fbLink) {
            social_links.push(<i key="social_item2" role="menuItem" tabIndex={-1} onClick={() => { this.openPage(this.props.uiStore.current_organisation.fbLink); }} className="fa fa-facebook" />);
        }
        if (this.props.uiStore.current_organisation.instaLink) {
            social_links.push(<i key="social_item3" role="menuItem" tabIndex={-1} onClick={() => { this.openPage(this.props.uiStore.current_organisation.instaLink); }} className="fa fa-instagram" />);
        }
        if (this.props.uiStore.current_organisation.twitchLink) {
            social_links.push(<i key="social_item4" role="menuItem" tabIndex={-1} onClick={() => { this.openPage(this.props.uiStore.current_organisation.twitchLink); }} className="fa fa-twitch" />);
        }
        if (this.props.uiStore.current_organisation.youtubeLink) {
            social_links.push(<i key="social_item5" role="menuItem" tabIndex={-1} onClick={() => { this.openPage(this.props.uiStore.current_organisation.youtubeLink); }} className="fa fa-youtube" />);
        }
        let social_link1 = <span />;
        let social_link2 = <span />;
        let social_link3 = <span />;
        let social_link4 = <span />;
        let social_link5 = <span />;

        if (social_links.length > 4) {
            social_link5 = social_links[4];          // eslint-disable-line
        }
        if (social_links.length > 3) {
            social_link4 = social_links[3];           // eslint-disable-line
        }
        if (social_links.length > 2) {
            social_link3 = social_links[2];           // eslint-disable-line
        }
        if (social_links.length > 1) {
            social_link2 = social_links[1];           // eslint-disable-line
        }
        if (social_links.length > 0) {
            social_link1 = social_links[0];           // eslint-disable-line
        }

        return <OrganizationNavComponentRender
            login_style={this.props.login_style}
            home_style={this.props.home_style}
            store_style={this.props.store_style}
            about_style={this.props.about_style}
            handleBlogButtonClick={this.handleBlogButtonClick}
            handleStoreClick={this.props.handleStoreClick}
            handleAboutClick={this.props.handleAboutClick}
            handleLoginClick={this.props.handleLoginClick}
            social_link1={social_link1}
            social_link2={social_link2}
            social_link3={social_link3}
            social_link4={social_link4}
            social_link5={social_link5}
            image_src={this.image_src} />;
    }
}


OrganizationNavController.propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
    handleStoreClick: PropTypes.func.isRequired,
    handleLoginClick: PropTypes.func.isRequired,
    uiStore: PropTypes.object.isRequired,
    about_style: PropTypes.object.isRequired,
    store_style: PropTypes.object.isRequired,
    home_style: PropTypes.object.isRequired,
    login_style: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNavController));
