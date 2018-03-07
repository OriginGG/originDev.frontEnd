import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { Timeline } from 'react-twitter-widgets';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OriginTwitterComponentRender from '../../../render_components/OrganizationTwitterComponentRender';

// import { getOrganisationQuery } from './queries/organisation'

const TwitterFeed = ({ feedName }) => {
    return (
        <Timeline
            dataSource={{
                sourceType: 'profile',
                screenName: feedName
            }}
            options={{
                username: feedName,
                height: '350'
            }}
            onLoad={() => console.log('Timeline is loaded!')}
        />
    );
};

class OriginTwitterController extends Component {
    render() {
        return <OriginTwitterComponentRender feed={<TwitterFeed feedName={this.props.uiStore.current_organisation.twitterFeedUsername} />} />;
    }
}


OriginTwitterController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired
};

TwitterFeed.propTypes = {
    feedName: PropTypes.string.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OriginTwitterController));
