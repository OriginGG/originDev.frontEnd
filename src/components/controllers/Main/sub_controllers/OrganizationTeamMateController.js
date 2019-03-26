import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getRosterByIDQuery } from '../../../../queries/rosters';
import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationTeamMateController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }
        const OrganizationTeamImageComponentRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationTeamImageComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        // console.log(`roster ID = ${this.props.roster_id}`);
        const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        // console.log(`ROSTER DATA = ${JSON.stringify(roster_data)}`);
        let edges = [];
        if (roster_data.combinedRosterById) {
            edges = roster_data.combinedRosterById.combinedRosterIndividualsByRosterId.edges;                   // eslint-disable-line
        }
        // console.log(`ROSTER DATA = ${JSON.stringify(roster_data)}`);
        const overlay_style = { display: 'none' };
        this.setState({
            roster_list: edges,
            visible: true,
            OrganizationTeamImageComponentRender,
            o_style: overlay_style
        });

        // console.log(`this.state.roster_list = ${JSON.stringify(this.state.roster_list)}`);
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    handleImageClick = (i) => {              // eslint-disable-line
        // console.log(`handle click ${JSON.stringify(i)}`);
        const x = this.props.appManager.getDomainInfo();
        let p = x.hostname;
        if (p.indexOf(x.subDomain) > -1) {
            p = p.substr(x.subDomain.length + 1, p.length);
            let pt = '';
            if (x.port) {
                pt = `:${x.port}`;
            }
            const url = `${x.protocol}//${p}${pt}/individual/${i.username}`;
            window.open(url, '_blank');
        }
    }
    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
    }

    handle_social = (s, ind_user) => {
        switch (s) {
            case 'twitter': {
                const p_string = `https://twitter.com/${ind_user.twitterHandle}`;
                window.open(p_string, '_blank');
                break;
            }
            case 'facebook': {
                window.open(ind_user.facebookLink, '_blank');
                break;
            }
            case 'instagram': {
                window.open(ind_user.instagramLink, '_blank');
                break;
            }
            case 'youtube': {
                const p_string = `https://www.youtube.com/channel/${ind_user.youtubeChannel}`;
                window.open(p_string, '_blank');
                break;
            }
            default: {
                break;
            }
        }
        // console.log(s);
    }

    handleTeamClick = () => {
        // console.log(JSON.stringify(t.display));
        // if (t.display === 'none') {
            const overlay_style = { display: 'inherit' };
            this.setState({ o_style: overlay_style });
        // } else {
        //    const overlay_style = { display: 'none' };
        //    this.setState({ o_style: overlay_style });
        // }
    }

    handleTeamUnClick = () => {
        // console.log(JSON.stringify(t.display));
        // if (t.display === 'none') {
        //    const overlay_style = { display: 'inherit' };
        //    this.setState({ o_style: overlay_style });
        // } else {
            const overlay_style = { display: 'none' };
            this.setState({ o_style: overlay_style });
        // }
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        // const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // let close_button = 'white';
        // if (theme === 'obliviot/light' || theme === 'enigma/light') {
        //     close_button = 'black';
        // }
        const { OrganizationTeamImageComponentRender } = this.state;
        const p_array = [];
        this.button_style = { backgroundColor: `${this.props.uiStore.current_organisation.primaryColor}` };
        this.profile_button_style = { borderColor: `${this.props.uiStore.current_organisation.primaryColor}` };
        this.profile_handle_style = { color: `${this.props.uiStore.current_organisation.primaryColor}` };
        // let no_items = '';
        // if (this.state.roster_list.length < 1) {
        //     no_items = 'No Players Are Currently On This Roster';
        // }
        // console.log(`this.state.ropster_list size = ${this.state.roster_list.length}`);
        const theme_check = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (theme_check === 'felzec/light') {
            this.state.roster_list.forEach((r) => {
                const { individualUserByIndividualId } = r.node;
                // console.log(`each roster item =  for item ${i}`);
                let im = blankProfileImage;
                if (individualUserByIndividualId.profileImageUrl) {
                    im = individualUserByIndividualId.profileImageUrl;
                }
                const c_name = `${individualUserByIndividualId.firstName} ${individualUserByIndividualId.lastName}`;
                p_array.push(<div style={{
                    cursor: 'pointer',
                    width: '180px',
                    float: 'left',
                    position: 'relative',
                    marginRight: '5px',
                    marginLeft: '5px'
                }}><OrganizationTeamImageComponentRender
                    felzec_team_handle={individualUserByIndividualId.username}
                    felzec_team_name={c_name}
                    felzec_overlay_style={this.state.o_style}
                    felzec_button_style={this.button_style}
                    team_image={im}
                    individual_id={individualUserByIndividualId}
                    handleImageClick={this.handleTeamClick}
                    handleImageUnClick={this.handleTeamUnClick}
                    handleIndividualClick={this.handleImageClick}
                /></div>);
            });
            return (<div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                {p_array}</div>);
        }
        this.state.roster_list.forEach((r) => {
            const { individualUserByIndividualId } = r.node;
            // console.log(`each roster item =  ${JSON.stringify(r)}`);
            let im = blankProfileImage;
            if (individualUserByIndividualId.profileImageUrl) {
                im = individualUserByIndividualId.profileImageUrl;
            }
            const c_name = `${individualUserByIndividualId.firstName} ${individualUserByIndividualId.lastName}`;
            p_array.push(<OrganizationTeamImageComponentRender
                felzec_team_handle={individualUserByIndividualId.username}
                felzec_team_name={c_name}
                felzec_overlay_style={this.state.o_style}
                felzec_button_style={this.button_style}
                enigma2_profile_handle_style={this.profile_handle_style}
                enigma2_profile_button_style={this.profile_button_style}
                team_image={im}
                individual_id={individualUserByIndividualId}
                handleImageClick={this.handleTeamClick}
                handleImageUnClick={this.handleTeamUnClick}
                handleIndividualClick={this.handleImageClick}
            />);
        });
        return (<div>
            {p_array}</div>);
    }
}
OrganizationTeamMateController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    roster_id: PropTypes.number.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(OrganizationTeamMateController);
