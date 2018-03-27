import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import OriginLandingPageComponentRender from '../../render_components/OriginLandingPageComponentRender';

class OriginLandingPageController extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.uiStore.origin_theme_data}>
                <OriginLandingPageComponentRender />
            </ThemeProvider>
        );
    }
}

OriginLandingPageController.propTypes = {
    uiStore: PropTypes.object.isRequired,
};
export default inject('uiStore')(injectSheet(GlobalStyles)(OriginLandingPageController));

