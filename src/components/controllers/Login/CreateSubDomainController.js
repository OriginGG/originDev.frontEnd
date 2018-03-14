import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
import { GlobalStyles } from 'Theme/Theme';
import { createOrganisationQuery } from '../../../queries/organisation';
import CreateSubDomainComponentRender from '../../render_components/CreateSubDomainComponentRender';
import { updateUserQuery } from '../../../queries/users';
import { createThemeQuery } from '../../../queries/themes';

class CreateSubDomainController extends Component {
    componentWillMount() {
        const authPayload = this.props.appManager.GetQueryParams('p');
        const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
        this.authPayload = p;
        const token = p.authenticate.resultData.jwtToken;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const d = JSON.parse(window.atob(base64));
        const { id } = d;
        this.user_id = id;
    }
    handleDomainChange = e => {
        const v = e.target.value;
        this.domain_name = v;
    }
    uploadFile = (e) => {
        const { files } = e.target;
        this.logo_files = files[0];                 // eslint-disable-line
    }
    handleSubmit = async () => {
        if (this.domain_name) {
            const t = {
                themeName: this.domain_name,
                themeStructure: JSON.stringify(toJS(this.props.uiStore.origin_theme_structure)),
                themeData: JSON.stringify(toJS(this.props.uiStore.origin_theme_data))
            };
            await this.props.appManager.executeQuery('mutation', createOrganisationQuery, { subDomain: this.domain_name });
            await this.props.appManager.executeQuery('mutation', updateUserQuery, { id: this.user_id, organisation: this.domain_name });
            await this.props.appManager.executeQuery('mutation', createThemeQuery, t);
            const domainInfo = this.props.appManager.getDomainInfo();
            const new_payload = Object.assign(this.authPayload, {});
            new_payload.authenticate.resultData.organisation = this.domain_name;
            const payload = Buffer.from(JSON.stringify(new_payload), 'utf8').toString('hex');
            const u_string = `${domainInfo.protocol}//${this.domain_name}.${domainInfo.hostname}:${domainInfo.port}?p=${payload}`;
            window.location = u_string;
            // create a domain and theme here.
        }
    }
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <CreateSubDomainComponentRender
                    dark_theme_image_src="https://s3.amazonaws.com/origin-images/origin/dark-theme.jpg"
                    light_theme_image_src="https://s3.amazonaws.com/origin-images/origin/light-theme.jpg"
                    header_image_src="https://s3.amazonaws.com/origin-images/origin/logo-top.png"
                    handleDomainChange={this.handleDomainChange}
                    handleSubmit={this.handleSubmit}
                    uploadFile={this.uploadFile}
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

