/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationSponserComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    height: '70px',
                    width: '99%',
                    borderBottom: '2px solid rgb(120,120,120)'
                }}>
                    <div style={{
                        marginTop: '0px',
                        height: '70px',
                        borderBottomColor: 'rgb(120,120,120)',
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'solid'
                    }} className="ui stackable four column grid">{this.props.sponsor_content}</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationSponserComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationSponserComponentRender )