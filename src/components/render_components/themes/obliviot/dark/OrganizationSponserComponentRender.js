/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui stackable four column grid">
                    <div className="column">
                        <img className={this.props.classes.obliviot_darkSponserImage} src={this.props.sponsor_image1}/>
                    </div>
                    <div className="column">
                        <img className={this.props.classes.obliviot_darkSponserImage} src={this.props.sponsor_image2}/>
                    </div>
                    <div className="column">
                        <img className={this.props.classes.obliviot_darkSponserImage} src={this.props.sponsor_image3}/>
                    </div>
                    <div className="column">
                        <img className={this.props.classes.obliviot_darkSponserImage} src={this.props.sponsor_image4}/>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentRender )