/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class ObliviotOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.news_item_container}>
                    <div id="news_item_1" className={this.props.classes.news_item_body}>
                        <img className={this.props.classes.news_item_image} src={this.props.blog_media}/>
                        <div className={this.props.classes.news_menu_item}>
                            <div>
                                <div style={{
                                    width: '50%',
                                    float: 'left',
                                    paddingRight: '0px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    <span className={this.props.classes.obliviot_news_title}>{this.props.blog_title}</span>
                                </div>
                                <div style={{
                                    width: '50%',
                                    float: 'left'
                                }}>
                                    <span className={this.props.classes.obliviot_news_date}>{this.props.blog_date}</span>
                                </div>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '68px',
                                overflowY: 'hidden'
                            }}>{this.props.blog_content}</div>
                        </div>
                    </div>
                    <div className={this.props.classes.obliviot_news__more_container}>
                        <div id="more_news_button" className={this.props.classes.obliviot_news_more_button} onClick={( ) => {
                            this
                                .props
                                .handleNewsClick( this.props.blog );
                        }}>
                            READ MORE
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ObliviotOrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( ObliviotOrganizationNewsComponentRender )