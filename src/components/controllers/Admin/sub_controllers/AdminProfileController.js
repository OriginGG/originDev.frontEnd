import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { toJS } from 'mobx';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrganizationAdminProfileComponentRender from '../../../render_components/admin/OrganizationAdminProfileComponentRender';
import { updateOrganisationQuery, getOrganisationQuery } from '../../../../queries/organisation';
import { updateThemeQuery } from '../../../../queries/themes';

class AdminProfileController extends Component {
    state = {
        input_values: {
            insta_value: '',
            twitch_value: '',
            twitter_value: '',
            youtube_value: '',
            company_store_value: '',
            company_name_value: '',
            facebook_value: '',
            twitter_username_value: '',
            rss_value: '',
            primary_color_value: '',
            logo_src: null
        }
    };
    componentDidMount() {
        this.upload_file = false;
        this.setState({
            input_values: {
                insta_value: this.getInputValue(this.props.uiStore.current_organisation.instaLink),
                twitter_value: this.getInputValue(this.props.uiStore.current_organisation.twitterLink),
                twitch_value: this.getInputValue(this.props.uiStore.current_organisation.twitchLink),
                youtube_value: this.getInputValue(this.props.uiStore.current_organisation.youtubeLink),
                company_name_value: this.getInputValue(this.props.uiStore.current_organisation.name),
                company_store_value: this.getInputValue(this.props.uiStore.current_organisation.companyStoreLink),
                facebook_value: this.getInputValue(this.props.uiStore.current_organisation.fbLink),
                twitter_username_value: this.getInputValue(this.props.uiStore.current_organisation.twitterFeedUsername),
                rss_value: '',
                primary_color_value: this.getInputValue(this.props.uiStore.current_organisation.primaryColor),
                logo_src: this.props.uiStore.current_theme_structure.header.logo.imageData
            }
        });
    }
    getInputValue = (i) => {
        return i === null ? '' : i;
    }
    isURL = (str)  => {
        // console.log(`string is ${str}`);
        return str.includes('http');
    }
    handleSubmit = async () => {
        if (!this.isURL(this.state.input_values.facebook_value) && this.state.input_values.facebook_value) {
            toast.error('Facebook URL is not valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.youtube_value) && this.state.input_values.youtube_value) {
            toast.error('Youtube URL is not valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.twitter_value) && this.state.input_values.twitter_value) {
            toast.error('Twitter URL is not valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.insta_value) && this.state.input_values.insta_value) {
            toast.error('Instagram URL is not valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (!this.isURL(this.state.input_values.company_store_value) && this.state.input_values.company_store_value) {
            toast.error('Company Store URL is not valid', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (this.isURL(this.state.input_values.twitch_value) && this.state.input_values.twitch_value) {
            toast.error('Twitch Handle not Valid Format', {
                position: toast.POSITION.TOP_LEFT
            });
            return;
        }
        if (this.upload_file) {
            const logo_data = await this.uploadLogo();
            const s = toJS(this.props.uiStore.current_theme_structure);
            s.header.logo.imageData = logo_data.Location;
            this.props.uiStore.current_theme_structure.header.logo.imageData = logo_data.Location;
            try {
                await this.props.appManager.executeQuery('mutation', updateThemeQuery, { themeName: this.props.uiStore.current_organisation.subDomain, themeStructure: JSON.stringify(s) });
            } catch (err) {
                this.props.appManager.networkError();
            }
        }
        try {
            await this.props.appManager.executeQuery(
                'mutation', updateOrganisationQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    companyStoreLink: this.state.input_values.company_store_value,
                    name: this.state.input_values.company_name_value,
                    fbLink: this.state.input_values.facebook_value,
                    youtubeLink: this.state.input_values.youtube_value,
                    twitterLink: this.state.input_values.twitter_value,
                    instaLink: this.state.input_values.insta_value,
                    twitterFeedUsername: this.state.input_values.twitter_username_value,
                    twitchLink: this.state.input_values.twitch_value,
                    primaryColor: this.state.input_values.primary_color_value
                }
            );
            const o = await this.props.appManager.executeQuery('query', getOrganisationQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            this.props.uiStore.setOrganisation(o.resultData);
            toast.success('Company Details updated !', {
                position: toast.POSITION.TOP_LEFT
            });
        } catch (err) {
            this.props.appManager.networkError();
        }
    }
    uploadLogo = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            formData.append('images', this.logo_files);
            axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((x) => {
                resolve(x.data);
            });
        });
    }
    uploadFile = (e) => {
        this.logo_files = e[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            const p = this.state.input_values;
            p.logo_src = x;
            this.setState({ input_values: p });
            this.upload_file = true;
        };
    }
    handleChange = (field, e) => {
        const v = e.target.value;
        const p = this.state.input_values;
        p[field] = v;
        this.setState({
            input_values: p
        });
    }

    handleFileClick = () => {
        this.dropzoneRef.open();
    }
    render() {
        return (
            <div style={{
                width: 'calc(100vw - 380px)'
            }}>
                <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                <OrganizationAdminProfileComponentRender
                    company_name_value={this.state.input_values.company_name_value}
                    company_store_value={this.state.input_values.company_store_value}
                    logo_src={this.state.input_values.logo_src}
                    primary_color_value={this.state.input_values.primary_color_value}
                    handleChange={this.handleChange}
                    youtube_value={this.state.input_values.youtube_value}
                    twitter_value={this.state.input_values.twitter_value}
                    twitch_value={this.state.input_values.twitch_value}
                    insta_value={this.state.input_values.insta_value}
                    facebook_value={this.state.input_values.facebook_value}
                    twitter_username_value={this.state.input_values.twitter_username_value}
                    rss_value={this.state.input_values.rss_value}
                    handleSubmit={this.handleSubmit}
                    handleFileClick={this.handleFileClick}
                />
            </div>);
    }
}

AdminProfileController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminProfileController));

