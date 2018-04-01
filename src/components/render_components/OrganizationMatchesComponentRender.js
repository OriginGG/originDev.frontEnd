/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationMatchesComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div style={{
                    paddingTop: '20px'
                }}>
                    <div className={this.props.classes.recent_matches_body}>
                        <h3 className={this.props.classes.recent_matches_title}>Recent Matches</h3>
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
                                                color: 'rgba(0, 0, 0, 0.87)',
                                                height: '48px'
                                            }}>
                                                <th style={{
                                                    fontWeight: 'normal',
                                                    fontSize: '12px',
                                                    paddingLeft: '24px',
                                                    paddingRight: '24px',
                                                    height: '56px',
                                                    textAlign: 'left',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    color: 'rgb(158, 158, 158)',
                                                    position: 'relative',
                                                    backgroundColor: 'inherit'
                                                }}>Game</th>
                                                <th style={{
                                                    fontWeight: 'normal',
                                                    fontSize: '12px',
                                                    paddingLeft: '24px',
                                                    paddingRight: '24px',
                                                    height: '56px',
                                                    textAlign: 'left',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    color: 'rgb(158, 158, 158)',
                                                    position: 'relative',
                                                    backgroundColor: 'inherit'
                                                }}>Vs</th>
                                                <th style={{
                                                    fontWeight: 'normal',
                                                    fontSize: '12px',
                                                    paddingLeft: '24px',
                                                    paddingRight: '24px',
                                                    height: '56px',
                                                    textAlign: 'left',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    color: 'rgb(158, 158, 158)',
                                                    position: 'relative',
                                                    backgroundColor: 'inherit'
                                                }}>Score
                                                </th>
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
        )
    }
}

OrganizationMatchesComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationMatchesComponentRender )