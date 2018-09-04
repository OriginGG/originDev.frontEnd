import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
// import OrganizationAdminSponsorComponentRender from '../../../render_components/admin/OrganizationAdminSponserComponentRender';
import OrganizationAdminSponsorComponentElementRender from '../../../render_components/admin/OrganizationAdminSponserComponentElementRender';
import { getSponsorsQuery, updateSponsorsQuery } from '../../../../queries/sponsors';
// import blankImage from '../../../../assets/images/imgPlaceholder1.png';
// import disableImage from '../../../../assets/images/element-disabled.png';

const { confirm } = Modal;


class SponsorBlock extends Component {
    state = {
        sponsor_image: null, input_http_link_value: '', input_name_value: '', input_desc_value: '', visible: false
    };
    componentDidMount = () => {
        this.sponsor_image_old = this.props.sponsor_image;
        this.setState({
            input_http_link_value: this.props.http_link_value, sponsor_image: this.props.sponsor_image, input_name_value: this.props.sponsor_name_value, input_desc_value: this.props.sponsor_desc_value, visible: true
        });
    }
    isURL = (str) => {
        return str.includes('http');
    }
    handleChangeName = (e) => {
        this.setState({
            input_name_value: e.target.value
        });
    }
    handleChangeDesc = (e) => {
        this.setState({
            input_desc_value: e.target.value
        });
    }
    handleChangeLink = (e) => {
        this.setState({
            input_http_link_value: e.target.value
        });
    }
    handleSubmit = async () => {
        let sponsor_image = this.sponsor_image_old;
        if (this.sponsor_image_old !== this.state.sponsor_image) {
            sponsor_image = await this.uploadSponsorMedia(this.state.sponsor_image);
        }
        if (this.state.input_http_link_value) {
            if (!this.isURL(this.state.input_http_link_value)) {
                toast.error('Sponsor URL Not Valid', {
                    position: toast.POSITION.TOP_LEFT
                });
                return;
            }
        }
        await this.props.appManager.executeQuery(
            'mutation', updateSponsorsQuery,
            {
                id: this.props.element_id,
                imageUrl: sponsor_image,
                hrefLink: this.state.input_http_link_value,
                description: this.state.input_desc_value,
                name: this.state.input_name_value
            }
        );
        toast.success('Sponsor Updated!', {
            position: toast.POSITION.TOP_LEFT
        });
    }
    uploadSponsorMedia = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            formData.append('images', this.logo_file);
            axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((x) => {
                resolve(x.data.Location);
            });
        });
    }
    uploadFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);
        this.logo_file = e[0];              // eslint-disable-line
        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ sponsor_image: x });
        };
    }
    handleFileClick = () => {
        this.dropzoneRef.open();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div>
            <div>
                <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
            </div>
            <OrganizationAdminSponsorComponentElementRender
                upload_title={this.props.upload_title}
                sponsor_image={this.state.sponsor_image}
                http_link_value={this.state.input_http_link_value}
                sponsor_desc_value={this.state.input_desc_value}
                sponsor_name_value={this.state.input_name_value}
                handleFileClick={this.handleFileClick}
                uploadFile={this.uploadFile}
                handleChangeName={this.handleChangeName}
                handleChangeDesc={this.handleChangeDesc}
                handleChangeLink={this.handleChangeLink}
                handleSubmit={this.handleSubmit}
                />
                </div>
        );
    }
}
class AdminSponsorController extends Component {
    state = {
        element_array: [],
    };
    componentDidMount = async () => {
        this.subscribed = true;
        this.logo_files = {};
        // let s_image = blankImage;
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const { nodes } = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation;
        const p_array = [];
        nodes.forEach((n, i) => {
            p_array.push(<SponsorBlock
                key={`sponsor_block_${n.id}`}
                element_id={n.id}
                upload_title={`Upload Sponsor ${i + 1}`}
                sponsor_image={n.imageUrl}
                for={`hidden-new-file${n.id}`}
                http_link_value={n.hrefLink}
                sponsor_desc_value={n.description}
                sponsor_name_value={n.name}
                appManager={this.props.appManager}
                uiStore={this.props.uiStore}
            />);
        });
        this.setState({ element_array: p_array });
    }
    showSubscribeConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Subscription Required',
                content: 'To enable this content, you need a subscription.',
                okText: 'Subscribe',
                cancelText: 'Cancel',
                onOk: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    };
    subscriptionClick = async () => {
        const action = this.showSubscribeConfirm();
        console.log(action);
    }
    render() {
        return (
            <div style={{ width: 'calc(100vw - 380px)' }}>
                {this.state.element_array}
            </div>
        );
    }
}
SponsorBlock.propTypes = {
    http_link_value: PropTypes.string.isRequired,
    sponsor_image: PropTypes.string.isRequired,
    sponsor_name_value: PropTypes.string.isRequired,
    sponsor_desc_value: PropTypes.string.isRequired,
    upload_title: PropTypes.string.isRequired,
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    element_id: PropTypes.number.isRequired
};

AdminSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminSponsorController));

