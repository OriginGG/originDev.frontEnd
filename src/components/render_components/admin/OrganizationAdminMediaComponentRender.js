/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminMediaComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Media</h2>
                </div>
                <div className={this.props.classes.media_title_box}>
                    <h2>Add YouTube Video Links</h2>
                </div>
                <div className={this.props.classes.admin_social_box}>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Link 1" value={this.props.link1_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'link1_value', e );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Link 2" value={this.props.link2_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'link2_value', e );
                            }}/>
                        </div>
                    </div>
                    <div className={this.props.classes.admin_social_box_inner}>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Link 3" value={this.props.link3_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'link3_value', e );
                            }}/>
                        </div>
                        <div className={this.props.classes.admin_social_box_divider}/>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Link 4" value={this.props.link4_value} onChange={e => {
                                this
                                    .props
                                    .handleChange( 'link4_value', e );
                            }}/>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box} onClick={this.props.handleSubmit}>
                    <div className={this.props.classes.admin_submit_button}>Submit</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminMediaComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminMediaComponentRender )