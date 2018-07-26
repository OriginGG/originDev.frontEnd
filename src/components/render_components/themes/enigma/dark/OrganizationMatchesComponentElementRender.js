/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentElementRender extends Component {
    render( ) {
        return (
            <div>
                <img size="40" style={{
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    borderRadius: '0px',
                    height: '40px',
                    width: '40px'
                }} src={this.props.matches_image_1}/>
                <br/>
                <img size="40" style={{
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    borderRadius: '0px',
                    height: '40px',
                    width: '40px'
                }} src={this.props.matches_image_2}/>
                <br/>
                <span >{this.props.matches_score}</span>
            </div>
        )
    }
}

DarkOrganizationMatchesComponentElementRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentElementRender )