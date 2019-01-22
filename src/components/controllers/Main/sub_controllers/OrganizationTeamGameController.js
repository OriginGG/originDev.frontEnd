import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
// import { getRosterByIDQuery } from '../../../../queries/rosters';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationTeamGameController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const OrganizationTeamImageComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamImageComponentRender`);
        const OrganizationTeamGameComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamGameComponentRender`);
        const OrganizationTeamMateController = await import('./OrganizationTeamMateController');
        // console.log(`roster ID = ${this.props.roster_id}`);
        // const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        // console.log(`ROSTER DATA = ${JSON.stringify(roster_data)}`);
        // let edges = [];
        // if (roster_data.combinedRosterById) {
        //    edges = roster_data.combinedRosterById.combinedRosterIndividualsByRosterId.edges;                   // eslint-disable-line
        // }
        // console.log(`ROSTER DATA = ${JSON.stringify(roster_data)}`);
        // const overlay_style = { display: 'none' };
        this.button_state = false;
        this.button_phrase = 'Show Team';
        this.container_style = { display: 'none' };
        this.setState({
            // roster_list: edges,
            visible: true,
            // OrganizationTeamImageComponentRender:
            // OrganizationTeamImageComponentRender.default,
            OrganizationTeamGameComponentRender:
            OrganizationTeamGameComponentRender.default,
            OrganizationTeamMateController: OrganizationTeamMateController.default,
            // o_style: overlay_style
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

    handleShowClick = () => {
        console.log('show was clicked');
        if (this.button_state) {
            this.button_phrase = 'Show Team';
            this.button_state = false;
            this.container_style = { display: 'none' };
        } else {
            this.button_phrase = 'Hide Team';
            this.button_state = true;
            this.container_style = { display: 'table' };
        }
    }

    handleTeamClick = () => {
        // console.log(JSON.stringify(t.display));
        // if (t.display === 'none') {
        //    const overlay_style = { display: 'inherit' };
        //    this.setState({ o_style: overlay_style });
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
        //    const overlay_style = { display: 'none' };
        //    this.setState({ o_style: overlay_style });
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
        const { OrganizationTeamGameComponentRender } = this.state;
        const { OrganizationTeamMateController } = this.state;
        // const p_array = [];
        // this.button_style = { backgroundColor: `${this.props.uiStore.current_organisation.primaryColor}` };
        // // let no_items = '';
        // // if (this.state.roster_list.length < 1) {
        // //     no_items = 'No Players Are Currently On This Roster';
        // // }
        // // console.log(`this.state.ropster_list size = ${this.state.roster_list.length}`);
        // this.state.roster_list.forEach((r) => {
        //     const { individualUserByIndividualId } = r.node;
        //     // console.log(`each roster item =  for item ${i}`);
        //     let im = blankProfileImage;
        //     if (individualUserByIndividualId.profileImageUrl) {
        //         im = individualUserByIndividualId.profileImageUrl;
        //     }
        //     const c_name = `${individualUserByIndividualId.firstName} ${individualUserByIndividualId.lastName}`;
        //     p_array.push(<div style={{
        //         cursor: 'pointer',
        //         width: '180px',
        //         float: 'left',
        //         position: 'relative',
        //         marginRight: '5px',
        //         marginLeft: '5px'
        //     }}><OrganizationTeamImageComponentRender
        //         felzec_team_handle={individualUserByIndividualId.username}
        //         felzec_team_name={c_name}
        //         felzec_overlay_style={this.state.o_style}
        //         felzec_button_style={this.button_style}
        //         team_image={im}
        //         individual_id={individualUserByIndividualId}
        //         handleImageClick={this.handleTeamClick}
        //         handleImageUnClick={this.handleTeamUnClick}
        //         handleIndividualClick={this.handleImageClick}
        //     /></div>);
        // });
        // return (<div style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         height: '100%'
        //     }}>
        //     {p_array}</div>);
        return <OrganizationTeamGameComponentRender
            game_media_1={this.props.game_media_1}
            game_banner={this.props.game_banner}
            game_name={this.props.game_name}
            show_team_color={this.props.show_team_color}
            team_game_color={this.props.team_game_color}
            handleShowClick={this.handleShowClick}
            button_text={this.button_phrase}
            roster_id={this.props.roster_id}
            container_style={this.container_style}
            container_teams={<OrganizationTeamMateController key={`team_mate_roster_key_${1}`} roster_id={this.props.roster_id} />}
        />;
    }
}
OrganizationTeamGameController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    game_media_1: PropTypes.object.isRequired,
    game_banner: PropTypes.object.isRequired,
    game_name: PropTypes.object.isRequired,
    show_team_color: PropTypes.object.isRequired,
    team_game_color: PropTypes.object.isRequired,
    roster_id: PropTypes.number.isRequired,
    // roster_id: PropTypes.number.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTeamGameController));
