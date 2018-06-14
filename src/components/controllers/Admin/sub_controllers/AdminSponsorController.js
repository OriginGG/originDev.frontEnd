import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrganizationAdminSponsorComponentRender from '../../../render_components/admin/OrganizationAdminSponserComponentRender';
import { getSponsorsQuery, updateSponsorsQuery, createSponsorsQuery } from '../../../../queries/sponsors';
import blankImage from '../../../../assets/images/imgPlaceholder1.png';

class AdminSponsorController extends Component {
    state = {
        input_values: {
            sponsor_image1: null,
            sponsor_image2: null,
            sponsor_image3: null,
            sponsor_image4: null,
            http_link1_value: '',
            http_link2_value: '',
            http_link3_value: '',
            http_link4_value: '',
            sponsor_desc1_value: '',
            sponsor_desc2_value: '',
            sponsor_desc3_value: '',
            sponsor_desc4_value: ''
        }
    };
    componentDidMount = async () => {
        this.logo_files = {};
        let s_image0 = blankImage;
        let s_image1 = blankImage;
        let s_image2 = blankImage;
        let s_image3 = blankImage;
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        this.c_id = sponsor_data.resultData.edges[0].node.id;
        s_image0 = sponsor_data.resultData.edges[0].node.sponsor1;
        s_image1 = sponsor_data.resultData.edges[0].node.sponsor2;
        s_image2 = sponsor_data.resultData.edges[0].node.sponsor3;
        s_image3 = sponsor_data.resultData.edges[0].node.sponsor4;
        this.setState({
            input_values: {
                sponsor_image1: s_image0,
                sponsor_image2: s_image1,
                sponsor_image3: s_image2,
                sponsor_image4: s_image3,
                http_link1_value: sponsor_data.resultData.edges[0].node.hrefLink1,
                http_link2_value: sponsor_data.resultData.edges[0].node.hrefLink2,
                http_link3_value: sponsor_data.resultData.edges[0].node.hrefLink3,
                http_link4_value: sponsor_data.resultData.edges[0].node.hrefLink4,
                sponsor_desc1_value: sponsor_data.resultData.edges[0].node.sponsorDesc1,
                sponsor_desc2_value: sponsor_data.resultData.edges[0].node.sponsorDesc2,
                sponsor_desc3_value: sponsor_data.resultData.edges[0].node.sponsorDesc3,
                sponsor_desc4_value: sponsor_data.resultData.edges[0].node.sponsorDesc4,
            }
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

    handleSubmit = async () => {
        const sponsor_name1 = await this.uploadSponsorMedia('sponsor_image1');
        const sponsor_name2 = await this.uploadSponsorMedia('sponsor_image2');
        const sponsor_name3 = await this.uploadSponsorMedia('sponsor_image3');
        const sponsor_name4 = await this.uploadSponsorMedia('sponsor_image4');
        if (this.create) {
            await this.props.appManager.executeQuery(
                'mutation', createSponsorsQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    link1: sponsor_name1,
                    link2: sponsor_name2,
                    link3: sponsor_name3,
                    link4: sponsor_name4,
                    href_link1: this.state.input_values.http_link1_value,
                    href_link2: this.state.input_values.http_link2_value,
                    href_link3: this.state.input_values.http_link3_value,
                    href_link4: this.state.input_values.http_link4_value,
                    desc1: this.state.input_values.sponsor_desc1_value,
                    desc2: this.state.input_values.sponsor_desc2_value,
                    desc3: this.state.input_values.sponsor_desc3_value,
                    desc4: this.state.input_values.sponsor_desc4_value

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
                    link1: sponsor_name1,
                    link2: sponsor_name2,
                    link3: sponsor_name3,
                    link4: sponsor_name4,
                    href_link1: this.state.input_values.http_link1_value,
                    href_link2: this.state.input_values.http_link2_value,
                    href_link3: this.state.input_values.http_link3_value,
                    href_link4: this.state.input_values.http_link4_value,
                    desc1: this.state.input_values.sponsor_desc1_value,
                    desc2: this.state.input_values.sponsor_desc2_value,
                    desc3: this.state.input_values.sponsor_desc3_value,
                    desc4: this.state.input_values.sponsor_desc4_value
                }
            );
            toast.success('Sponsors Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }
    uploadSponsorMedia = (field) => {
        return new Promise((resolve) => {
            if (this.logo_files[field]) {
                const formData = new FormData();
                formData.append('images', this.logo_files[field]);
                axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((x) => {
                    resolve(x.data.Location);
                });
            } else {
                resolve(this.state[field]);
            }
        });
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
    render() {
        return (
            <div style={{ width: 'calc(100vw - 380px)' }}>
                <OrganizationAdminSponsorComponentRender
                    uploadFile={this.uploadFile}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    sponsor_image1={this.state.input_values.sponsor_image1}
                    sponsor_image2={this.state.input_values.sponsor_image2}
                    sponsor_image3={this.state.input_values.sponsor_image3}
                    sponsor_image4={this.state.input_values.sponsor_image4}
                    http_link1_value={this.state.input_values.http_link1_value}
                    http_link2_value={this.state.input_values.http_link2_value}
                    http_link3_value={this.state.input_values.http_link3_value}
                    http_link4_value={this.state.input_values.http_link4_value}
                    sponsor_desc1_value={this.state.input_values.sponsor_desc1_value}
                    sponsor_desc2_value={this.state.input_values.sponsor_desc2_value}
                    sponsor_desc3_value={this.state.input_values.sponsor_desc3_value}
                    sponsor_desc4_value={this.state.input_values.sponsor_desc4_value}
                />
            </div>
        );
    }
}

AdminSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminSponsorController));

