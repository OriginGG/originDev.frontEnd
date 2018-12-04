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
        modal_open: false,
        main_image_src: null,
        reader_image_src: null,
        jumbotron_image_src: null,
        sponsor_image_src: null,
        news_image_src: null,
        roster_image_src: null,
        media_image_src: null
    }
    componentDidMount = () => {
        let choosen_theme = 'enigma';
        let obliviot_dark = { borderColor: 'transparent' };
        let obliviot_light = { borderColor: 'transparent' };
        let enigma_dark = { borderColor: 'transparent' };
        let enigma_light = { borderColor: 'transparent' };
        let felzec_light = { borderColor: 'transparent', };
        this.setState({
            reader_image_src: null,
            jumbotron_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData,
            main_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageMainData,
            sponsor_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageSponsorData,
            news_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageNewsData,
            roster_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageRostersData,
            matches_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageMatchesData,
            media_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageMediaData,
        });
        this.file_uploaded = false;
        this.selected_theme = this.props.uiStore.current_organisation.themeId;
        this.selected_base_theme = this.props.uiStore.current_organisation.themeBaseId;
        console.log(`theme is ${this.selected_base_theme}/${this.selected_theme}`);
        if (this.selected_base_theme === 'enigma') {
            choosen_theme = 'enigma';
            if (this.selected_theme === 'light') {
                enigma_dark = { borderColor: 'transparent' };
                enigma_light = { borderColor: '#0a9ab4' };
            } else {
                enigma_dark = { borderColor: '#0a9ab4' };
                enigma_light = { borderColor: 'transparent' };
            }
        } else if (this.selected_base_theme === 'obliviot') {
            choosen_theme = 'obliviot';
            if (this.selected_theme === 'light') {
                obliviot_dark = { borderColor: 'transparent' };
                obliviot_light = { borderColor: '#0a9ab4' };
            } else {
                obliviot_dark = { borderColor: '#0a9ab4' };
                obliviot_light = { borderColor: 'transparent' };
            }
        } else {
            choosen_theme = 'felzec';
            if (this.selected_theme === 'light') {
                felzec_light = { borderColor: '#0a9ab4' };
            } else {
                felzec_light = { borderColor: '#0a9ab4' };
            }
        }
        this.setState({
            choosen_theme, enigma_dark, enigma_light, obliviot_dark, obliviot_light, felzec_light
        });
    }
    editImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({
            modal_open: true, jumbotron_image_src: im, reader_image_src: im, image_type: 'jumbo'
        });
    }
    editMainImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageMainData;
        this.setState({
            modal_open: true, main_image_src: im, reader_image_src: im, image_type: 'main'
        });
    }
    editSponsorImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageSponsorData;
        this.setState({
            modal_open: true, sponsor_image_src: im, reader_image_src: im, image_type: 'sponsor'
        });
    }
    editNewsImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageNewsData;
        this.setState({
            modal_open: true, news_image_src: im, reader_image_src: im, image_type: 'news'
        });
    }
    editMatchessImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageMatchesData;
        this.setState({
            modal_open: true, matches_image_src: im, reader_image_src: im, image_type: 'matches'
        });
    }
    editRostersImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageRostersData;
        this.setState({
            modal_open: true, roster_image_src: im, reader_image_src: im, image_type: 'roster'
        });
    }
    editMediaImage = () => {
        const im = this.props.uiStore.current_theme_structure.main_section.background.imageMediaData;
        this.setState({
            modal_open: true, media_image_src: im, reader_image_src: im, image_type: 'media'
        });
    }
    handleImageClick = (u) => {
        this.setState({ reader_image_src: u });
        this.file_uploaded = false;
    }
    uploadFile = (e) => {
        const { files } = e.target;
        this.logo_files = files[0];          // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ reader_image_src: x });
            this.file_uploaded = true;
        };
    }
    cancelModal = () => {
        this.setState({ modal_open: false });
        this.file_uploaded = false;
    }
    saveModal = async () => {
        if (!this.file_uploaded) {
            if (this.state.reader_image_src) {
                console.log(`image_type = ${this.state.image_type}`);
                const i = this.state.reader_image_src;
                if (this.state.image_type === 'jumbo') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageData = this.state.reader_image_src;
                    this.setState({ jumbotron_image_src: i });
                }
                if (this.state.image_type === 'main') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageSponsorData = this.state.reader_image_src;
                    this.setState({ main_image_src: i, modal_open: false });
                }
                if (this.state.image_type === 'sponsor') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageSponsorData = this.state.reader_image_src;
                    this.setState({ sponsor_image_src: i, modal_open: false });
                }
                if (this.state.image_type === 'news') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageNewsData = this.state.reader_image_src;
                    this.setState({ news_image_src: i, modal_open: false });
                }
                if (this.state.image_type === 'roster') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageRostersData = this.state.reader_image_src;
                    this.setState({ roster_image_src: i, modal_open: false });
                }
                if (this.state.image_type === 'matches') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageMatchesData = this.state.reader_image_src;
                    this.setState({ matches_image_src: i, modal_open: false });
                }
                if (this.state.image_type === 'media') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageMediaData = this.state.reader_image_src;
                    this.setState({ media_image_src: i, modal_open: false });
                }
                const s = toJS(this.props.uiStore.current_theme_structure);
                console.log(`const s = ${JSON.stringify(s)}`);
                await this.props.appManager.executeQuery('mutation', updateThemeQuery, { themeName: this.props.uiStore.current_organisation.subDomain, themeStructure: JSON.stringify(s) });
                this.setState({ modal_open: false });
                toast.success('Image(s) updated !', {
                    position: toast.POSITION.TOP_LEFT
                });
            }
        } else {
            if (this.logo_files) {
                const lf = await this.uploadtoCloudinary(this.state.image_type);
                if (this.state.image_type === 'jumbo') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageData = lf;
                    this.setState({ jumbotron_image_src: lf });
                }
                if (this.state.image_type === 'sponsor') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageSponsorData = lf;
                    this.setState({ sponsor_image_src: lf });
                }
                if (this.state.image_type === 'main') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageMainData = lf;
                    this.setState({ main_image_src: lf });
                }
                if (this.state.image_type === 'news') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageNewsData = lf;
                    this.setState({ news_image_src: lf });
                }
                if (this.state.image_type === 'roster') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageRostersData = lf;
                    this.setState({ roster_image_src: lf });
                }
                if (this.state.image_type === 'matches') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageMatchesData = lf;
                    this.setState({ matches_image_src: lf });
                }
                if (this.state.image_type === 'media') {
                    this.props.uiStore.current_theme_structure.main_section.background.imageMediaData = lf;
                    this.setState({ media_image_src: lf });
                }
                const s = toJS(this.props.uiStore.current_theme_structure);
                await this.props.appManager.executeQuery('mutation', updateThemeQuery, { themeName: this.props.uiStore.current_organisation.subDomain, themeStructure: JSON.stringify(s) });
                this.setState({ reader_image_src: lf, modal_open: false });
                toast.success('Jumbotron updated !', {
                    position: toast.POSITION.TOP_LEFT
                });
            }
            // upload to s3.
        }
    }
    uploadtoCloudinary = (nm) => {
        return new Promise((resolve) => {
            if (this.logo_files) {
                const formData = new FormData();
                formData.append('images', this.logo_files);
                axios.post(`${process.env.REACT_APP_API_SERVER}/c_upload?sub_domain=${this.props.uiStore.current_organisation.subDomain}&theme=${this.selected_theme}&force_name=${nm}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((x) => {
                    resolve(x.data.secure_url);
                });
            } else {
                resolve(null);
            }
        });
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
        // if (this.new_theme !== this.selected_theme) {
        await this.props.appManager.executeQueryAuth(
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
        // }
    }
    handleObliviotLightClick = () => {
        console.log('obliviot light clicked');
        this.setState({ enigma_dark: { borderColor: 'transparent' }, obliviot_dark: { borderColor: 'transparent' } });
        this.setState({ enigma_light: { borderColor: 'transparent' }, obliviot_light: { borderColor: '#0a9ab4' } });
        this.setState({ felzec_light: { borderColor: 'transparent' } });
        this.setState({ choosen_theme: 'obliviot' });
        this.new_theme = 'light';
    }
    handleObliviotDarkClick = () => {
        console.log('obliviot dark clicked');
        this.setState({ enigma_dark: { borderColor: 'transparent' }, obliviot_dark: { borderColor: '#0a9ab4' } });
        this.setState({ enigma_light: { borderColor: 'transparent' }, obliviot_light: { borderColor: 'transparent' } });
        this.setState({ felzec_light: { borderColor: 'transparent' } });
        this.setState({ choosen_theme: 'obliviot' });
        this.new_theme = 'dark';
    }
    handleEnigmaDarkClick = () => {
        console.log('enigma dark clicked');
        this.setState({ enigma_dark: { borderColor: '#0a9ab4' }, obliviot_dark: { borderColor: 'transparent' } });
        this.setState({ enigma_light: { borderColor: 'transparent' }, obliviot_light: { borderColor: 'transparent' } });
        this.setState({ felzec_light: { borderColor: 'transparent' } });
        this.setState({ choosen_theme: 'enigma' });
        this.new_theme = 'dark';
    }
    handleEnigmaLightClick = () => {
        console.log('enigma light clicked');
        this.setState({ enigma_dark: { borderColor: 'transparent' }, obliviot_dark: { borderColor: 'transparent' } });
        this.setState({ enigma_light: { borderColor: '#0a9ab4' }, obliviot_light: { borderColor: 'transparent' } });
        this.setState({ felzec_light: { borderColor: 'transparent' } });
        this.setState({ choosen_theme: 'enigma' });
        this.new_theme = 'light';
    }
    handleFelzecLightClick = () => {
        console.log('felzec light clicked');
        this.setState({ enigma_dark: { borderColor: 'transparent' }, obliviot_dark: { borderColor: 'transparent' } });
        this.setState({ enigma_light: { borderColor: 'transparent' }, obliviot_light: { borderColor: 'transparent' } });
        this.setState({ felzec_light: { borderColor: '#0a9ab4' } });
        this.setState({ choosen_theme: 'felzec' });
        this.new_theme = 'light';
    }
    render() {
        let md = <OrganizationAdminThemeComponentRender
            editImage={this.editImage}
            editNewsImage={this.editNewsImage}
            editSponsorImage={this.editSponsorImage}
            editMainImage={this.editMainImage}
            editMatchessImage={this.editMatchessImage}
            editMediaImage={this.editMediaImage}
            editRostersImage={this.editRostersImage}
            image_src={this.state.jumbotron_image_src}
            image_sponsor_src={this.state.sponsor_image_src}
            image_main_src={this.state.main_image_src}
            image_news_src={this.state.news_image_src}
            image_rosters_src={this.state.roster_image_src}
            image_matches_src={this.state.matches_image_src}
            image_media_src={this.state.media_image_src}
            handleSubmit={this.handleSubmit}
            handleObliviotLightClick={this.handleObliviotLightClick}
            handleObliviotDarkClick={this.handleObliviotDarkClick}
            handleEnigmaDarkClick={this.handleEnigmaDarkClick}
            handleEnigmaLightClick={this.handleEnigmaLightClick}
            handleFelzecLightClick={this.handleFelzecLightClick}
            obliviot_light_style={this.state.obliviot_light}
            obliviot_dark_style={this.state.obliviot_dark}
            enigma_dark_style={this.state.enigma_dark}
            enigma_light_style={this.state.enigma_light}
            felzec_light_style={this.state.felzec_light}
            enigma_dark_image="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
            enigma_light_image="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
            obliviot_dark_image="https://s3.amazonaws.com/origin-images/origin/obliviot-dark-theme.jpg"
            obliviot_light_image="https://s3.amazonaws.com/origin-images/origin/obliviot-light-theme.jpg"
            felzec_light_image="https://s3.amazonaws.com/origin-images/origin/obliviot-light-theme.jpg"
        />;
        if (this.state.modal_open) {
            md = <div>
                <OrganizationAdminThemeModalComponentRender
                    handleImageClick={this.handleImageClick}
                    cancelModal={this.cancelModal}
                    saveModal={this.saveModal}
                    uploadFile={this.uploadFile}

                    preview_image={this.state.reader_image_src}

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

