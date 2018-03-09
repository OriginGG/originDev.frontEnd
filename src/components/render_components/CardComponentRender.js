/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class CardComponentRender extends Component {
    render( ) {
        return (
            <div>
                <span className="user_classes.testStyle">Testing
                    <div className={this.props.classes.cardContainer}>
                        <div className="ui link cards">
                            <div className="card">
                                <div className="image">
                                    <img src="./images/matthew.png"/>
                                </div>
                                <div className="content">
                                    <div className="header">Matt Giampietro</div>
                                    <div className="meta">
                                        <a>Friends</a>
                                    </div>
                                    <div className="description">
                                        Matthew is an interior designer living in New York.
                                    </div>
                                </div>
                                <div className="extra content">
                                    <span className="right floated">
                                        Joined in 2013
                                    </span>
                                    <span>
                                        <i className="user icon"/>
                                        75 Friends
                                    </span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="image">
                                    <img src="./images/molly.png"/>
                                </div>
                                <div className="content">
                                    <div className="header">Molly</div>
                                    <div className="meta">
                                        <span className="date">Coworker</span>
                                    </div>
                                    <div className="description">
                                        Molly is a personal assistant living in Paris.
                                    </div>
                                </div>
                                <div className="extra content">
                                    <span className="right floated">
                                        Joined in 2011
                                    </span>
                                    <span>
                                        <i className="user icon"/>
                                        35 Friends
                                    </span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="image">
                                    <img src="./images/elyse.png"/>
                                </div>
                                <div className="content">
                                    <div className="header">Elyse</div>
                                    <div className="meta">
                                        <a>Coworker</a>
                                    </div>
                                    <div className="description">
                                        Elyse is a copywriter working in New York.
                                    </div>
                                </div>
                                <div className="extra content">
                                    <span className="right floated">
                                        Joined in 2014
                                    </span>
                                    <span>
                                        <i className="user icon"/>
                                        151 Friends
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

CardComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( CardComponentRender )