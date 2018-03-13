import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationNavComponentRender from '../../../render_components/OrganizationNavComponentRender';

class OrganizationNavController extends Component {
    componentWillMount() {
        this.image_src = this.props.uiStore.current_theme_structure.header.logo.imageData;
    }
    render() {
        return <OrganizationNavComponentRender image_src={this.image_src} />;
    }
}


OrganizationNavController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNavController));
