/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationBlogComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.felzec_lightBlogContainer}>
                <div className={this.props.classes.enigma2_blog_container} style={this.props.bg_style}></div>
                <div className={this.props.classes.enigma2_blog_inner_container}>
                    <div className="ui stackable two column grid">
                        <div style={{
                            paddingRight: '0px',
                            overflow: 'auto'
                        }} className="twelve wide column">
                            <div className={this.props.classes.enigma2_lightBlogMaxContainer} style={this.props.main_blog1} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_1 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_image} src={this.props.blog_media_1}/>
                                <div className={this.props.classes.enigma2_dark_main_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '50px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_large_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_large_news_title}>{this.props.blog_title_1}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.enigma2_lightBlogMaxContainer} style={this.props.main_blog2} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_2 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_image} src={this.props.blog_media_2}/>
                                <div className={this.props.classes.enigma2_dark_main_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '50px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_large_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_large_news_title}>{this.props.blog_title_2}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.enigma2_lightBlogMaxContainer} style={this.props.main_blog3} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_3 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_image} src={this.props.blog_media_3}/>
                                <div className={this.props.classes.enigma2_dark_main_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '50px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_large_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_large_news_title}>{this.props.blog_title_3}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.enigma2_blog_switch_container}>
                                <div className={this.props.classes.enigma2_blog_switch} onClick={( ) => {
                                    this
                                        .props
                                        .handleSwitchClick1( );
                                }} style={this.props.blog_switch1}/>
                                <div className={this.props.classes.enigma2_blog_switch} onClick={( ) => {
                                    this
                                        .props
                                        .handleSwitchClick2( );
                                }} style={this.props.blog_switch2}/>
                                <div className={this.props.classes.enigma2_blog_switch} onClick={( ) => {
                                    this
                                        .props
                                        .handleSwitchClick3( );
                                }} style={this.props.blog_switch3}/>
                            </div>
                        </div>
                        <div style={{
                            paddingLeft: '0px'
                        }} className="four wide column">
                            <div className={this.props.classes.enigma2_lightBlogMiniContainer} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_4 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_mini_image} src={this.props.blog_media_4}/>
                                <div className={this.props.classes.enigma2_dark_mini_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '30px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_mini_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_mini_news_title}>{this.props.blog_title_4}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.enigma2_lightBlogMiniContainer} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_5 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_mini_image} src={this.props.blog_media_5}/>
                                <div className={this.props.classes.enigma2_dark_mini_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '30px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_mini_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_mini_news_title}>{this.props.blog_title_5}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.enigma2_lightBlogMiniContainer} onClick={( ) => {
                                this
                                    .props
                                    .handleNewsClick( this.props.blog_6 );
                            }}>
                                <img className={this.props.classes.enigma2_main_news_item_mini_image} src={this.props.blog_media_6}/>
                                <div className={this.props.classes.enigma2_dark_mini_news_content_container}>
                                    <div>
                                        <div style={{
                                            width: '100%',
                                            height: '30px',
                                            overflowY: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <p className={this.props.classes.enigma2_mini_news_text}>NEWS</p>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            float: 'left',
                                            paddingRight: '0px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <span className={this.props.classes.enigma2_mini_news_title}>{this.props.blog_title_6}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationBlogComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationBlogComponentRender )