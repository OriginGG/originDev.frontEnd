/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationBlogComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className="ui stackable two column grid">
                    <div style={{
                        width: '66.66%'
                    }} className="column">
                        <div className={this.props.classes.obliviot_lightBlogMaxContainer} onClick={( ) => {
                            this
                                .props
                                .handleNewsClick( this.props.blog_1 );
                        }}>
                            <img className={this.props.classes.obliviot_main_news_item_image} src={this.props.blog_media_1}/>
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
                    <div style={{
                        width: '33.33%'
                    }} className="column">
                        <div className={this.props.classes.obliviot_lightBlogMiniContainer} onClick={( ) => {
                            this
                                .props
                                .handleNewsClick( this.props.blog_2 );
                        }}>
                            <img className={this.props.classes.obliviot_main_news_item_mini_image} src={this.props.blog_media_2}/>
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
                                        <span className={this.props.classes.obliviot_light_news_title}>{this.props.blog_title_2}</span>
                                    </div>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '0px',
                                    overflowY: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <p className={this.props.classes.obliviot_light_news_body}>{this.props.blog_content_2}</p>
                                </div>
                                <div className={this.props.classes.obliviot_light_news_decor}/>
                            </div>
                        </div>
                        <div className={this.props.classes.obliviot_lightBlogMiniContainer} onClick={( ) => {
                            this
                                .props
                                .handleNewsClick( this.props.blog_3 );
                        }}>
                            <img className={this.props.classes.obliviot_main_news_item_mini_image} src={this.props.blog_media_3}/>
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
                                        <span className={this.props.classes.obliviot_light_news_title}>{this.props.blog_title_3}</span>
                                    </div>
                                </div>
                                <div style={{
                                    width: '100%',
                                    height: '0px',
                                    overflowY: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <p className={this.props.classes.obliviot_light_news_body}>{this.props.blog_content_3}</p>
                                </div>
                                <div className={this.props.classes.obliviot_light_news_decor}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationBlogComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationBlogComponentRender )