/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkNavBG}>
                <div id="recent_matches_container" className={this.props.classes.recent_matches_container}>
                    <div style={{
                        paddingTop: '0px'
                    }}>
                        <div className={this.props.classes.dark_section_title_container}>
                            <h2>RECENT MATCHES</h2>
                        </div>
                        <div className={this.props.classes.dark_recent_matches_body}>
                            <div className="styles__recent_matchlist___3Px6i">
                                <div style={{
                                    height: 'auto',
                                    overflow: 'auto'
                                }}>
                                    <div>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            borderSpacing: '0px',
                                            tableLayout: 'fixed',
                                            fontFamily: 'Roboto, sans-serif'
                                        }}>
                                            <thead style={{
                                                borderBottom: '1px solid rgb(224, 224, 224)'
                                            }}>
                                                <tr style={{
                                                    borderBottom: '1px solid rgb(224, 224, 224)',
                                                    color: 'rgba(200, 200, 200 , 0.87)',
                                                    height: '48px'
                                                }}>
                                                    <th style={{
                                                        fontWeight: '900',
                                                        fontSize: '16px',
                                                        paddingLeft: '24px',
                                                        paddingRight: '24px',
                                                        height: '56px',
                                                        textAlign: 'left',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        color: 'rgb(200, 200, 200)',
                                                        position: 'relative',
                                                        backgroundColor: 'inherit'
                                                    }}>Game</th>
                                                    <th style={{
                                                        fontWeight: '900',
                                                        fontSize: '16px',
                                                        paddingLeft: '24px',
                                                        paddingRight: '24px',
                                                        height: '56px',
                                                        textAlign: 'left',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        color: 'rgb(200, 200, 200)',
                                                        position: 'relative',
                                                        backgroundColor: 'inherit'
                                                    }}>Vs</th>
                                                    <th style={{
                                                        fontWeight: '900',
                                                        fontSize: '16px',
                                                        paddingLeft: '24px',
                                                        paddingRight: '24px',
                                                        height: '56px',
                                                        textAlign: 'left',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        color: 'rgb(200, 200, 200)',
                                                        position: 'relative',
                                                        backgroundColor: 'inherit'
                                                    }}>Score</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div style={{
                                        height: 'inherit',
                                        overflowX: 'hidden',
                                        overflowY: 'auto'
                                    }}>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            borderSpacing: '0px',
                                            tableLayout: 'fixed',
                                            fontFamily: 'Roboto, sans-serif'
                                        }}>
                                            <tbody >{this.props.recent_matches}</tbody>
                                        </table>
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

DarkOrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( DarkOrganizationMatchesComponentRender )