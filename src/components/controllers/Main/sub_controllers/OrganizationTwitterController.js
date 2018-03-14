import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { Timeline } from 'react-twitter-widgets';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationTwitterComponenRender from '../../../render_components/OrganizationTwitterComponentRender';

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
    render() {
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
