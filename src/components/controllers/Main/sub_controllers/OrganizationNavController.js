import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationNavComponentRender from '../../../render_components/OrganizationNavComponentRender';

class OrganizationNavController extends Component {
    componentWillMount() {
        this.image_src = this.props.uiStore.current_theme_structure.header.logo.imageData;
    }
    render() {
        const social_links = [];
        if (this.props.uiStore.current_organisation.twitterFeedUsername) {
            social_links.push(<div className={this.props.classes.social_menu_item}>
                <i className="fa fa-twitter" />
            </div>);
        }
        if (this.props.uiStore.current_organisation.fbLink) {
            social_links.push(<div className={this.props.classes.social_menu_item}>
                <i className="fa fa-facebook" />
            </div>);
        }
        if (this.props.uiStore.current_organisation.instaLink) {
            social_links.push(<div className={this.props.classes.social_menu_item}>
                <i className="fa fa-instagram" />
            </div>);
        }
        if (this.props.uiStore.current_organisation.twitchLink) {
            social_links.push(<div className={this.props.classes.social_menu_item}>
                <i className="fa fa-twitch" />
            </div>);
        }
        return <OrganizationNavComponentRender social_links={social_links} image_src={this.image_src} />;
    }
}


OrganizationNavController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNavController));
