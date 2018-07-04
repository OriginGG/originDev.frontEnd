import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import OrganizationAdminMediaComponentRender from '../../../render_components/admin/OrganizationAdminMediaComponentRender';
import { getYouTubeChannelsQuery, updateYouTubeChannelQuery, createYouTubeChannelQuery } from '../../../../queries/youtube_channels';

class AdminMediaController extends Component {
    state = {
        input_values: {
            link1_value: '',
            link2_value: '',
            link3_value: '',
            link4_value: '',
        }
    };
    componentDidMount = async () => {
        this.create = false;
        const youTubeChannels = await this.props.appManager.executeQueryAuth('query', getYouTubeChannelsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        if (youTubeChannels.resultData.edges.length === 0) {
            this.create = true;
        } else {
            this.c_id = youTubeChannels.resultData.edges[0].node.id;
            this.setState({
                input_values: {
                    link1_value: youTubeChannels.resultData.edges[0].node.youtubeVideo1,
                    link2_value: youTubeChannels.resultData.edges[0].node.youtubeVideo2,
                    link3_value: youTubeChannels.resultData.edges[0].node.youtubeVideo3,
                    link4_value: youTubeChannels.resultData.edges[0].node.youtubeVideo4
                }
            });
        }
    }

    handleChange = (field, e) => {
        const v = e.target.value;
        const p = this.state.input_values;
        p[field] = v;
        this.setState({
            input_values: p
        });
    }

    isURL = (str)  => {
        // console.log(`string is ${str}`);
        return str.includes('http');
    }

    handleSubmit = async () => {
        if (!this.isURL(this.state.input_values.link1_value) && this.state.input_values.link1_value) {
            toast.error('Link 1 is not a valid URL', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.link2_value) && this.state.input_values.link2_value) {
            toast.error('Link 2 is not a valid URL', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.link3_value) && this.state.input_values.link3_value) {
            toast.error('Link 3 is not a valid URL', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.link4_value) && this.state.input_values.link4_value) {
            toast.error('Link 4 is not a valid URL', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (this.create) {
            await this.props.appManager.executeQueryAuth(
                'mutation', createYouTubeChannelQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    link1: this.state.input_values.link1_value,
                    link2: this.state.input_values.link2_value,
                    link3: this.state.input_values.link3_value,
                    link4: this.state.input_values.link4_value,
                }
            );
            toast.success('Media Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            await this.props.appManager.executeQueryAuth(
                'mutation', updateYouTubeChannelQuery,
                {
                    id: this.c_id,
                    link1: this.state.input_values.link1_value,
                    link2: this.state.input_values.link2_value,
                    link3: this.state.input_values.link3_value,
                    link4: this.state.input_values.link4_value,
                }
            );
            toast.success('Media Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        }
        // await this.props.appManager.executeQuery(
        //     'mutation', updateOrganisationQuery,
        //     {
        //         subDomain: this.props.uiStore.current_organisation.subDomain,
        //         name: this.state.input_values.company_name_value,
        //         fbLink: this.state.input_values.facebook_value,
        //         twitterLink: this.state.input_values.twitter_value,
        //         instaLink: this.state.input_values.insta_value,
        //         twitterFeedUsername: this.state.input_values.twitter_username_value,
        //         twitchLink: this.state.input_values.twitch_value,
        //         primaryColor: this.state.input_values.primary_color_value
        //     }
        // );
    }
    render() {
        return (
            <div style={{
                width: 'calc(100vw - 380px)'
            }}>
                <OrganizationAdminMediaComponentRender
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    link1_value={this.state.input_values.link1_value}
                    link2_value={this.state.input_values.link2_value}
                    link3_value={this.state.input_values.link3_value}
                    link4_value={this.state.input_values.link4_value}
                />
            </div>
        );
    }
}

AdminMediaController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminMediaController));

