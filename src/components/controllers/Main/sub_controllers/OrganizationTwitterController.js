import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { Timeline } from 'react-twitter-widgets';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

// import { getOrganisationQuery } from './queries/organisation'

const TwitterFeed = ({ feedName }) => {
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
                height: '350'
            }}
        />
    );
};

class OrganizationTwitterController extends Component {
    state = { visible: false, OrganizationTwitterComponenRender: null };
    componentWillMount = async () => {
        // const theme = this.props.uiStore.current_theme_name;
        const theme = this.props.uiStore.current_theme_name;
        const OrganizationTwitterComponenRender = await import(`../../../render_components/${theme}_OrganizationTwitterComponentRender`);
        this.setState({ visible: true, OrganizationTwitterComponenRender: OrganizationTwitterComponenRender.default });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTwitterComponenRender } = this.state;
        return <OrganizationTwitterComponenRender feed={<TwitterFeed feedName={this.props.uiStore.current_organisation.twitterFeedUsername} />} />;
    }
}


OrganizationTwitterController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired
};

TwitterFeed.propTypes = {
    feedName: PropTypes.string.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTwitterController));
