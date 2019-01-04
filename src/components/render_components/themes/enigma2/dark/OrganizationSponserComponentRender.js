/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_sponsor_box} style={this.props.felzec_sponsor_style}>
                    <div className={this.props.classes.felzec_jumbotron_layer}/>
                    <div className={this.props.classes.felzec_sponsor_container}>
                        <div className="ui stackable four column grid">{this.props.sponsor_content}</div>
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