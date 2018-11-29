import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { Timeline } from 'react-twitter-widgets';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

// import { getOrganisationQuery } from './queries/organisation'

const TwitterFeed = ({ feedName, theme }) => {
    if (!feedName) {
        return null;
    }
    return (
        <Timeline
            dataSource={{
                sourceType: 'profile',
                screenName: feedName
            }}
            options={{
                theme,
                height: '578',
                chrome: 'noborders noscrollbar nofooter'
            }}
        />
    );
};

class OrganizationTwitterController extends Component {
    state = { visible: false, OrganizationTwitterComponenRender: null };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        const OrganizationTwitterComponenRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitterComponentRender`);
        // if (this.props.uiStore.current_organisation.twitterFeedUsername) {
            this.setState({ visible: true, OrganizationTwitterComponenRender: OrganizationTwitterComponenRender.default });
        // }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let twitter_name = this.props.uiStore.current_organisation.twitterFeedUsername;

        if (!twitter_name) {
            twitter_name = 'or1g1n_gg';
        }
        const { OrganizationTwitterComponenRender } = this.state;
        return <OrganizationTwitterComponenRender feed={<TwitterFeed theme={this.props.uiStore.current_organisation.themeId} feedName={twitter_name} />} />;
    }
}


OrganizationTwitterController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired
};

TwitterFeed.propTypes = {
    feedName: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTwitterController));
