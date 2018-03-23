import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import OrganizationAdminSponsorComponentRender from '../../../render_components/OrganizationAdminSponserComponentRender';
import { getSponsorsQuery, updateSponsorsQuery, createSponsorsQuery } from '../../../../queries/sponsors';

class AdminSponsorController extends Component {
    state = {
        input_values: {
            sponsor_image1: null,
            sponsor_image2: null,
            sponsor_image3: null,
            sponsor_image4: null
        }
    };
    componentWillMount = async () => {
        this.create = false;
        this.logo_files = {};
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        if (sponsor_data.resultData.edges.length === 0) {
            this.create = true;
        } else {
            this.c_id = sponsor_data.resultData.edges[0].node.id;
            this.setState({
                input_values: {
                    sponsor_image1: sponsor_data.resultData.edges[0].node.sponsor1,
                    sponsor_image2: sponsor_data.resultData.edges[0].node.sponsor2,
                    sponsor_image3: sponsor_data.resultData.edges[0].node.sponsor3,
                    sponsor_image4: sponsor_data.resultData.edges[0].node.sponsor4
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

    handleSubmit = async () => {
        const sponsor_name1 = await this.uploadSponsorMedia('sponsor_image1');
        const sponsor_name2 = await this.uploadSponsorMedia('sponsor_image2');
        const sponsor_name3 = await this.uploadSponsorMedia('sponsor_image3');
        const sponsor_name4 = await this.uploadSponsorMedia('sponsor_image4');
        if (this.create) {
            await this.props.appManager.executeQueryAuth(
                'mutation', createSponsorsQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    link1: sponsor_name1,
                    link2: sponsor_name2,
                    link3: sponsor_name3,
                    link4: sponsor_name4,
                }
            );
            toast.success('Sponsors Updated!', {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            await this.props.appManager.executeQueryAuth(
                'mutation', updateSponsorsQuery,
                {
                    id: this.c_id,
                    link1: sponsor_name1,
                    link2: sponsor_name2,
                    link3: sponsor_name3,
                    link4: sponsor_name4
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
                axios.post(`${process.env.REACT_APP_IMAGE_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
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
            <div>
                <OrganizationAdminSponsorComponentRender
                    uploadFile={this.uploadFile}
                    handleSubmit={this.handleSubmit}
                    sponsor_image1={this.state.input_values.sponsor_image1}
                    sponsor_image2={this.state.input_values.sponsor_image2}
                    sponsor_image3={this.state.input_values.sponsor_image3}
                    sponsor_image4={this.state.input_values.sponsor_image4}
                />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

AdminSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminSponsorController));

