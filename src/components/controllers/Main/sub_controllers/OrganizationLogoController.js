import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationLogoController extends Component {
    state = { visible: false, OrganizationLogoComponentRender: null };

    componentWillMount = async () => {
        const theme = this.props.uiStore.current_organisation.themeId === 'dark' ? 'dark' : 'obliviot';
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationLogoComponentRender = await import(`../../../render_components/themes/${theme}_theme/${theme}_OrganizationLogoComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({ visible: true, OrganizationLogoComponentRender: OrganizationLogoComponentRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationLogoComponentRender } = this.state;
        return <OrganizationLogoComponentRender image_src={this.image_src} />;
    }
}

OrganizationLogoController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationLogoController));
