import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { GlobalStyles } from 'Theme/Theme';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import { inject } from 'mobx-react';
import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrganizationAdminMatchesComponentRender from '../../../render_components/admin/OrganizationAdminMatchesComponentRender';
import { createRecentMatchQuery, recentMatchesQuery } from '../../../../queries/matches';
import { gameOptions } from './data/AllGames.js';

class AdminRecentMatchesController extends Component {
    state = {
        visible: false, add_match: false, logo_src: null, your_score: '', their_score: ''
    };
    componentWillMount = async () => {
        this.upload_file = false;
        this.current_game = null;
        this.calcMatches();
    }

    calcMatches = async () => {
        const m = await this.props.appManager.executeQueryAuth(
            'query', recentMatchesQuery,
            {
                organisation: this.props.uiStore.current_organisation.subDomain
            }
        );
        this.setState({ add_match: false, matches: m.resultdata.edges, visible: true });
    }

    uploadLogo = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            formData.append('images', this.logo_files);
            axios.post(`${process.env.REACT_APP_API_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((x) => {
                resolve(x.data);
            });
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

    handleSubmit = async () => {
        // await this.props.appManager.executeQuery('mutation', updateUserQuery, { id: actual_id, organisation: this.props.uiStore.current_organisation.subDomain });
        if (this.current_game && this.state.your_score && this.state.their_score && this.state.logo_src) {
            const logo_data = await this.uploadLogo();
            await this.props.appManager.executeQueryAuth(
                'mutation', createRecentMatchQuery,
                {
                    subDomain: this.props.uiStore.current_organisation.subDomain, gameName: this.current_game, gameLogo: logo_data.Location, score: `${this.state.your_score} - ${this.state.their_score}`
                }
            );
            toast.success('Match Added !', {
                position: toast.POSITION.TOP_LEFT
            });
            this.calcMatches();
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        if (this.state.add_match === true) {
            return (
                <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                    <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                    <div className="classes.admin_title_box">
                        Add New Recent Match
                    </div>
                    <div className={this.props.classes.admin_main_logo_box_inner}>
                        <img alt="" id="admin_main_logo" className={this.props.classes.admin_main_logo_image} src={this.props.uiStore.current_theme_structure.header.logo.imageData} />
                    </div>
                    <Dropdown onChange={this.handleDropDown} style={{ width: 200, clear: 'both' }} placeholder="Select Game Logo" fluid selection options={gameOptions} />
                    <Button onClick={this.handleFileClick} style={{ marginTop: 4 }} primary>UPLOAD OPPOSITE TEAM LOGO</Button>
                    <img alt="" style={{ display: 'table' }} className={this.props.classes.admin_main_logo_image} src={this.state.logo_src} />
                    <div style={{ marginTop: 4 }}>
                        <Input
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Your Score'
                            }}
                            actionPosition="left"
                            placeholder="Your Score..."
                            value={this.state.your_score}
                            onChange={(e) => { this.handleInputChange(e, 'your_score'); }}
                        />
                        <Input
                            action={{
                                color: 'teal', labelPosition: 'left', icon: 'trophy', content: 'Their Score'
                            }}
                            actionPosition="left"
                            placeholder="Their Score..."
                            value={this.state.their_score}
                            onChange={(e) => { this.handleInputChange(e, 'their_score'); }}

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
                <td>{res.node.score}</td>
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

