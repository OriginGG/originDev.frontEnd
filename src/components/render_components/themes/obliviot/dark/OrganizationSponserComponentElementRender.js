/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <div className="column" onClick={this.props.handleClick}>
                    <img className={this.props.classes.obliviot_darkSponserImage} src={this.props.sponsor_image}/>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentElementRender )