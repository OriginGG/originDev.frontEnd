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
    componentWillMount = async () => {
        const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationTwitterComponenRender = await import(`../../../render_components/themes/${theme}_theme/${theme}_OrganizationTwitterComponentRender`);
        if (this.props.uiStore.current_organisation.twitterFeedUsername) {
            this.setState({ visible: true, OrganizationTwitterComponenRender: OrganizationTwitterComponenRender.default });
        }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTwitterComponenRender } = this.state;
        return <OrganizationTwitterComponenRender feed={<TwitterFeed theme={this.props.uiStore.current_organisation.themeId} feedName={this.props.uiStore.current_organisation.twitterFeedUsername} />} />;
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
