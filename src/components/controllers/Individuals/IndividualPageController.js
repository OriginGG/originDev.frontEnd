import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getIndividualUserQuery, updateIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
import IndividualVideosComponentRender from '../../render_components/individual/IndividualVideosComponentRender';
import IndividualEditComponentRender from '../../render_components/individual/IndividualEditModalComponentRender';
import browserHistory from '../../../utils/stores/browserHistory';
// import { isMobile } from 'react-device-detect';
// import historyStore from '../../../utils/stores/browserHistory';


const EditModal = (props) => {
    return (
        <Modal
            style={{ top: 32 }}
            width="max-content"
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
            about: '',
            email: '',
            contactNumber: '',
            youtubeChannel: '',
            twitchUrl: '',
            twitterHandle: '',
            accomplishments: '',
            youtubeVideo1Url: '',
            youtubeVideo2Url: '',
            youtubeVideo3Url: '',
            profileImageUrl: '',
            bannerImageUrl: ''
        }
    };
    componentWillMount = async () => {
        const user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: this.props.user_id });
        this.setState({
            input_values: {
                firstName: this.getInputValue(user.individualUserById.firstName),
                email: this.getInputValue(user.individualUserById.email),
                about: this.getInputValue(user.individualUserById.about),
                contactNumber: this.getInputValue(user.individualUserById.contactNumber),
                youtubeChannel: this.getInputValue(user.individualUserById.youtubeChannel),
                twitterHandle: this.getInputValue(user.individualUserById.twitterHandle),
                twitchUrl: this.getInputValue(user.individualUserById.twitchUrl),
                accomplishments: this.getInputValue(user.individualUserById.accomplishments),
                youtubeVideo1Url: this.getInputValue(user.individualUserById.youtubeVideo1Url),
                youtubeVideo2Url: this.getInputValue(user.individualUserById.youtubeVideo2Url),
                youtubeVideo3Url: this.getInputValue(user.individualUserById.youtubeVideo3Url),
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
        // upload files to s3 if they've changed.
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
                    key={`edit_ind_key_${this.key_index}`}
                    handleChange={this.handleChange}
                    handleFileClick={this.handleFileClick}
                    extra_style={{ display: 'inherit' }}
                    closeModal={this.props.closeModal}
                    firstName={this.state.input_values.firstName}
                    about={this.state.input_values.about}
                    email={this.state.input_values.email}
                    contactNumber={this.state.input_values.contactNumber}
                    youtubeChannel={this.state.input_values.youtubeChannel}
                    twitchUrl={this.state.input_values.twitchUrl}
                    twitterHandle={this.state.input_values.twitterHandle}
                    accomplishments={this.state.input_values.accomplishments}
                    youtubeVideo1Url={this.state.input_values.youtubeVideo1Url}
                    youtubeVideo2Url={this.state.input_values.youtubeVideo2Url}
                    youtubeVideo3Url={this.state.input_values.youtubeVideo3Url}
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
class IndividualPageController extends Component {
    state = {
        visible: false,
        modal_open: false,
    };
    componentWillMount = async () => {
        this.is_admin = false;
        const view_id = this.props.appManager.GetQueryParams('u');
        if (view_id) {
            const user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: view_id });
            this.user_details = user.individualUserById;
            this.setState({
                visible: true
            });
        } else {
            const authPayload = this.props.appManager.GetQueryParams('p');
            this.key_index = 1;
            if (authPayload) {
                const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
                console.log(`token - ${p}`);
                this.authPayload = p;
                const token = p.authenticateIndividual.individualAuthPayload.jwtToken;
                const d = this.props.appManager.decodeJWT(token);
                this.user_id = d.id;
                const user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: this.user_id });
                if (user.individualUserById !== null) {
                    this.is_admin = true;
                }
                this.user_details = user.individualUserById;
                this.setState({
                    visible: true
                });
            } else {
                browserHistory.push('/signup');
            }
        }
    }
    handleEditClick = () => {
        this.setState({ modal_open: true });
    }
    closeModal = () => {
        this.setState({ modal_open: false });
    }
    handleSubmit = async (state) => {
        await this.props.appManager.executeQuery(
            'mutation', updateIndividualUserQuery,
            {
                id: this.user_id,
                about: state.about,
                firstName: state.firstName,
                bannerImageUrl: state.bannerImageUrl,
                profileImageUrl: state.profileImageUrl,
                accomplishments: state.accomplishments,
                twitchUrl: state.twitchUrl,
                twitterHandle: state.twitterHandle,
                youtubeChannel: state.youtubeChannel,
                youtubeVideo1Url: state.youtubeVideo1Url,
                youtubeVideo2Url: state.youtubeVideo2Url,
                youtubeVideo3Url: state.youtubeVideo3Url
            }
        );
        toast.success('Profile Updated!', {
            position: toast.POSITION.TOP_LEFT
        });
        this.user_details = state;
        this.closeModal();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'inherit' };
        if (this.is_admin === false) {
            s = { display: 'none' };
        }
        let v1 = null;
        let v2 = null;
        let v3 = null;
        if (this.user_details.youtubeVideo1Url) {
            v1 = this.props.appManager.convertYoutubeURL(this.user_details.youtubeVideo1Url);
        }
        if (this.user_details.youtubeVideo2Url) {
            v2 = this.props.appManager.convertYoutubeURL(this.user_details.youtubeVideo2Url);
        }
        if (this.user_details.youtubeVideo3Url) {
            v3 = this.props.appManager.convertYoutubeURL(this.user_details.youtubeVideo3Url);
        }

        return (
            <div>
                <IndividualPageComponentRender
                    bannerImageUrl={this.user_details.bannerImageUrl}
                    handleEditClick={this.handleEditClick}
                    button_style={s}
                    ColumnOne={
                        <IndividualBasicInfoComponentRender
                            profileImageUrl={this.user_details.profileImageUrl}
                            twitterHandle={this.user_details.twitterHandle}
                            about={this.user_details.about}
                            firstName={this.user_details.firstName}
                            email={this.user_details.email}
                            contactNumber={this.user_details.contactNumber}
                        />
                    }
                    ColumnTwo={<IndividualSocialStatsComponentRender />}
                    ColumnThree={<IndividualVideosComponentRender
                        video1_url={v1}
                        video2_url={v2}
                        video3_url={v3}
                    />}
                />
                <EditModal
                    modal_open={this.state.modal_open}
                    content={<ModalContent handleSubmit={this.handleSubmit} closeModal={this.closeModal} {...this.props} user_id={this.user_id} />}
                />
            </div>
        );
    }
}
IndividualPageController.propTypes = {
    appManager: PropTypes.object.isRequired,
};

ModalContent.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    user_id: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired

};
EditModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
