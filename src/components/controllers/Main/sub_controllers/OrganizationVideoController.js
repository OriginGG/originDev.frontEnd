import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationVideoComponentRender from '../../../render_components/OrganizationVideoComponentRender';
import { getYouTubeChannelsQuery } from '../../../../queries/youtube_channels';
// import { getOrganisationQuery } from './queries/organisation'
class OrganizationVideoController extends Component {
    state = {
        video1_url: '', video2_url: '', video3_url: '', video4_url: ''
    };
    componentWillMount = async () => {
        const youTubeChannels = await this.props.appManager.executeQuery('query', getYouTubeChannelsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        if (youTubeChannels.resultData.edges.length !== 0) {
            const v1 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo1);
            const v2 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo2);
            const v3 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo3);
            const v4 = this.props.appManager.convertYoutubeURL(youTubeChannels.resultData.edges[0].node.youtubeVideo4);
            const p = {
                video1_url: v1,
                video2_url: v2,
                video3_url: v3,
                video4_url: v4
            };
            this.setState(p);
        }
    }

    render() {
        return <OrganizationVideoComponentRender
            video1_url={this.state.video1_url}
            video2_url={this.state.video2_url}
            video3_url={this.state.video3_url}
            video4_url={this.state.video4_url}
        />;
    }
}
OrganizationVideoController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationVideoController));
