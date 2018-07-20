import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrganizationAdminThemeComponentRender from '../../../render_components/admin/OrganizationAdminNewThemeComponentRender';
import OrganizationAdminThemeModalComponentRender from '../../../render_components/admin/OrganizationAdminThemeModalComponentRender';
import { updateThemeQuery } from '../../../../queries/themes';
import { updateOrganisationQuery } from '../../../../queries/organisation';

class AdminThemeController extends Component {
    state = {
        modal_open: false, preview_image_src: null, image_src: null
    }
    componentDidMount = () => {
        let obliviot_dark = 'border-color:rgba(0,0,0,0)';
        let obliviot_light = 'border-color:rgba(0,0,0,0)';
        let enigma_dark = 'border-color:rgba(0,0,0,0)';
        let enigma_light = 'border-color:rgba(0,0,0,0)';
        this.setState({ preview_image_src: null, image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData });
        this.file_uploaded = false;
        this.selected_theme = this.props.uiStore.current_organisation.themeId;
        if (this.selected_theme === 'light') {
            enigma_dark = 'border-color:rgba(0,0,0,0)';
            obliviot_dark = 'border-color:rgba(0,0,0,0)';
            obliviot_light = 'border-color:rgba(0,0,0,0)';
            enigma_light = 'border-color:blue';
        } else {
            enigma_dark = 'border-color:blue';
            obliviot_dark = 'border-color:rgba(0,0,0,0)';
            obliviot_light = 'border-color:rgba(0,0,0,0)';
            enigma_light = 'border-color:rgba(0,0,0,0)';
        }
        this.setState({
            enigma_dark, enigma_light, obliviot_dark, obliviot_light, preview_image_src: null, image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData
        });
    }
    editImage = () => {
        this.setState({ modal_open: true, preview_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData });
    }
    handleImageClick = (u) => {
        this.setState({ preview_image_src: u });
        this.file_uploaded = false;
    }
    uploadFile = (e) => {
        const { files } = e.target;
        this.logo_files = files[0];          // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ preview_image_src: x });
            this.file_uploaded = true;
        };
    }
    cancelModal = () => {
        this.setState({ modal_open: false });
        this.file_uploaded = false;
    }
    saveModal = async () => {
        if (!this.file_uploaded) {
            if (this.state.preview_image_src) {
                this.props.uiStore.current_theme_structure.main_section.background.imageData = this.state.preview_image_src;
                const s = toJS(this.props.uiStore.current_theme_structure);
                await this.props.appManager.executeQuery('mutation', updateThemeQuery, { themeName: this.props.uiStore.current_organisation.subDomain, themeStructure: JSON.stringify(s) });
                const i = this.state.preview_image_src;
                this.setState({ image_src: i, modal_open: false });
                toast.success('Jumbotron updated !', {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        } else {
            if (this.logo_files) {
                const lf = await this.uploadtoS3();
                this.props.uiStore.current_theme_structure.main_section.background.imageData = lf;
                const s = toJS(this.props.uiStore.current_theme_structure);
                await this.props.appManager.executeQuery('mutation', updateThemeQuery, { themeName: this.props.uiStore.current_organisation.subDomain, themeStructure: JSON.stringify(s) });
                this.setState({ image_src: lf, modal_open: false });
                toast.success('Jumbotron updated !', {
                    position: toast.POSITION.TOP_LEFT
                });
            }
            // upload to s3.
        }
    }
    uploadtoS3 = () => {
        return new Promise((resolve) => {
            if (this.logo_files) {
                const formData = new FormData();
                formData.append('images', this.logo_files);
                axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
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
    handleSubmit = async () => {
        if (this.new_theme !== this.selected_theme) {
            await this.props.appManager.executeQuery(
                'mutation', updateOrganisationQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain,
                    themeId: this.new_theme
                }
            );
            this.props.uiStore.current_organisation.themeId = this.new_theme;
            toast.success('Theme updated !', {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }
    handleObliviotLightClick = () => {
        console.log('obliviot light clicked');
        this.enigma_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_light = 'border-color:blue';
        this.enigma_light = 'border-color:rgba(0,0,0,0)';
    }
    handleObliviotDarkClick = () => {
        console.log('obliviot dark clicked');
        this.enigma_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_dark = 'border-color:blue';
        this.obliviot_light = 'border-color:rgba(0,0,0,0)';
        this.enigma_light = 'border-color:rgba(0,0,0,0)';
    }
    handleEnigmaDarkClick = () => {
        console.log('enigma dark clicked');
        this.enigma_dark = 'border-color:blue';
        this.obliviot_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_light = 'border-color:rgba(0,0,0,0)';
        this.enigma_light = 'border-color:rgba(0,0,0,0)';
    }
    handleEnigmaLightClick = () => {
        console.log('enigma light clicked');
        this.enigma_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_dark = 'border-color:rgba(0,0,0,0)';
        this.obliviot_light = 'border-color:rgba(0,0,0,0)';
        this.enigma_light = 'border-color:blue';
    }
    render() {
        let md = <OrganizationAdminThemeComponentRender
            editImage={this.editImage}
            image_src={this.state.image_src}
            handleSubmit={this.handleSubmit}
            handleObliviotLightClick={this.handleObliviotLightClick}
            handleObliviotDarkClick={this.handleObliviotDarkClick}
            handleEnigmaDarkClick={this.handleEnigmaDarkClick}
            handleEnigmaLightClick={this.handleEnigmaLightClick}
            obliviot_light_style={this.obliviot_light}
            obliviot_dark_style={this.obliviot_dark}
            enigma_dark_style={this.enigma_dark}
            enigma_light_style={this.enigma_light}
        />;
        if (this.state.modal_open) {
            md = <div>
                <OrganizationAdminThemeModalComponentRender
                    handleImageClick={this.handleImageClick}
                    cancelModal={this.cancelModal}
                    saveModal={this.saveModal}
                    uploadFile={this.uploadFile}

                    preview_image={this.state.preview_image_src}

                    default_image1="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg1.jpg"
                    default_image2="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg2.jpg"
                    default_image3="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg"
                />
            </div>;
        }
        return (
            <div
                style={{ height: '100vh', width: 'calc(100vw - 420px)' }}
                ref={(c) => {
                    this.modal_ref = c;
                }}>
                {md}
            </div>
        );
    }
}

AdminThemeController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminThemeController));

