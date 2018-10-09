import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import axios from 'axios';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { Select } from 'antd';
import { Table, Button } from 'semantic-ui-react';


// import { toast } from 'react-toastify';

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';
import { getRosterQuery } from '../../../../queries/rosters.js';
import OrganizationAdminRosterSocialStatsComponentRender from '../../../render_components/admin/OrganizationAdminRosterSocialStatsComponentRender.js';
import { gameOptions } from './data/AllGames.js';

const { Option } = Select;

const RosterGame = (props) => {
    return (
        <div
            role="menuItem"
            tabIndex={-1}
            onClick={() => { props.handleClick(props.game, props.game_node); }}
            style={{
                cursor: 'pointer', display: 'flex', padding: 8, backgroundColor: 'aliceblue', border: '1px solid', borderColor: '#9e9ed6', borderRadius: 8
            }}>
            <div style={{ width: 24, height: 24 }}><img style={{ width: 'inherit' }} alt="" src={props.game.image} /></div>
            <p style={{
                fontSize: 14, lineHeight: '24px', color: 'black', paddingLeft: 4
            }}>{props.game.text}</p>
        </div >
    );
};
class AdminSocialStatsControllerr extends Component {
    state = {
        games: [], visible: false, social_stats: null
    };
    componentDidMount = () => {
        this.getRosterData();
    }
    getRosterData = async () => {
        return new Promise(async (resolve) => {
            const p_array = [];
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            roster_data.allRosters.edges.forEach((r, i) => {
                const { gameId } = r.node;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                p_array.push(<RosterGame handleClick={this.handleGameSelectClick} game_node={r.node} key={`roster_game_${i}`} game={currGame} />);
            });
            this.current_roster_users = roster_data.allRosters.edges;
            this.setState({ visible: true, games: p_array });
            resolve(true);
        });
    }

    handleGameSelectClick = (p, gm) => {
        this.setState({ social_stats: gm });
    }

    handleBack = () => {
        this.setState({ social_stats: null });
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        if (this.state.social_stats) {
            return (
                <div style={{
                    width: 'calc(100vw - 416px)'
                }}>
                    <SocialStats handleBack={this.handleBack} roster={this.state.social_stats} />
                </div>
            );
        }
        return (
            <div style={{
                width: 'calc(100vw - 416px)'
            }}>
                <OrganizationAdminRosterSocialStatsComponentRender game_list={this.state.games} handleAddNewGame={this.handleAddNewGame} />
            </div>
        );
    }
}

const YouTubeIndividualTable = ({ tb, tb_agg }) => (
    <div >
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Channel URL</Table.HeaderCell>
                    <Table.HeaderCell>Comment Count</Table.HeaderCell>
                    <Table.HeaderCell>Subscriber Count</Table.HeaderCell>
                    <Table.HeaderCell>Video Count</Table.HeaderCell>
                    <Table.HeaderCell>View Count</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tb}
            </Table.Body>
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell style={bg_c_style} />
                    <Table.HeaderCell style={bg_c_style} >Total Comment Count</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total Subscriber Count</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total Video Count</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total View Count</Table.HeaderCell>
                </Table.Row>
                {tb_agg}
            </Table.Body>
            <Table.Footer />
        </Table>
    </div>
);
const TwitchIndividualTable = ({ tb, tb_agg }) => (
    <div >
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Display Name</Table.HeaderCell>
                    <Table.HeaderCell>Followers</Table.HeaderCell>
                    <Table.HeaderCell>Views</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tb}
            </Table.Body>
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell style={bg_c_style} />
                    <Table.HeaderCell style={bg_c_style} >Total Followers</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total Views</Table.HeaderCell>
                </Table.Row>
                {tb_agg}
            </Table.Body>
            <Table.Footer />
        </Table>
    </div>
);
const TwitterIndividualTable = ({ tb, tb_agg }) => (
    <div >
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Screen Name</Table.HeaderCell>
                    <Table.HeaderCell>Favorites</Table.HeaderCell>
                    <Table.HeaderCell>Followers</Table.HeaderCell>
                    <Table.HeaderCell>Statuses</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {tb}
            </Table.Body>
            <Table.Body>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell style={bg_c_style} />
                    <Table.HeaderCell style={bg_c_style} >Total Favorites</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total Followers</Table.HeaderCell>
                    <Table.HeaderCell style={bg_c_style} >Total Statuses</Table.HeaderCell>
                </Table.Row>
                {tb_agg}
            </Table.Body>
            <Table.Footer />
        </Table>
    </div>
);
const bg_c_style = {
    backgroundColor: '#ddddff',
    paddingLeft: 10
};
class SocialStats extends Component {
    state = {
        visible: false
    };
    componentDidMount = () => {
        this.getSocialStats('youtube');
    }

    getSocialStats = async (t) => {
        const stats = await this.getSocialService(t);
        switch (t) {
            case 'youtube': {
                this.totalcommentCount = 0;
                this.totalsubscriberCount = 0;
                this.totalvideoCount = 0;
                this.totalviewCount = 0;
                if (!stats.individualData) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = stats.individualData.map(m => {
                    this.totalcommentCount += parseInt(m.commentCount, 10);
                    this.totalsubscriberCount += parseInt(m.subscriberCount, 10);
                    this.totalvideoCount += parseInt(m.videoCount, 10);
                    this.totalviewCount += parseInt(m.viewCount, 10);
                    return (
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell>{m.channel_url}</Table.Cell>
                            <Table.Cell>{m.commentCount}</Table.Cell>
                            <Table.Cell>{m.subscriberCount}</Table.Cell>
                            <Table.Cell>{m.videoCount}</Table.Cell>
                            <Table.Cell>{m.viewCount}</Table.Cell>
                        </Table.Row>);
                });
                this.individualData_agg =
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell >{this.totalcommentCount}</Table.Cell>
                        <Table.Cell >{this.totalsubscriberCount}</Table.Cell>
                        <Table.Cell >{this.totalvideoCount}</Table.Cell>
                        <Table.Cell >{this.totalviewCount}</Table.Cell>
                    </Table.Row>;
                break;
            }
            case 'twitch': {
                this.totalFollowers = 0;
                this.totalViews = 0;
                if (!stats.individual_user_info) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = stats.individual_user_info.map(m => {
                    this.totalFollowers += parseInt(m.Followers, 10);
                    this.totalViews += parseInt(m.Views, 10);
                    return (
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell>{m.Display_Name}</Table.Cell>
                            <Table.Cell>{m.Followers}</Table.Cell>
                            <Table.Cell>{m.Views}</Table.Cell>
                        </Table.Row>);
                });
                this.individualData_agg =
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell >{this.totalFollowers}</Table.Cell>
                        <Table.Cell >{this.totalViews}</Table.Cell>
                    </Table.Row>;
                break;
            }
            case 'twitter': {
                this.total_favourites_count = 0;
                this.total_followers_count = 0;
                this.total_statuses_count = 0;
                if (!stats.individual_user_info) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = stats.individual_user_info.map(m => {
                    this.total_favourites_count += parseInt(m.favourites_count, 10);
                    this.total_followers_count += parseInt(m.followers_count, 10);
                    this.total_statuses_count += parseInt(m.statuses_count, 10);
                    return (
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell>{m.screen_name}</Table.Cell>
                            <Table.Cell>{m.favourites_count}</Table.Cell>
                            <Table.Cell>{m.followers_count}</Table.Cell>
                            <Table.Cell>{m.statuses_count}</Table.Cell>
                        </Table.Row>);
                });
                this.individualData_agg =
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        <Table.Cell >{this.total_favourites_count}</Table.Cell>
                        <Table.Cell >{this.total_followers_count}</Table.Cell>
                        <Table.Cell >{this.total_statuses_count}</Table.Cell>
                    </Table.Row>;
                break;
            }
            default: {
                break;
            }
        }
        this.setState({ visible: true, stats_type: t });
        // eslint-disable-line
    }
    getSocialService = async (t) => {
        switch (t) {
            case 'youtube': {
                return new Promise(async (resolve, reject) => {
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetYoutubeStats?rosterid=${this.props.roster.id}`;
                    // const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetYoutubeStats?rosterid=36`;
                    debugger;
                    axios.get(full_url).then((x) => {
                        resolve(x.data);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
            case 'twitter': {
                return new Promise(async (resolve, reject) => {
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitterStats?rosterid=${this.props.roster.id}`;
                    // const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitterStats?rosterid=36`;
                    axios.get(full_url).then((x) => {
                        resolve(x.data);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
            case 'twitch': {
                return new Promise(async (resolve, reject) => {
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitchStats?rosterid=${this.props.roster.id}`;
                    // const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitchStats?rosterid=36`;
                    axios.get(full_url).then((x) => {
                        debugger;
                        resolve(x.data);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
            default: {
                break;
            }
        }
    }
    handleChange = e => {
        this.getSocialStats(e);
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = <YouTubeIndividualTable tb={this.individualData} tb_agg={this.individualData_agg} />;
        switch (this.state.stats_type) {
            case 'twitch': {
                s = <TwitchIndividualTable tb={this.individualData} tb_agg={this.individualData_agg} />;
                break;
            }
            case 'twitter': {
                s = <TwitterIndividualTable tb={this.individualData} tb_agg={this.individualData_agg} />;
                break;
            }
            default: {
                break;
            }
        }
        return (
            <div style={{
                width: 'calc(100vw - 416px)'
            }}>
                <div style={{ display: 'flex' }}>
                    <h4 style={{ marginTop: 7, marginRight: 8 }}>Select Stats</h4>
                    <Select defaultValue="youtube" style={{ width: 180 }} onChange={this.handleChange}>
                        <Option value="youtube">YouTube Stats</Option>
                        <Option value="twitch">Twitch Stats</Option>
                        <Option value="twitter">Twitter Stats</Option>
                    </Select>
                </div>
                <div style={{ paddingTop: 6 }}>
                    {s}
                </div>
                <Button onClick={this.props.handleBack} style={{ float: 'right', marginTop: 16 }} size="tiny" primary>Back</Button>
            </div>
        );
    }
}

RosterGame.propTypes = {
    game: PropTypes.object.isRequired,
    game_node: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};
SocialStats.propTypes = {
    handleBack: PropTypes.func.isRequired
};
AdminSocialStatsControllerr.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired
};

YouTubeIndividualTable.propTypes = {
    tb: PropTypes.array.isRequired,
    tb_agg: PropTypes.object.isRequired
};

TwitchIndividualTable.propTypes = {
    tb: PropTypes.array.isRequired,
    tb_agg: PropTypes.object.isRequired
};

TwitterIndividualTable.propTypes = {
    tb: PropTypes.array.isRequired,
    tb_agg: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminSocialStatsControllerr));

