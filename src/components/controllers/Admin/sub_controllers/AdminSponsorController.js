import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { Modal, Card, Row, Col, Button, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
// import OrganizationAdminSponsorComponentRender from '../../../render_components/admin/OrganizationAdminSponserComponentRender';
// import OrganizationAdminSponsorComponentElementRender from '../../../render_components/admin/OrganizationAdminSponserComponentElementRender';
import { createSponsorsQuery, getSponsorsQuery, deleteSponsorQuery, updateSponsorsQuery } from '../../../../queries/sponsors';
// import blankImage from '../../../../assets/images/imgPlaceholder1.png';
// import disableImage from '../../../../assets/images/element-disabled.png';

const { confirm } = Modal;
const { TextArea } = Input;


class SponsorBlock extends Component {
    state = {
        sponsor_image: null, sponsor_bg_image: null, input_http_link_value: '', input_name_value: '', input_desc_value: '', visible: false
    };
    componentDidMount = () => {
        this.sponsor_image_old = this.props.sponsor_image;
        this.sponsor_bg_image_old = this.props.sponsor_bg_image;
        this.setState({
            input_http_link_value: this.props.http_link_value, sponsor_image: this.props.sponsor_image, sponsor_bg_image: this.props.sponsor_bg_image, input_name_value: this.props.sponsor_name_value, input_desc_value: this.props.sponsor_desc_value, visible: true
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
    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete Sponsor',
                content: 'Are you sure you want to delete this sponsor?',
                okText: 'Delete',
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
    deleteSponsor = async () => {
        const f = await this.showDeleteConfirm();
        if (f) {
            this.props.deleteSponsor(this.props.element_id);
        }
    }
    handleSubmit = async () => {
        let sponsor_image = this.sponsor_image_old;
        if (this.sponsor_image_old !== this.state.sponsor_image) {
            sponsor_image = await this.uploadSponsorMedia(this.state.sponsor_image);
        }
        let sponsor_bg_image = this.sponsor_bg_image_old;
        if (this.sponsor_bg_image_old !== this.state.sponsor_bg_image) {
            sponsor_bg_image = await this.uploadSponsorMedia(this.state.sponsor_bg_image);
        }
        if (this.state.input_http_link_value) {
            if (!this.isURL(this.state.input_http_link_value)) {
                toast.error('Sponsor URL Not Valid', {
                    position: toast.POSITION.TOP_LEFT
                });
                return;
            }
        }
        await this.props.appManager.executeQueryAuth(
            'mutation', updateSponsorsQuery,
            {
                id: this.props.element_id,
                imageUrl: sponsor_image,
                bgImages: sponsor_bg_image,
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
    uploadBGFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);
        this.logo_file = e[0];              // eslint-disable-line
        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ sponsor_bg_image: x });
        };
    }
    handleFileClick = () => {
        this.dropzoneRef.open();
    }
    handleBGFileClick = () => {
        this.dropzoneBGRef.open();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        // let hd = {
        //     display: 'none'
        // };
        // if (!this.props.subscribed) {
        //     hd = {
        //         position: 'absolute',
        //         zIndex: 1,
        //         backgroundColor: 'grey',
        //         opacity: '0.3',
        //         width: 508,
        //         height: 544,
        //         marginLeft: -3
        //     };
        // }
        const cn = this.state.input_name_value ? this.state.input_name_value : 'Unnamed Sponsor';
        return (
            <div>
                <div>
                    <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                    <Dropzone onDrop={this.uploadBGFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneBGRef = node; }} />
                </div>
                <Card
                    title={cn}
                    style={{ width: '97%', marginBottom: 16 }}
                >
                    <Row>
                        <Col style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }} span={6}>SPONSOR IMAGE</Col>
                        <Col style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }} span={8}>SPONSOR BG IMAGE</Col>
                        <Col style={{ fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }} span={10}>SPONSOR DETAILS</Col>

                    </Row>
                    <Row>
                        <Col span={6} style={{ borderRight: '1px solid' }}>
                            <div style={{
                                width: 150,
                                height: 100,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                backgroundColor: '#ccc'
                            }}>
                                <img alt="sponsor" style={{ width: 150, height: 100 }} src={this.state.sponsor_image} />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div style={{
                                width: 300,
                                height: 100,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                backgroundColor: '#ccc'
                            }}>
                                {this.state.sponsor_bg_image &&
                                    <img style={{ width: 300, height: 100 }} alt="sponsor" src={this.state.sponsor_bg_image} />
                                }
                            </div>
                        </Col>
                        <Col span={8} >
                            <Row>
                                <Col style={{ paddingBottom: 8, lineHeight: '22px', fontSize: 10 }} span={8}>SPONSOR NAME</Col>
                                <Col span={16}><Input onChange={this.handleChangeName} value={this.state.input_name_value} size="small" placeholder="Sponsor Name..." /></Col>
                            </Row>
                            <Row>
                                <Col style={{ paddingBottom: 8, lineHeight: '22px', fontSize: 10 }} span={8}>SPONSOR LINK</Col>
                                <Col span={16}><Input onChange={this.handleChangeLink} value={this.state.input_http_link_value} size="small" placeholder="VALID URL" /></Col>
                            </Row>
                            <Row>
                                <Col style={{ paddingTop: 8, fontSize: 10 }} span={24}>SPONSOR DESCRIPTION</Col>
                            </Row>
                            <Row>
                                <Col style={{ paddingTop: 8, fontSize: 10 }} span={24}><TextArea onChange={this.handleChangeDesc} value={this.state.input_desc_value} rows={2} /></Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row>
                        <Col style={{ textAlign: 'center' }} span={6}>
                            <Button onClick={this.handleFileClick} type="primary" size="small">UPLOAD IMAGE</Button>
                        </Col>
                        <Col style={{ textAlign: 'center' }} span={10}>
                            <Button onClick={this.handleBGFileClick} type="primary" size="small">UPLOAD BG IMAGE</Button>
                        </Col>
                        <Col span={4}>
                            {this.props.allow_delete &&
                                <Button onClick={this.deleteSponsor} type="danger" size="small">DELETE SPONSOR</Button>
                            }
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.handleSubmit} type="primary" size="small">UPDATE SPONSOR</Button>
                        </Col>
                    </Row>
                </Card>
                {/* <OrganizationAdminSponsorComponentElementRender
                    upload_title={this.props.upload_title}
                    element_disable_image_src={disableImage}
                    element_style_disable_image={{
                        marginLeft: 36, marginTop: 48, width: 440, height: 440
                    }}
                    element_style_disable={hd}
                    sponsor_image={this.state.sponsor_image}
                    sponsor_bg_image={this.state.sponsor_bg_image}
                    http_link_value={this.state.input_http_link_value}
                    sponsor_desc_value={this.state.input_desc_value}
                    sponsor_name_value={this.state.input_name_value}
                    handleFileClick={this.handleFileClick}
                    handleBGFileClick={this.handleBGFileClick}
                    uploadFile={this.uploadFile}
                    uploadBGFile={this.uploadBGFile}
                    handleChangeName={this.handleChangeName}
                    handleChangeDesc={this.handleChangeDesc}
                    handleChangeLink={this.handleChangeLink}
                    handleSubmit={this.handleSubmit}
                /> */}
            </div>
        );
    }
}
class AdminSponsorController extends Component {
    state = {
        element_array: [],
    };
    componentDidMount = async () => {
        this.grabSponsors();
    }

    grabSponsors = async () => {
        this.logo_files = {};
        // let s_image = blankImage;
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        const { nodes } = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation;
        const p_array = [];
        nodes.forEach((n, i) => {
            // let { subscribed } = this.props;
            let allow_delete = true;
            if (i < 4) {
                allow_delete = false;
            }
            p_array.push(<SponsorBlock
                key={`sponsor_block_${n.id}`}
                element_id={n.id}
                upload_title={`Upload Sponsor ${i + 1}`}
                sponsor_image={n.imageUrl}
                sponsor_bg_image={n.bgImages}
                for={`hidden-new-file${n.id}`}
                http_link_value={n.hrefLink}
                sponsor_desc_value={n.description}
                sponsor_name_value={n.name}
                allow_delete={allow_delete}
                appManager={this.props.appManager}
                deleteSponsor={this.deleteSponsor}
                uiStore={this.props.uiStore}
            />);
        });
        this.setState({ element_array: p_array });
    }
    deleteSponsor = async (id) => {
        await this.props.appManager.executeQueryAuth(
            'mutation', deleteSponsorQuery,
            {
                id
            }
        );
        toast.success('Sponsor Deleted!', {
            position: toast.POSITION.TOP_LEFT
        });
        this.grabSponsors();
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
    showAddSponsorConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Add Sponsor',
                content: 'Are you sure you wish to add a new sponsor?',
                okText: 'Yes',
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
    confirmAddSponsor = async () => {
        const f = await this.showAddSponsorConfirm();
        if (f) {
            await this.props.appManager.executeQueryAuth('mutation', createSponsorsQuery, {                // eslint-disable-line
                subDomain: this.props.uiStore.current_organisation.subDomain,
                imageUrl: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                hrefLink: 'http://origin.gg',
                name: 'Origin.GG',
                description: 'Building an Esports team is difficult. Recruiting players, practicing, and getting your teams to events is a full-time job. Allow us to handle the rest. Origin.gg makes it easy for you to set up a pro style organization.'
            });
            toast.success('Sponsor Added!', {
                position: toast.POSITION.TOP_LEFT
            });
            this.grabSponsors();
        }
    }
    render() {
        return (
            <div>
                <div style={{ width: 'calc(100vw - 380px)' }}>
                    {this.state.element_array}
                </div>
                <div>
                    <Button onClick={this.confirmAddSponsor} type="primary">ADD SPONSOR</Button>
                </div>
            </div>
        );
    }
}
SponsorBlock.propTypes = {
    http_link_value: PropTypes.string.isRequired,
    sponsor_image: PropTypes.string.isRequired,
    sponsor_bg_image: PropTypes.string.isRequired,
    sponsor_name_value: PropTypes.string.isRequired,
    sponsor_desc_value: PropTypes.string.isRequired,
    // upload_title: PropTypes.string.isRequired,
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    element_id: PropTypes.number.isRequired,
    allow_delete: PropTypes.bool.isRequired,
    deleteSponsor: PropTypes.func.isRequired,
    // subscribed: PropTypes.bool.isRequired
};

AdminSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminSponsorController));

