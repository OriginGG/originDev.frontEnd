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
        let choosen_theme = 'enigma';
        let obliviot_dark = { borderWidth: '0px' };
        let obliviot_light = { borderWidth: '0px' };
        let enigma_dark = { borderWidth: '0px' };
        let enigma_light = { borderWidth: '0px' };
        this.setState({ preview_image_src: null, image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData });
        this.file_uploaded = false;
        this.selected_theme = this.props.uiStore.current_organisation.themeId;
        this.selected_base_theme = this.props.uiStore.current_organisation.themeBaseId;
        console.log(`theme is ${this.selected_base_theme}/${this.selected_theme}`);
        if (this.selected_base_theme === 'enigma') {
            choosen_theme = 'enigma';
            if (this.selected_theme === 'light') {
                enigma_dark = { borderWidth: '0px' };
                enigma_light = { borderWidth: '4px' };
            } else {
                enigma_dark = { borderWidth: '4px' };
                enigma_light = { borderWidth: '0px' };
            }
        } else {
            choosen_theme = 'obliviot';
            if (this.selected_theme === 'light') {
                obliviot_dark = { borderWidth: '0px' };
                obliviot_light = { borderWidth: '4px' };
            } else {
                obliviot_dark = { borderWidth: '4px' };
                obliviot_light = { borderWidth: '0px' };
            }
        }
        this.setState({
            choosen_theme, enigma_dark, enigma_light, obliviot_dark, obliviot_light, preview_image_src: null, image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData
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
                    themeId: this.new_theme,
                    themeBaseId: this.state.choosen_theme
                }
            );
            this.props.uiStore.current_organisation.themeId = this.new_theme;
            this.props.uiStore.current_organisation.themeBaseId = this.state.choosen_theme;
            toast.success('Theme updated !', {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }
    handleObliviotLightClick = () => {
        console.log('obliviot light clicked');
        this.setState({ enigma_dark: { borderWidth: '0px' }, obliviot_dark: { borderWidth: '0px' } });
        this.setState({ enigma_light: { borderWidth: '0px' }, obliviot_light: { borderWidth: '4px' } });
        this.setState({ choosen_theme: 'obliviot' });
        this.new_theme = 'light';
    }
    handleObliviotDarkClick = () => {
        console.log('obliviot dark clicked');
        this.setState({ enigma_dark: { borderWidth: '0px' }, obliviot_dark: { borderWidth: '4px' } });
        this.setState({ enigma_light: { borderWidth: '0px' }, obliviot_light: { borderWidth: '0px' } });
        this.setState({ choosen_theme: 'obliviot' });
        this.new_theme = 'dark';
    }
    handleEnigmaDarkClick = () => {
        console.log('enigma dark clicked');
        this.setState({ enigma_dark: { borderWidth: '4px' }, obliviot_dark: { borderWidth: '0px' } });
        this.setState({ enigma_light: { borderWidth: '0px' }, obliviot_light: { borderWidth: '0px' } });
        this.setState({ choosen_theme: 'enigma' });
        this.new_theme = 'dark';
    }
    handleEnigmaLightClick = () => {
        console.log('enigma light clicked');
        this.setState({ enigma_dark: { borderWidth: '0px' }, obliviot_dark: { borderWidth: '0px' } });
        this.setState({ enigma_light: { borderWidth: '4px' }, obliviot_light: { borderWidth: '0px' } });
        this.setState({ choosen_theme: 'enigma' });
        this.new_theme = 'light';
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
            obliviot_light_style={this.state.obliviot_light}
            obliviot_dark_style={this.state.obliviot_dark}
            enigma_dark_style={this.state.enigma_dark}
            enigma_light_style={this.state.enigma_light}
            enigma_dark_image="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
            enigma_light_image="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
            obliviot_dark_image="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
            obliviot_light_image="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
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
