import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getRosterByIDQuery } from '../../../../queries/rosters';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationTwitchController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationTwitchComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitchComponentRender`);
        const OrganizationTwitchHolderComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTwitchHolderComponentRender`);
        const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        const { edges } = roster_data.rosterById.rosterIndividualsByRosterId;
        console.log(roster_data);
        this.setState({ roster_list: edges, visible: true, OrganizationTwitchComponentRender: OrganizationTwitchComponentRender.default });
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationTwitchComponentRender } = this.state;
        const { OrganizationTwitchHolderComponentRender } = this.state;
        const p_array = [];
        this.state.roster_list.forEach((r) => {
            const { individualUserByIndividualId } = r.node;
            const t_url = `https://player.twitch.tv/?channel=${individualUserByIndividualId.twitchUrl}`;
            p_array.push(<OrganizationTwitchComponentRender
                twitch_url={t_url}
            />);
        });
        return (<OrganizationTwitchHolderComponentRender twitch_items={p_array} />);
    }
}
OrganizationTwitchController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    roster_id: PropTypes.number.isRequired,
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTwitchController));
