/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.felzec_light_news_row}>
                    <div className={this.props.classes.felzec_light_news_container} onClick={( ) => {
                        this
                            .props
                            .handleNewsClick( this.props.blog );
                    }}>
                        <div className="ui stackable two column grid">
                            <div className="six wide column">
                                <img className={this.props.classes.felzec_main_news_item_micro_image} src={this.props.blog_media}/>
                            </div>
                            <div className="ten wide column">
                                <div style={{
                                    width: '100%',
                                    float: 'left',
                                    paddingRight: '0px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <span className={this.props.classes.felzec_light_news_title}>{this.props.blog_title}</span>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '160px',
                                    overflowY: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <span className={this.props.classes.felzec_light_news_body}>{this.props.blog_content}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNewsComponentRender )