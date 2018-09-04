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
import { getSponsorsQuery, updateSponsorsQuery, createSponsorsQuery } from '../../../../queries/sponsors';
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
        input_values: {
            sponsor_image: null,
            http_link_value: '',
            sponsor_desc_value: '',
            sponsor_name_value: '',
        }
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


    handleSubmit = async () => {
        const sponsor_image1 = await this.uploadSponsorMedia('sponsor_image1');
        const sponsor_image2 = await this.uploadSponsorMedia('sponsor_image2');
        const sponsor_image3 = await this.uploadSponsorMedia('sponsor_image3');
        const sponsor_image4 = await this.uploadSponsorMedia('sponsor_image4');
        const sponser_href1 = this.state.input_values.http_link1_value;
        const sponser_href2 = this.state.input_values.http_link2_value;
        const sponser_href3 = this.state.input_values.http_link3_value;
        const sponser_href4 = this.state.input_values.http_link4_value;

        if (!this.isURL(sponser_href1) && sponser_href1) {
            toast.error('First Sponser URL Not Valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(sponser_href2) && sponser_href2) {
            toast.error('Second Sponser URL Not Valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(sponser_href3) && sponser_href3) {
            toast.error('Third Sponser URL Not Valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(sponser_href4) && sponser_href4) {
            toast.error('Fourth Sponser URL Not Valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (this.create) {
            await this.props.appManager.executeQuery(
                'mutation', createSponsorsQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    link1: sponsor_image1,
                    link2: sponsor_image2,
                    link3: sponsor_image3,
                    link4: sponsor_image4,
                    href_link1: sponser_href1,
                    href_link2: sponser_href2,
                    href_link3: sponser_href3,
                    href_link4: sponser_href4,
                    desc1: this.state.input_values.sponsor_desc1_value,
                    desc2: this.state.input_values.sponsor_desc2_value,
                    desc3: this.state.input_values.sponsor_desc3_value,
                    desc4: this.state.input_values.sponsor_desc4_value,
                    name1: this.state.input_values.sponsor_name1_value,
                    name2: this.state.input_values.sponsor_name2_value,
                    name3: this.state.input_values.sponsor_name3_value,
                    name4: this.state.input_values.sponsor_name4_value

                }
            );
            toast.success('Sponsors Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            await this.props.appManager.executeQuery(
                'mutation', updateSponsorsQuery,
                {
                    id: this.c_id,
                    link1: sponsor_image1,
                    link2: sponsor_image2,
                    link3: sponsor_image3,
                    link4: sponsor_image4,
                    href_link1: sponser_href1,
                    href_link2: sponser_href2,
                    href_link3: sponser_href3,
                    href_link4: sponser_href4,
                    desc1: this.state.input_values.sponsor_desc1_value,
                    desc2: this.state.input_values.sponsor_desc2_value,
                    desc3: this.state.input_values.sponsor_desc3_value,
                    desc4: this.state.input_values.sponsor_desc4_value,
                    name1: this.state.input_values.sponsor_name1_value,
                    name2: this.state.input_values.sponsor_name2_value,
                    name3: this.state.input_values.sponsor_name3_value,
                    name4: this.state.input_values.sponsor_name4_value
                }
            );
            toast.success('Sponsors Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }


    uploadFile = (field, e) => {
        console.log(field);
        const { files } = e.target;
        this.logo_files[field] = files[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files[field]);

        reader.onloadend = () => {
            const x = reader.result;
            const p = this.state.input_values;
            p[field] = x;
            this.setState(p);
        };
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

