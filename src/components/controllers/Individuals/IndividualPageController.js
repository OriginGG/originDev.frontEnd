import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import { GlobalStyles } from 'Theme/Theme';
import { Card, Icon, Image, Button } from 'semantic-ui-react/dist/commonjs';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import uiStore from '../../../utils/stores/uiStore';
import blankImage from '../../../assets/images/blank_person.png';
import { getIndividualUserByHandleQuery, getIndividualUserQuery, updateIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
// import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualTwitterStatsComponentRender from '../../render_components/individual/IndividualTwitterStatsComponentRender';
import IndividualInstagramStatsComponentRender from '../../render_components/individual/IndividualInstagramStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
// import IndividualVideosComponentRender from '../../render_components/individual/IndividualVideosComponentRender';
import IndividualYoutubeStatsComponentRender from '../../render_components/individual/IndividualYoutubeStatsComponentRender';
import IndividualTwitchStatsComponentRender from '../../render_components/individual/IndividualTwitchStatsComponentRender';

import IndividualEditComponentRender from '../../render_components/individual/IndividualEditModalComponentRender';
import browserHistory from '../../../utils/stores/browserHistory';
// import { isMobile } from 'react-device-detect';
// import historyStore from '../../../utils/stores/browserHistory';


const EditModal = (props) => {
    return (
        <Modal
            style={{ top: 32 }}
            width="600px"
            closable={false}
            footer={null}
            visible={props.modal_open}
            animationDuration={1000}
        >
            <div style={{ display: 'block' }}>
                {props.content}
            </div>
        </Modal >);
};


class ModalContent extends Component {
    state = {
        input_values: {
            firstName: '',
            lastName: '',
            username: '',
            about: '',
            contactEmail: '',
            youtubeChannel: '',
            twitchUrl: '',
            instagramLink: '',
            twitterHandle: '',
            accomplishments: '',
            youtubeVideo1Url: '',
            youtubeVideo2Url: '',
            youtubeVideo3Url: '',
            profileImageUrl: '',
            bannerImageUrl: ''
        }
    };
    componentDidMount = async () => {
        const user = await this.props.appManager.executeQueryAuth('query', getIndividualUserQuery, { id: this.props.user_id });
        console.log(`user = ${JSON.stringify(user)}`);
        this.setState({
            input_values: {
                firstName: this.getInputValue(user.individualUserById.firstName),
                lastName: this.getInputValue(user.individualUserById.lastName),
                about: this.getInputValue(user.individualUserById.about),
                username: this.getInputValue(user.individualUserById.username),
                contactEmail: this.getInputValue(user.individualUserById.contactEmail),
                youtubeChannel: this.getInputValue(user.individualUserById.youtubeChannel),
                twitterHandle: this.getInputValue(user.individualUserById.twitterHandle),
                twitchUrl: this.getInputValue(user.individualUserById.twitchUrl),
                accomplishments: this.getInputValue(user.individualUserById.accomplishments),
                instagramLink: this.getInputValue(user.individualUserById.instagramLink),
                // youtubeVideo1Url: this.getInputValue(user.individualUserById.youtubeVideo1Url),
                // youtubeVideo2Url: this.getInputValue(user.individualUserById.youtubeVideo2Url),
                // youtubeVideo3Url: this.getInputValue(user.individualUserById.youtubeVideo3Url),
                bannerImageUrl: this.getInputValue(user.individualUserById.bannerImageUrl),
                profileImageUrl: this.getInputValue(user.individualUserById.profileImageUrl),
            },
        });
        this.profile_files = null;
        this.banner_files = null;
    }
    handleChange = (field, e) => {
        const v = e.target.value;
        const p = this.state.input_values;
        console.log(`e = ${v} and p = ${p}`);
        p[field] = v;
        this.setState({
            input_values: p
        });
    }
    getInputValue = (i) => {
        return i === null ? '' : i;
    }

    uploadFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);

        reader.onloadend = () => {
            const x = reader.result;
            const p = this.state.input_values;
            if (this.file_upload_type === 'profile') {
                this.profile_files = e[0];             // eslint-disable-line
                p.profileImageUrl = x;
            } else {
                this.banner_files = e[0];             // eslint-disable-line
                p.bannerImageUrl = x;
            }
            this.setState({ input_values: p });
            this.upload_file = true;
        };
    }

    handleFileClick = (f) => {
        this.file_upload_type = f;
        this.dropzoneRef.open();
    }
    handleSubmit = async () => {
        let bn = this.state.input_values.bannerImageUrl;
        let pn = this.state.input_values.profileImageUrl;
        uiStore.setSubmittingContent(true);
        // upload files to s3 if they've changed.
        try {
            if (this.profile_files) {
                pn = await this.uploadtoS3(this.profile_files);
            }
            if (this.banner_files) {
                bn = await this.uploadtoS3(this.banner_files);
            }
            const p = Object.assign(this.state, {});
            p.input_values.bannerImageUrl = bn;
            p.input_values.profileImageUrl = pn;
            this.props.handleSubmit(p.input_values);
        } catch (err) {
            uiStore.setSubmittingContent(false);
        }
    }

    uploadtoS3 = (f) => {
        return new Promise((resolve) => {
            if (f) {
                const formData = new FormData();
                formData.append('images', f);
                axios.post(`${process.env.REACT_APP_API_SERVER}/upload/individuals`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((x) => {
                    resolve(x.data.Location);
                });
            } else {
                resolve(null);
            }
        });
    }
    // uploadLogo = () => {
    //     return new Promise((resolve) => {
    //         const formData = new FormData();
    //         formData.append('images', this.logo_files);
    //         axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.domain_name}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }).then((x) => {
    //             resolve(x.data);
    //         });
    //     });
    // }

    render() {
        return (
            <div>
                <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                <IndividualEditComponentRender
                    renderButtons={<RenderButtons handleSubmit={this.handleSubmit} closeModal={this.props.closeModal} />}
                    key={`edit_ind_key_${this.key_index}`}
                    handleChange={this.handleChange}
                    handleFileClick={this.handleFileClick}
                    extra_style={{ display: 'inherit' }}
                    closeModal={this.props.closeModal}
                    firstName={this.state.input_values.firstName}
                    lastName={this.state.input_values.lastName}
                    username={this.state.input_values.username}
                    about={this.state.input_values.about}
                    accomplishments={this.state.input_values.accomplishments}
                    contactEmail={this.state.input_values.contactEmail}
                    youtubeChannel={this.state.input_values.youtubeChannel}
                    instagramLink={this.state.input_values.instagramLink}
                    twitchUrl={this.state.input_values.twitchUrl}
                    twitterHandle={this.state.input_values.twitterHandle}
                    redirectTwitterAuth={this.props.redirectTwitterAuth}
                    // youtubeVideo1Url={this.state.input_values.youtubeVideo1Url}
                    // youtubeVideo2Url={this.state.input_values.youtubeVideo2Url}
                    // youtubeVideo3Url={this.state.input_values.youtubeVideo3Url}
                    bannerImageUrl={this.state.input_values.bannerImageUrl}
                    profileImageUrl={this.state.input_values.profileImageUrl}
                    uploadBannerFile={this.uploadBannerFile}
                    uploadProfileFile={this.uploadProfileFile}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const TwitchInfo = ({ stats }) => {
    return (
        <Card style={{ marginTop: 12, marginLeft: '5%', width: '90%' }} >
            <Image src={stats.profile_image_url} />
            <Card.Content>
                <Card.Header>
                    {stats.display_name}
                </Card.Header>
                <Card.Meta>
                    <span className="date">
                        Broadcaster Type - {stats.broadcaster_type}
                    </span>
                </Card.Meta>
                <Card.Description>
                    {stats.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name="eye" />
                    {stats.view_count} views
      </a>
            </Card.Content>
        </Card>

    );
};

class RenderButtons extends Component {
    state = { submitting: false };

    componentDidMount = () => {
        this.autorun_tracker = autorun(() => {
            this.setState({ submitting: uiStore.submitting_content });
        });
    }
    render() {
        return (<div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button.Group>
                <Button disabled={this.state.submitting} onClick={this.props.closeModal} negative>Cancel</Button>
                <Button.Or />
                <Button disabled={this.state.submitting} onClick={this.props.handleSubmit} primary>Submit</Button>
            </Button.Group></div>);
    }
}

class IndividualPageController extends Component {
    state = {
        visible: false,
        modal_open: false,
    };
    componentDidMount = async () => {
        this.is_admin = false;
        this.twitch_stats = null;
        this.twitter_stats = null;
        this.instagram_stats = null;
        this.youtube_stats = null;
        const view_id = this.props.appManager.GetQueryParams('u');
        const handle = (location.pathname).replace('/individual/', '');            // eslint-disable-line
        // console.log('view_id' + view_id); // eslint-disable-line
        const loginPayload = this.props.appManager.pouchGet('ind_login');
        if (loginPayload) {
            const p = JSON.parse(Buffer.from(loginPayload, 'hex').toString('utf8'));
            this.props.appManager.pouchStore('ind_login', null);
            this.user_details = p;           // eslint-disable-line
            this.is_admin = true;
            this.getStats();
        } else {
            const authPayload = this.props.appManager.pouchGet('ind_authenticate');
            if (!authPayload) {
                let user;
                if (view_id) {
                    user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: view_id });
                    this.user_details = user.individualUserById;
                } else {
                    user = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, { handle });
                    if (user.allIndividualUsers.nodes.length === 0) {
                        toast.error('That individual user does not exist!', {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                        return;
                    }
                    this.user_details = user.allIndividualUsers.nodes[0];           // eslint-disable-line
                }
                this.getStats();
            } else {
                this.props.appManager.pouchStore('ind_authenticate', null);
                // const authPayload = this.props.appManager.GetQueryParams('p');
                console.log('authPayload' + authPayload); // eslint-disable-line
                this.key_index = 1;
                if (authPayload) {
                    let p;
                    try {
                        p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
                    } catch (err) {
                        toast.error('Error finding this individual - Redirecting you to login in 5 seconds', {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                        setTimeout(() => {
                            browserHistory.push('/signup');
                        }, 5000);
                        return;
                    }
                    console.log(`token - ${p}`);
                    if (p.authenticateIndividual.individualAuthPayload === null) {
                        toast.error('Wrong password for  - Redirecting you to login page in 5 seconds', {
                            position: toast.POSITION.TOP_LEFT,
                            autoClose: 5000
                        });
                        setTimeout(() => {
                            browserHistory.push('/signup');
                        }, 5000);
                    } else {
                        this.authPayload = p;
                        const token = p.authenticateIndividual.individualAuthPayload.jwtToken;
                        this.props.appManager.authToken = token;
                        const d = this.props.appManager.decodeJWT(token);
                        // browserHistory.push(`/individual?u=${d.id}`);
                        this.user_id = d.id;
                        console.log('user_id' + this.user_id); // eslint-disable-line
                        const user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: this.user_id });
                        const new_payload = Buffer.from(JSON.stringify(user.individualUserById), 'utf8').toString('hex');
                        this.props.appManager.pouchStore('ind_login', new_payload);
                        browserHistory.push(`/individual/${user.individualUserById.username}`);
                    }
                } else {
                    browserHistory.push('/signup');
                }
            }
        }
    }

    getStats = async () => {
        await this.getTwitchStats();
        await this.getYouTubeStats();
        await this.getTwitterStats();
        this.setState({ visible: true });
    }

    getTwitchStats = async () => {
        if (this.user_details.twitchUrl) {
            const tu = this.user_details.twitchUrl.substring(this.user_details.twitchUrl.lastIndexOf('/') + 1);
            const td = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitch/getTwitchUserInfo?name=${tu}`);
            this.twitch_stats = td.data.user;
        }
    }
    // redirectTwitterLogin = async (user) => {
    //     const redirectURL = await axios.get(`${process.env.REACT_APP_API_SERVER}/auth/twitterCheck`);
    //     windows.open(redirectURL);
    // }
    getTwitterStats = async () => {
        if (this.user_details.twitterHandle) {
            const tu = this.user_details.twitterHandle.substring(this.user_details.twitterHandle.lastIndexOf('@') + 1);
            const td = await axios.get(`${process.env.REACT_APP_API_SERVER}/twitter/getTwitterUserInfo?user=${tu}`);
            console.log(td.data[0]);
            this.twitter_stats = td.data[0]; // eslint-disable-line
        }
    }
    getYouTubeStats = async () => {
        if (this.user_details.youtubeChannel) {
            const td = await axios.get(`${process.env.REACT_APP_API_SERVER}/youtube/getchannels?channel=${this.user_details.youtubeChannel}`);
            console.log(`YOUtube nSTATS = ${JSON.stringify(td.data)}`);
            this.youtube_stats = td.data;
        }
    }
    redirectTwitterAuth = async () => {
        const authURL = new URL(`${process.env.REACT_APP_API_SERVER}/auth/twitter`);
        [...new URL(window.location).searchParams.entries()]
            .forEach(([k, v]) => authURL.searchParams.append(k, v));
        console.log(authURL);
        window.location.assign(authURL.href);
    }
    // AuthRedirect = async () =>
    // {

    // }
    handleRedirect = (s) => {
        switch (s) {
            case 'twitter': {
                if (this.user_details.twitterHandle) {
                    const p_string = `https://twitter.com/${this.user_details.twitterHandle}?lang=en`;
                    window.open(p_string, '_blank');
                }
                break;
            }
            case 'facebook': {
                window.open('http://www.facebook.com', '_blank');
                break;
            }
            case 'instagram': {
                if (this.user_details.instagramLink) {
                    window.open(`https://www.instagram.com/${this.user_details.instagramLink}/`, '_blank');
                }
                break;
            }
            case 'youtube': {
                if (this.user_details.youtubeChannel) {
                    window.open(`https://www.youtube.com/channel/${this.user_details.youtubeChannel}?view_as=subscriber`, '_blank');
                }
                break;
            }
            case 'twitch': {
                if (this.user_details.twitchUrl) {
                    window.open(`http://www.twitch.tv/${this.user_details.twitchUrl}`, '_blank');
                }
                break;
            }
            default: {
                window.open('http://www.google.com', '_blank');
                break;
            }
        }
        console.log(s);
    }
    handleEditClick = () => {
        this.setState({ modal_open: true });
    }
    handleLoginClick = () => {
        console.log('clickd login');
        browserHistory.push('/login_ind');
    }
    closeModal = () => {
        this.setState({ modal_open: false });
    }
    handleSubmit = async (state) => {
        console.log(`STATE = ${JSON.stringify(state)}`);
        if (state.username.indexOf(' ') > -1) {
            toast.error('Username cannot contain spaces!', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            return;
        }
        if (state.twitchUrl.includes('http')) {
            toast.error('Twitch handle required not full URL', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            return;
        }
        if (state.youtubeChannel.includes('http')) {
            toast.error('Youtube Channel ID required not full URL', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            return;
        }
        if (state.twitterHandle.includes('http')) {
            toast.error('Twitter Handle required not full URL', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            return;
        }
        if (state.instagramLink.includes('http')) {
            toast.error('Instagram ID required not full URL', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            return;
        }
        console.log(`IDIDID = ${this.user_details.id}`);
        const user_id_being_reset = this.user_details.id;
        const r = await this.props.appManager.executeQueryAuth('query', getIndividualUserByHandleQuery, { handle: state.username });
        if (r.allIndividualUsers.nodes.length > 0 && r.allIndividualUsers.nodes[0].id !== this.user_details.id) {
            toast.error('That Username is taken!', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
        } else {
            // get the twitch user_id if there is one.

            this.user_details = state;
            this.user_details.id = user_id_being_reset;
            await this.getTwitchStats();
            let t_id = null;
            if (this.twitch_stats && this.twitch_stats.id) {
                t_id = this.twitch_stats.id;
            }
            console.log(`check if id is there ${this.user_details.id}`);
            await this.props.appManager.executeQueryAuth(
                'mutation', updateIndividualUserQuery,
                {
                    id: user_id_being_reset,
                    about: state.about,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    contactEmail: state.contactEmail,
                    twitchUserId: t_id,
                    bannerImageUrl: state.bannerImageUrl,
                    profileImageUrl: state.profileImageUrl,
                    accomplishments: state.accomplishments,
                    twitchUrl: state.twitchUrl,
                    twitterHandle: state.twitterHandle,
                    youtubeChannel: state.youtubeChannel,
                    instagramLink: state.instagramLink
                    // youtubeVideo1Url: state.youtubeVideo1Url,
                    // youtubeVideo2Url: state.youtubeVideo2Url,
                    // youtubeVideo3Url: state.youtubeVideo3Url,
                }
            );
            toast.success('Profile Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
            uiStore.setSubmittingContent(false);
            this.closeModal();
        }
    }
    render() {
        let twitch_stats = <h2 style={{
            marginTop: 8, fontSize: 14, color: 'white', textAlign: 'center'
        }}>No Data Found</h2>;

        const instagram_stats = <h2
            style={{
                marginTop: 8, fontSize: 14, color: 'white', textAlign: 'center'
            }}>No Data Found</h2>;

        if (this.twitch_stats) {
            console.log(`TWITCH STATS = ${JSON.stringify(this.twitch_stats)}`);
            // twitch_stats = <TwitchInfo stats={this.twitch_stats} />;           // eslint-disable-line
            twitch_stats = <IndividualTwitchStatsComponentRender
                twitch_image={this.twitch_stats.profile_image_url}
                twitch_name={this.twitch_stats.display_name}
                twitch_type={this.twitch_stats.broadcaster_type}
                twitch_description={this.twitch_stats.description}
                twitch_views={this.twitch_stats.view_count}
            />;
        }
        if (this.state.visible === false) {
            return null;
        }

        let channel_name = '';
        let channel_comments = 0;
        let channel_views = 0;
        let channel_subscribers = 0;
        let channel_videos = 0;
        const channel_views_per_video = 0;
        let youTubeComp = <IndividualYoutubeStatsComponentRender />;
        if (this.youtube_stats) {
            if (this.youtube_stats.channel_info) {
                if (this.youtube_stats.channel_info.items.length > 0) {
                    const item = this.youtube_stats.channel_info.items[0];
                    channel_videos = item.statistics.videoCount;
                    channel_name = item.snippet.title;
                    channel_subscribers = item.statistics.subscriberCount;
                    channel_views = item.statistics.viewCount;
                    channel_comments = item.statistics.commentCount;
                }
            }
            youTubeComp = <IndividualYoutubeStatsComponentRender
                channel_name={channel_name}
                channel_views={channel_views}
                channel_subscribers={channel_subscribers}
                channel_videos={channel_videos}
                channel_comments={channel_comments}
                channel_views_per_video={channel_views_per_video}
                handle_redirect={this.handleRedirect}
            />;
        }
        // Twitter Rendering Component
        let twitter_username = '';
        let twitter_followers_count = 0;
        let twitter_status_count = 0;
        let twitter_favourite_count = 0;
        let twitter_screen_name = '';
        let twitterComp = <IndividualTwitterStatsComponentRender />;
        if (this.twitter_stats) {
            twitter_username = this.twitter_stats.name; // eslint-disable-line
            twitter_followers_count = this.twitter_stats.followers_count;
            twitter_status_count = this.twitter_stats.statuses_count;
            twitter_favourite_count = this.twitter_stats.favourites_count; // eslint-disable-line
            twitter_screen_name = this.twitter_stats.screen_name; // eslint-disable-line
            twitterComp = <IndividualTwitterStatsComponentRender
                twitter_username={twitter_username}
                twitter_followers_count={twitter_followers_count}
                twitter_status_count={twitter_status_count}
                twitter_favourite_count={twitter_favourite_count}
                twitter_screen_name={twitter_screen_name} />;
        }
        let s = { display: 'inherit' };
        if (this.is_admin === false) {
            s = { display: 'none' };
        }
        // let v1 = null;
        // let v2 = null;
        // let v3 = null;
        // debugger;
        // if (this.youtube_stats.video_info.items.length > 0 && this.youtube_stats.video_info.items[0].id.videoId) {
        //     v1 = `https://www.youtube.com/embed/${this.youtube_stats.video_info.items[0].id.videoId}`;
        // }
        // if (this.youtube_stats.video_info.items.length > 1 && this.youtube_stats.video_info.items[1].id.videoId) {
        //     v2 = `https://www.youtube.com/embed/${this.youtube_stats.video_info.items[1].id.videoId}`;
        // }
        // if (this.youtube_stats.video_info.items.length > 2 && this.youtube_stats.video_info.items[2].id.videoId) {
        //     v3 = `https://www.youtube.com/embed/${this.youtube_stats.video_info.items[2].id.videoId}`;
        // }
        let pi = this.user_details.profileImageUrl;
        if (!pi) {
            pi = blankImage;
        }
        let bi = this.user_details.bannerImageUrl;
        if (!bi) {
            bi = 'https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg';
        }
        return (
            <div>
                <IndividualPageComponentRender
                    bannerImageUrl={bi}
                    handleEditClick={this.handleEditClick}
                    handleLoginClick={this.handleLoginClick}
                    button_style={s}
                    ColumnOne={
                        <IndividualBasicInfoComponentRender
                            profileImageUrl={pi}
                            twitterHandle={this.user_details.twitterHandle}
                            about={this.user_details.about}
                            username={this.user_details.username}
                            name={`${this.user_details.firstName} ${this.user_details.lastName}`}
                            contactEmail={this.user_details.contactEmail}
                            accomplishments={this.user_details.accomplishments}
                        />
                    }
                    ColumnTwo={twitch_stats}
                    ColumnThree={youTubeComp}
                    ColumnFour={twitterComp}
                    ColumnFive={<IndividualInstagramStatsComponentRender instagram_stats={instagram_stats} handle_redirect={this.handleRedirect} />}
                />
                <EditModal
                    modal_open={this.state.modal_open}
                    content={<ModalContent handleSubmit={this.handleSubmit} closeModal={this.closeModal} redirectTwitterAuth={this.redirectTwitterAuth}  {...this.props} user_id={this.user_details.id} />}
                />
            </div>
        );
    }
}
IndividualPageController.propTypes = {
    appManager: PropTypes.object.isRequired,
};

RenderButtons.propTypes = {
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

ModalContent.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    user_id: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    redirectTwitterAuth: PropTypes.func.isRequired
};
TwitchInfo.propTypes = {
    stats: PropTypes.object.isRequired
};
EditModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
