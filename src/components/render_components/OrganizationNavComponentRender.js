/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationNavComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.nav_header}>
                    <img id="nav_img" src="http://api.originbeta.net/adminTemplate/1518192959017g5034r0j085fewubx1or.png" alt="" className={this.props.classes.nav_img}/>
                </div>
            </div>
        )
    }
}

OrganizationNavComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationNavComponentRender )