import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { GlobalStyles } from 'Theme/Theme';
import { Select, Dropdown, Button, Input } from 'semantic-ui-react/dist/commonjs';
import { inject } from 'mobx-react';
import _ from 'lodash';
import { Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrganizationAdminMatchesComponentRender from '../../../render_components/admin/OrganizationAdminMatchesComponentRender';
import { createRecentMatchQuery, recentMatchesQuery, deleteRecentMatchQuery } from '../../../../queries/matches';
import { gameOptions } from './data/AllGames';

const { confirm } = Modal;

class AdminRecentMatchesController extends Component {
    state = {
        visible: false, add_match: false, logo_src: null, your_score: '', their_score: '', your_url: '', event_description: '', your_date: ''
    };
    componentDidMount = async () => {
        this.upload_file = false;
        this.current_game = null;
        this.match_type = null;
        this.is_saving = false;
        this.calcMatches();
    }
    calcMatches = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const m = await this.props.appManager.executeQueryAuth(
                    'query', recentMatchesQuery,
                    {
                        organisation: this.props.uiStore.current_organisation.subDomain
                    }
                );
                this.setState({ add_match: false, matches: m.resultdata.edges, visible: true });
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    uploadLogo = () => {
        return new Promise(async (resolve) => {
            const formData = new FormData();
            formData.append('images', this.logo_files);
            try {
                const x = await axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                resolve(x.data);
            } catch (err) {
                resolve(null);
            }
        });
    }
    uploadFile = (e) => {
        this.logo_files = e[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            const p = this.state;
            p.logo_src = x;
            this.setState(p);
            this.upload_file = true;
        };
    }
    handleFileClick = () => {
        this.dropzoneRef.open();
    }
    addMatch = () => {
        this.setState({ add_match: true });
    }
    handleInputChange = (e, field) => {
        const p = this.state;
        p[field] = e.target.value;
        this.setState(p);
    }
    handleDropDown = (e, data) => {
        this.current_game = data.value;
    }

    handleDropDownList = (e, data) => {
        console.log(`handleDropDownList ${data.value}`);
        this.match_type = data.value;
        console.log(`match type = ${this.match_type}`);
    }

    handleSubmit = async () => {
        console.log('submit pressed');
        let is_filled = true;
        // await this.props.appManager.executeQuery('mutation', updateUserQuery, { id: actual_id, organisation: this.props.uiStore.current_organisation.subDomain });
        if (!this.current_game) {
            toast.error('Please pick a game', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!this.state.your_score) {
            // toast.error('Please enter your score', {
            //     position: toast.POSITION.TOP_LEFT
            // });
            // return;
        }
        if (!this.state.their_score) {
            // toast.error('Please enter your opponents score', {
            //     position: toast.POSITION.TOP_LEFT
            // });
            // return;
        }
        if (!this.state.your_url) {
            toast.error('Please enter your league', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!this.state.your_date) {
            toast.error('Please enter date', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!this.match_type) {
            toast.error('Please choose Upcoming or Recent', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!this.state.event_description) {
            toast.error('Please enter your event', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!this.state.logo_src) {
            toast.error('Please upload your opponents logo', {
                position: toast.POSITION.TOP_LEFT
            });
            is_filled = false;
            // return;
        }
        if (!is_filled) {
            return;
        }
        if (this.is_saving === false && this.current_game && this.state.logo_src) {
            this.is_saving = true;
            const logo_data = await this.uploadLogo();
            if (logo_data === null) {
                this.is_saving = false;
            } else {
                console.log(`event description = ${this.state.event_description}
                subDomain =${this.props.uiStore.current_organisation.subDomain}
                gameName=${this.current_game} 
                eventInfo= ${this.match_type}
                eventUrl= ${this.state.your_url}
                eventDate= ${this.state.your_date}
                gameLogo= ${logo_data.Location}
                score= ${this.state.your_score} - ${this.state.their_score}`);
                await this.props.appManager.executeQueryAuth(
                    'mutation', createRecentMatchQuery,
                    {
                        subDomain: this.props.uiStore.current_organisation.subDomain,
                        gameName: this.current_game,
                        eventInfo: this.match_type,
                        eventUrl: this.state.your_url,
                        eventDate: this.state.your_date,
                        gameLogo: logo_data.Location,
                        eventDescription: this.state.event_description,
                        score: `${this.state.your_score} - ${this.state.their_score}`
                    }
                );
                toast.success('Match Added !', {
                    position: toast.POSITION.TOP_LEFT
                });
                await this.calcMatches();
                this.is_saving = false;
            }
        }
    }
    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete this Recent Match',
                content: 'Are you sure?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    };
    deleteMatch = async (id) => {
        const action = await this.showDeleteConfirm();
        if (action) {
            await this.props.appManager.executeQueryAuth(
                'mutation', deleteRecentMatchQuery,
                {
                    id
                }
            );
            toast.success('Recent match deleted !', {
                position: toast.POSITION.TOP_LEFT
            });
        }
        await this.calcMatches();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        if (this.state.add_match === true) {
            const matchOptions = [{ key: 'rm', value: 'rm', text: 'Recent Matches' }, { key: 'um', value: 'um', text: 'Upcoming Matches' }];
            return (
                <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                    <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                    <div className="classes.admin_title_box">
                        Add New Recent Match
                    </div>
                    <div className={this.props.classes.admin_main_logo_box_inner} style={{ marginBottom: '10px' }}>
                        <img alt="" id="admin_main_logo" className={this.props.classes.admin_main_logo_image} src={this.props.uiStore.current_theme_structure.header.logo.imageData} />
                    </div>
                    <Select onChange={this.handleDropDownList} style={{ width: 200, clear: 'both', marginTop: '10px' }} placeholder="Select Match Type" fluid selection options={matchOptions} />
                    <Dropdown onChange={this.handleDropDown} style={{ width: 200, clear: 'both', marginTop: '10px' }} placeholder="Select Game Logo" fluid selection options={gameOptions} />
                    <Button onClick={this.handleFileClick} style={{ marginTop: '10px' }} primary>UPLOAD OPPOSITE TEAM LOGO</Button>
                    <img alt="" style={{ display: 'table' }} className={this.props.classes.admin_main_logo_image} src={this.state.logo_src} />
                    <div style={{ marginTop: 4 }}>
                        <Input
                            style={{ marginTop: 4 }}
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Your Score'
                            }}
                            actionPosition="left"
                            placeholder="Your Score..."
                            value={this.state.your_score}
                            onChange={(e) => { this.handleInputChange(e, 'your_score'); }}
                        />
                        <Input
                            style={{ marginTop: 4 }}
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Their Score'
                            }}
                            actionPosition="left"
                            placeholder="Their Score..."
                            value={this.state.their_score}
                            onChange={(e) => { this.handleInputChange(e, 'their_score'); }}

                        />
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Input
                            style={{ marginTop: 4 }}
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Info URL'
                            }}
                            actionPosition="left"
                            placeholder="URL..."
                            value={this.state.your_url}
                            onChange={(e) => { this.handleInputChange(e, 'your_url'); }}
                        />
                        <Input
                            style={{ marginTop: 4 }}
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Event/Description'
                            }}
                            actionPosition="left"
                            placeholder="League..."
                            value={this.state.event_description}
                            onChange={(e) => { this.handleInputChange(e, 'event_description'); }}

                        />
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Input
                            style={{ marginTop: 4 }}
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Event Date'
                            }}
                            actionPosition="left"
                            placeholder="Date..."
                            value={this.state.your_date}
                            onChange={(e) => { this.handleInputChange(e, 'your_date'); }}
                        />
                    </div>
                    <Button style={{ marginTop: 16 }} onClick={this.handleSubmit} primary>SUBMIT</Button>
                </div>

            );
        }

        const p_array = [];
        this.state.matches.forEach((res, i) => {
            const g_image = _.find(gameOptions, (o) => {
                return o.value === res.node.gameName;
            });
            p_array.push(<tr key={`key_rm_k_1_${i}`}>
                <td><img
                    alt=""
                    size="40"
                    src={g_image.image}
                    style={{
                        color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
                    }} />
                    <br /></td>
                <td><img
                    alt=""
                    size="40"
                    src={res.node.gameLogo}
                    style={{
                        color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
                    }} />
                    <br /></td>
                <td>{res.node.score}<Button onClick={() => { this.deleteMatch(res.node.id); }} size="mini" color="red" style={{ float: 'right' }} >Delete</Button></td>
            </tr>);
        });

        return (
            <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                <OrganizationAdminMatchesComponentRender
                    recent_matches={p_array}
                    addMatch={this.addMatch}
                    style={{ width: 'calc(100vw - 400px)' }}
                />
            </div>);
    }
}

AdminRecentMatchesController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminRecentMatchesController));

