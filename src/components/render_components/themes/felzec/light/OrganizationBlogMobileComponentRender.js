/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationBlogMobileComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_lightBlogContainer}>
                <div className={this.props.classes.felzec_blog_m_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.felzec_blog_m_filter_container} style={this.props.filter_style}/>
                <div className={this.props.classes.felzec_blog_mobile_inner_container}>
                    <div className={this.props.classes.felzec_lightBlogMobileContainer} onClick={( ) => {
                        this
                            .props
                            .handleNewsClick( this.props.blog_1 );
                    }}>
                        <img className={this.props.classes.felzec_main_news_item_image} src={this.props.blog_media_1}/>
                        <div className={this.props.classes.obliviot_light_main_news_content_container}>
                            <div>
                                <div style={{
                                    width: '100%',
                                    float: 'left',
                                    paddingRight: '0px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <span className={this.props.classes.obliviot_light_news_title}>{this.props.blog_title_1}</span>
                                </div>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '0px',
                                overflowY: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                <p className={this.props.classes.obliviot_light_news_body}>{this.props.blog_content_1}</p>
                            </div>
                            <div className={this.props.classes.obliviot_light_news_decor}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationBlogMobileComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationBlogMobileComponentRender )