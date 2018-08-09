import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import { createOrganisationQuery, getOrganisationByName } from '../../../queries/organisation';
import CreateSubDomainComponentRender from '../../render_components/signup/CreateSubDomainComponentRender';
import { updateUserQuery, getUserQuery } from '../../../queries/users';
import { createThemeQuery, getThemeQuery } from '../../../queries/themes';
import { createSponsorsQuery } from '../../../queries/sponsors';
import { createPageQuery } from '../../../queries/pages';

class CreateSubDomainController extends Component {
    state = {
        visible: false, image_src: null, theme1_select_style: {}, theme2_select_style: {}
    };
    componentDidMount = async () => {
        const authPayload = this.props.appManager.GetQueryParams('p');
        if (authPayload) {
            const originTheme = await this.props.appManager.executeQuery('query', getThemeQuery, { subDomain: 'origin' });
            this.props.uiStore.setOriginTheme(originTheme.resultData);
            const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
            this.authPayload = p;
            const token = p.authenticate.resultData.jwtToken;
            const d = this.props.appManager.decodeJWT(token);
            const { id } = d;
            this.user_id = id;
            const user = await this.props.appManager.executeQuery('query', getUserQuery, { id });
            this.name = user.resultData.firstName;
            // this.props.uiStore.setCurrentUser(user.resultData);
            this.logo_files = null;
            this.selected_theme = 1;
            const s = {
                border: '1px solid',
                borderColor: 'white',
            };
            this.current_theme = 'dark';
            this.setState({ theme1_select_style: s, visible: true });
        }
    }
    handleDomainChange = e => {
        const v = e.target.value;
        this.domain_name = v;
    }
    uploadFile = (e) => {
        const { files } = e.target;
        this.logo_files = files[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ image_src: x });
        };
    }

    uploadLogo = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            formData.append('images', this.logo_files);
            axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.domain_name}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((x) => {
                resolve(x.data);
            });
        });
    }
    handleSubmit = async () => {
        if (this.domain_name) {
            if (this.domain_name.indexOf(' ') > -1) {
                toast.error('Domain name cannot contain spaces!', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000
                });
            } else {
                // check domain name has n

                const logo_data = await this.uploadLogo();
                const p = toJS(this.props.uiStore.origin_theme_structure);
                p.header.logo.imageData = logo_data.Location;
                const baseId = process.env.REACT_APP_DEFAULT_BASE_THEME;
                const t = {
                    themeName: this.domain_name,
                    themeStructure: JSON.stringify(p),
                    themeData: JSON.stringify(toJS(this.props.uiStore.origin_theme_data))
                };

                // test if domain already exists.

                const exists = await this.props.appManager.executeQuery('query', getOrganisationByName, { subdomain: this.domain_name });
                if (exists.getorganisationbyname.edges.length > 0) {
                    toast.error(`Domain: ${this.domain_name} is already in use, please choose another!`, {
                        position: toast.POSITION.TOP_LEFT,
                        autoClose: 5000
                    });
                } else {
                    await this.props.appManager.executeQuery('mutation', createOrganisationQuery, {
                        themeBaseId: baseId, themeId: this.current_theme, name: this.domain_name, subDomain: this.domain_name
                    });
                    await this.props.appManager.executeQuery('mutation', updateUserQuery, { id: this.user_id, organisation: this.domain_name });
                    await this.props.appManager.executeQuery('mutation', createThemeQuery, t);
                    await this.props.appManager.executeQuery('mutation', createPageQuery, {
                        pageTitle: '',
                        pageContent: '',
                        pageSubtitle: '',
                        pageKey: 'about-us',
                        organisation: this.domain_name
                    });
                    await this.props.appManager.executeQuery('mutation', createSponsorsQuery, {
                        subDomain: this.domain_name,
                        link1: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                        link2: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                        link3: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                        link4: 'https://s3.amazonaws.com/origin-images/origin/sponsor_images/logoSameColor.png',
                    });

                    const domainInfo = this.props.appManager.getDomainInfo();
                    const new_payload = Object.assign(this.authPayload, {});
                    new_payload.authenticate.resultData.organisation = this.domain_name;
                    const payload = Buffer.from(JSON.stringify(new_payload), 'utf8').toString('hex');
                    const u_string = `${domainInfo.protocol}//${this.domain_name}.${domainInfo.hostname}:${domainInfo.port}?p=${payload}`;
                    window.location = u_string;
                }
            }
            // create a domain and theme here.
        }
    }
    handleThemeClick = (t) => {
        const s = {
            border: '1px solid',
            borderColor: 'white',
        };
        if (t === 1) {
            this.current_theme = 'dark';
            this.setState({ theme1_select_style: s, theme2_select_style: {} });
        } else {
            this.current_theme = 'light';
            this.setState({ theme2_select_style: s, theme1_select_style: {} });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <CreateSubDomainComponentRender
                    dark_theme_image_src="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
                    light_theme_image_src="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
                    header_image_src="https://s3.amazonaws.com/origin-images/origin/logo-top.png"
                    handleDomainChange={this.handleDomainChange}
                    handleSubmit={this.handleSubmit}
                    uploadFile={this.uploadFile}
                    upload_img_src={this.state.image_src}
                    namestring={`Welcome, ${this.name}`}
                    theme1_select_style={this.state.theme1_select_style}
                    theme2_select_style={this.state.theme2_select_style}
                    handleThemeClick={this.handleThemeClick}
                />
            </ThemeProvider>
        );
    }
}

CreateSubDomainController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(CreateSubDomainController));

