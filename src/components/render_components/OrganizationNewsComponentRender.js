/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.news_item_container}>
                    <div id="news_item_1" className={this.props.classes.news_item_body}>
                        <div className={this.props.classes.news_menu_item}>
                            <span id="news_item_title" style={{
                                fontWeight: '600'
                            }}>We Are Live</span>
                            <span id="news_item_date" style={{
                                position: 'absolute',
                                right: '20px',
                                top: '8px',
                                fontWeight: '400',
                                fontSize: '12px',
                                paddingLeft: '15px'
                            }}>February 19, 2018</span>
                            <div style={{
                                height: '68px',
                                overflowY: 'hidden'
                            }}>
                                <p style={{
                                    paddingTop: '5px',
                                    fontWeight: '400',
                                    fontSize: '11px',
                                    lineHeight: '15px'
                                }}>We are exited to announce the launch of Ascendant Gaming. Please follow us on our social media channels to stay up to date on competitions and events.</p>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.news__more_container}>
                        <div id="more_news_button" className={this.props.classes.news_more_button}>
                            READ MORE
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationNewsComponentRender )