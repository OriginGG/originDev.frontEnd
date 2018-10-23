import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { toast } from 'react-toastify';
import { GlobalStyles } from 'Theme/Theme';
import axios from 'axios';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { Select } from 'antd';
import { Table, Button, Card } from 'semantic-ui-react';


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
        this.aggregation_type = 'roster';
        this.roster_type = 'Game Rosters';
        this.getRosterData();
    }
    getRosterData = async () => {
        return new Promise(async (resolve) => {
            const p_array = [];
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { rosterType: this.aggregation_type, subDomain: this.props.uiStore.current_organisation.subDomain });
            let currGame;
            switch (this.aggregation_type) {
                case 'content_team': {
                    if (roster_data.allCombinedRosters.edges.length === 0) {
                        toast.error('Content Team not available/setup', {
                            position: toast.POSITION.TOP_LEFT
                        });
                        resolve(true);
                    }
                    this.setState({ social_stats: roster_data.allCombinedRosters.edges[0].node });
                    break;
                }
                case 'staff': {
                    if (roster_data.allCombinedRosters.edges.length === 0) {
                        toast.error('Staff not available/setup', {
                            position: toast.POSITION.TOP_LEFT
                        });
                        resolve(true);
                    }
                    this.setState({ social_stats: roster_data.allCombinedRosters.edges });
                    break;
                }
                case 'roster': {
                    roster_data.allCombinedRosters.edges.forEach((r, i) => {
                        const { gameId } = r.node;
                        currGame = _.find(gameOptions, (o) => {
                            return o.game_id === gameId;
                        });
                        p_array.push(<RosterGame handleClick={this.handleGameSelectClick} game_node={r.node} key={`roster_game_${i}`} game={currGame} />);
                    });
                    this.current_roster_users = roster_data.allCombinedRosters.edges;
                    this.setState({ visible: true, games: p_array });
                    break;
                }
                default: {
                    break;
                }
            }
            resolve(true);
        });
    }

    handleGameSelectClick = (p, gm) => {
        this.setState({ social_stats: gm });
    }

    handleBack = () => {
        this.setState({ social_stats: null });
        this.aggregation_type = 'roster';
        this.roster_type = 'Game Rosters';
        this.getRosterData();
    }
    handleChange = (v) => {
        this.aggregation_type = v;
        switch (v) {
            case 'roster': {
                this.roster_type = 'Game Roster Stats';
                break;
            }
            case 'staff': {
                this.roster_type = 'Staff Positions';
                break;
            }
            case 'content_team': {
                this.roster_type = 'Content Team';
                break;
            }
            default: {
                break;
            }
        }
        this.getRosterData();
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
                    <SocialStats aggType={this.aggregation_type} handleBack={this.handleBack} roster={this.state.social_stats} rosterType={this.roster_type} />
                </div>
            );
        }
        let ag_type = 'Game Rosters';
        if (this.aggregation_type === 'staff') {
            ag_type = 'Staff Positions';
        }
        return (
            <div>
                <h4 style={{ marginTop: 7, marginRight: 8 }}>Select Aggregation statistics</h4>
                <Select defaultValue="roster" style={{ width: 180 }} onChange={this.handleChange}>
                    <Option value="roster">Game Rosters</Option>
                    <Option value="staff">Staff</Option>
                    <Option value="content_team">Content Team</Option>
                </Select>
                <div style={{
                    width: 'calc(100vw - 416px)'
                }}>
                    <Card style={{ marginTop: 32, width: 600 }}>
                        <Card.Content>
                            <Card.Header>{ag_type}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <OrganizationAdminRosterSocialStatsComponentRender social_stats_header="test" game_list={this.state.games} handleAddNewGame={this.handleAddNewGame} />
                        </Card.Content>
                    </Card>
                </div>
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
                    {/* <Table.HeaderCell>Comment Count</Table.HeaderCell> */}
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
                    {/* <Table.HeaderCell style={bg_c_style} >Total Comment Count</Table.HeaderCell> */}
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
        const my_stats = await this.getSocialService(t);
        let stats = my_stats[0];
        if (this.props.aggType === 'staff') {
            switch (t) {
                case 'youtube': {
                    stats = {
                        aggregatedData: {
                            totalSubscriberCount: 0,
                            totalVideoCount: 0,
                            totalViewCount: 0,
                        },
                        individualData: []
                    };
                    my_stats.forEach(s => {
                        if (s.success) {
                            stats.aggregatedData.totalSubscriberCount += parseInt(s.aggregatedData.totalSubscriberCount, 10);
                            stats.aggregatedData.totalVideoCount += parseInt(s.aggregatedData.totalVideoCount, 10);
                            stats.aggregatedData.totalViewCount += parseInt(s.aggregatedData.totalViewCount, 10);
                            stats.individualData.push(s.individualData[0]);
                        }
                    });
                    break;
                }
                case 'twitch': {
                    stats = {
                        aggregatedData: {
                            totalFollowersCount: 0,
                            totalViewsCount: 0,
                        },
                        individualData: []
                    };
                    my_stats.forEach(s => {
                        if (s.success) {
                            stats.aggregatedData.totalFollowersCount += parseInt(s.aggregatedData.totalFollowersCount, 10);
                            stats.aggregatedData.totalViewsCount += parseInt(s.aggregatedData.totalViewsCount, 10);
                            stats.individualData.push(s.individualData[0]);
                        }
                    });
                    break;
                }
                case 'twitter': {
                    stats = {
                        aggregatedData: {
                            totalFavouriteCounts: 0,
                            totalFollowerCounts: 0,
                            totalStatusesCount: 0
                        },
                        individualData: []
                    };
                    my_stats.forEach(s => {
                        if (s.success) {
                            stats.aggregatedData.totalFavouriteCounts += parseInt(s.aggregatedData.totalFavouriteCounts, 10);
                            stats.aggregatedData.totalFollowerCounts += parseInt(s.aggregatedData.totalFollowerCounts, 10);
                            stats.aggregatedData.totalStatusesCount += parseInt(s.aggregatedData.totalStatusesCount, 10);
                            stats.individualData.push(s.individualData[0]);
                        }
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        }
        switch (t) {
            case 'youtube': {
                // this.totalcommentCount = 0;
                this.totalsubscriberCount = 0;
                this.totalvideoCount = 0;
                this.totalviewCount = 0;
                if (!stats.individualData) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = stats.individualData.map(m => {
                    // this.totalcommentCount += parseInt(m.commentCount, 10);
                    this.totalsubscriberCount += parseInt(m.subscriberCount, 10);
                    this.totalvideoCount += parseInt(m.videoCount, 10);
                    this.totalviewCount += parseInt(m.viewCount, 10);
                    return (
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell>{m.channel_url}</Table.Cell>
                            {/* <Table.Cell>{m.commentCount}</Table.Cell> */}
                            <Table.Cell>{m.subscriberCount}</Table.Cell>
                            <Table.Cell>{m.videoCount}</Table.Cell>
                            <Table.Cell>{m.viewCount}</Table.Cell>
                        </Table.Row>);
                });
                this.individualData_agg =
                    <Table.Row>
                        <Table.Cell />
                        <Table.Cell />
                        {/* <Table.Cell >{this.totalcommentCount}</Table.Cell> */}
                        <Table.Cell >{this.totalsubscriberCount}</Table.Cell>
                        <Table.Cell >{this.totalvideoCount}</Table.Cell>
                        <Table.Cell >{this.totalviewCount}</Table.Cell>
                    </Table.Row>;
                break;
            }
            case 'twitch': {
                this.totalFollowers = 0;
                this.totalViews = 0;
                if (!stats.individualData) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = [];
                stats.individualData.forEach((m, i) => {
                    if (m) {
                        this.totalFollowers += parseInt(m.Followers, 10);
                        this.totalViews += parseInt(m.Views, 10);
                        this.individualData.push(<Table.Row key={`agg_twit_stat_${i}`}>
                            <Table.Cell />
                            <Table.Cell>{m.Display_Name}</Table.Cell>
                            <Table.Cell>{m.Followers}</Table.Cell>
                            <Table.Cell>{m.Views}</Table.Cell>
                        </Table.Row>);
                    }
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
                if (!stats.individualData) {
                    this.individualData = <Table.Row />;
                    this.individualData_agg = <Table.Row />;
                    break;
                }
                this.individualData = stats.individualData.map(m => {
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
        let r_id = this.props.roster.id;
        if (Array.isArray(this.props.roster)) {
            const r_array = [];
            this.props.roster.forEach(r => {
                r_array.push(r.node.id);
            });
            r_id = r_array.join();
        }
        switch (t) {
            case 'youtube': {
                return new Promise(async (resolve, reject) => {
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetYoutubeStats?rosterid=${r_id}`;
                    // const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetYoutubeStats?rosterid=36`;
                    axios.get(full_url).then((x) => {
                        resolve(x.data);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
            case 'twitter': {
                return new Promise(async (resolve, reject) => {
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitterStats?rosterid=${r_id}`;
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
                    const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitchStats?rosterid=${r_id}`;
                    // const full_url = `${process.env.REACT_APP_SOCIAL_STATS_SERVER}/GetTwitchStats?rosterid=36`;
                    axios.get(full_url).then((x) => {
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
                    <h4 style={{ marginTop: 7, marginRight: 8 }}>Select Stats for {this.props.rosterType}</h4>
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
    handleBack: PropTypes.func.isRequired,
    rosterType: PropTypes.string.isRequired,
    roster: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number
    ]).isRequired,
    aggType: PropTypes.string.isRequired
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

