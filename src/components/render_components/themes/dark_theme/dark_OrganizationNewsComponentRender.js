/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div id="news_container" className={this.props.classes.dark_news_container}>
                    <div className={this.props.classes.section_title_container}>
                        <h2>LATEST NEWS</h2>
                    </div>
                    <div id="organization_news_items">
                        <div className={this.props.classes.news_item_container}>
                            <div id="news_item_1" className={this.props.classes.news_item_body}>
                                <img className={this.props.classes.news_item_image} src={this.props.blog_media}/>
                                <div className={this.props.classes.news_menu_item}>
                                    <span id="news_item_title" style={{
                                        fontWeight: '600'
                                    }}>{this.props.blog_title}</span>
                                    <span id="news_item_date" style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '8px',
                                        fontWeight: '400',
                                        fontSize: '12px',
                                        paddingLeft: '15px'
                                    }}>{this.props.blog_date}</span>
                                    <div style={{
                                        height: '68px',
                                        overflowY: 'hidden'
                                    }}>
                                        <p style={{
                                            paddingTop: '5px',
                                            fontWeight: '400',
                                            fontSize: '11px',
                                            lineHeight: '15px'
                                        }}>{this.props.blog_content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={this.props.classes.dark_news__more_container}>
                                <div id="more_news_button" className={this.props.classes.dark_news_more_button} onClick={( ) => {
                                    this
                                        .props
                                        .handleNewsClick( this.props.blog );
                                }}>
                                    READ MORE
                                </div>
                            </div>
                        </div>
                        <div id="news-modal"></div>
                    </div>
                </div>
            </div>
        )
    }
}

DarkOrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationNewsComponentRender )