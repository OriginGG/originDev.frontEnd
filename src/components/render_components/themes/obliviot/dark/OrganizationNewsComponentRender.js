/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.obliviot_dark_news_container} onClick={( ) => {
                    this
                        .props
                        .handleNewsClick( this.props.blog );
                }}>
                    <img className={this.props.classes.obliviot_main_news_item_micro_image} src={this.props.blog_media}/>
                    <div className={this.props.classes.obliviot_main_news_content_container}>
                        <div>
                            <div style={{
                                width: '100%',
                                float: 'left',
                                paddingRight: '0px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                <span className={this.props.classes.obliviot_dark_news_title}>{this.props.blog_title}</span>
                            </div>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '68px',
                            overflowY: 'hidden'
                        }}>
                            <span className={this.props.classes.obliviot_dark_news_body}>{this.props.blog_content}</span>
                        </div>
                        <div className={this.props.classes.obliviot_dark_news_decor}/>
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