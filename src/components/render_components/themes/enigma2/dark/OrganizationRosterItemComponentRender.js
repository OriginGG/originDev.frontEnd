/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationRosterItemComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_staff_image_container}>
                <img className={this.props.classes.felzec_staff_image} onMouseOver={( ) => {
                    this
                        .props
                        .handle_mouseover( this.props.felzec_overlay_style );
                }} src={this.props.roster_image}/>
                <div className={this.props.classes.felzec_staff_overlay} onMouseOut={( ) => {
                    this
                        .props
                        .handle_mouseout( this.props.felzec_overlay_style );
                }} style={this.props.felzec_overlay_style}>
                    <div className={this.props.classes.felzec_team_overlay_name}>{this.props.roster_name}</div>
                    <div className={this.props.classes.felzec_team_overlay_handle}>{this.props.roster_nickname}</div>
                    <div className={this.props.classes.felzec_team_overlay_button} onClick={( ) => {
                        this
                            .props
                            .handleIndividualClick( this );
                    }}>PROFILE</div>
                </div>
            </div>
        )
    }
}

DarkOrganizationRosterItemComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationRosterItemComponentRender )