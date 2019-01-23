import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getYouTubeChannelsQuery } from '../../../../queries/youtube_channels';
// import { getOrganisationQuery } from './queries/organisation'
class OrganizationVideoController extends Component {
    state = {
        visible: false, video1_url: '', video2_url: '', video3_url: '', video4_url: ''
    };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationVideoComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationVideoComponentRender`);
        const youTubeChannels = await this.props.appManager.executeQuery('query', getYouTubeChannelsQuery, { organisationId: this.props.uiStore.current_organisation.id });
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
            // console.log(`youtube before: ${youTubeChannels.resultData.edges[0].node.youtubeVideo1} asnd youtube after ${v1}`);
            this.setState(p);
            this.setState({ visible: true, OrganizationVideoComponentRender: OrganizationVideoComponentRender.default });
        } else {
            const v1 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v2 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v3 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const v4 = this.props.appManager.convertYoutubeURL('https://www.youtube.com/watch?v=eXzSeGxjPCs');
            const p = {
                video1_url: v1,
                video2_url: v2,
                video3_url: v3,
                video4_url: v4
            };
            // console.log(`youtube before: ${youTubeChannels.resultData.edges[0].node.youtubeVideo1} asnd youtube after ${v1}`);
            this.setState(p);
            this.setState({ visible: true, OrganizationVideoComponentRender: OrganizationVideoComponentRender.default });
        }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationVideoComponentRender } = this.state;
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
