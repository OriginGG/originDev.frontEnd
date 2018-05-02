import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import { Modal } from 'antd';
import Dropzone from 'react-dropzone';

import PropTypes from 'prop-types';
import { getIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
import IndividualVideosComponentRender from '../../render_components/individual/IndividualVideosComponentRender';
import IndividualEditComponentRender from '../../render_components/individual/IndividualEditModalComponentRender';
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
        this.logo_files = e[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            const p = this.state.input_values;
            if (this.file_upload_type === 'profile') {
                p.profileImageUrl = x;
            } else {
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
        const authPayload = this.props.appManager.GetQueryParams('p');
        this.key_index = 1;
        if (authPayload) {
            const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
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
        }
    }
    handleEditClick = () => {
        this.setState({ modal_open: true });
    }
    closeModal = () => {
        this.setState({ modal_open: false });
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'inherit' };
        if (this.is_admin === false) {
            s = { display: 'none' };
        }
        return (
            <div>
                <IndividualPageComponentRender
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
                    ColumnThree={<IndividualVideosComponentRender />}
                />
                <EditModal
                    modal_open={this.state.modal_open}
                    content={<ModalContent closeModal={this.closeModal} {...this.props} user_id={this.user_id} />}
                />
            </div>
        );
    }
}
IndividualPageController.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

ModalContent.propTypes = {
    appManager: PropTypes.object.isRequired,
    user_id: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired

};
EditModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
