import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import { Timeline } from 'react-twitter-widgets';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
// import { GlobalStyles } from 'Theme/Theme';

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
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }

        const OrganizationTwitterComponenRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationTwitterComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        // if (this.props.uiStore.current_organisation.twitterFeedUsername) {
            this.setState({ visible: true, OrganizationTwitterComponenRender });
        // }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
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


export default inject('uiStore', 'appManager')(OrganizationTwitterController);
