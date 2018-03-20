import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import OrganizationAdminProfileComponentRender from '../../../render_components/OrganizationAdminProfileComponentRender';
import { updateOrganisationQuery } from '../../../../queries/organisation';

class AdminProfileController extends Component {
    state = {
        input_values: {
            insta_value: '',
            twitch_value: '',
            twitter_value: '',
            company_name_value: '',
            facebook_value: '',
            twitter_username_value: '',
            rss_value: '',
            primary_color_value: ''
        }
    };
    componentWillMount() {
        this.setState({
            input_values: {
                insta_value: this.props.uiStore.current_organisation.instaLink,
                twitter_value: this.props.uiStore.current_organisation.twitterLink,
                twitch_value: this.props.uiStore.current_organisation.twitchLink,
                company_name_value: this.props.uiStore.current_organisation.name,
                facebook_value: this.props.uiStore.current_organisation.fbLink,
                twitter_username_value: this.props.uiStore.current_organisation.twitterFeedUsername,
                rss_value: '',
                primary_color_value: this.props.uiStore.current_organisation.primaryColor
            }
        });
    }

    handleSubmit = async () => {
        await this.props.appManager.executeQuery(
            'mutation', updateOrganisationQuery,
            {
                subDomain: this.props.uiStore.current_organisation.subDomain,
                name: this.state.input_values.company_name_value,
                fbLink: this.state.input_values.facebook_value,
                twitterLink: this.state.input_values.twitter_value,
                instaLink: this.state.input_values.insta_value,
                twitterFeedUsername: this.state.input_values.twitter_username_value,
                twitchLink: this.state.input_values.twitch_value,
                primaryColor: this.state.input_values.primary_color_value
            }
        );
    }
    handleChange = (field, e) => {
        const v = e.target.value;
        const p = this.state.input_values;
        p[field] = v;
        this.setState({
            input_values: p
        });
    }
    render() {
        return (
            <OrganizationAdminProfileComponentRender
                company_name_value={this.state.input_values.company_name_value}
                logo_src={this.props.uiStore.current_theme_structure.header.logo.imageData}
                primary_color_value={this.state.input_values.primary_color_value}
                handleChange={this.handleChange}
                twitter_value={this.state.input_values.twitter_value}
                twitch_value={this.state.input_values.twitch_value}
                insta_value={this.state.input_values.insta_value}
                facebook_value={this.state.input_values.facebook_value}
                twitter_username_value={this.state.input_values.twitter_username_value}
                rss_value={this.state.input_values.rss_value}
                handleSubmit={this.handleSubmit}
            />);
    }
}

AdminProfileController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminProfileController));

