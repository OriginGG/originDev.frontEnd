import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationLogoComponentRender from '../../../render_components/OrganizationLogoComponentRender';

class OrganizationLogoController extends Component {
    componentWillMount() {
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
    }
    render() {
        return <OrganizationLogoComponentRender image_src={this.image_src} />;
    }
}

OrganizationLogoController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationLogoController));
