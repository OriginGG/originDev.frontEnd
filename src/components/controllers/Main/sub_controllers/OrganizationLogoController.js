import React, { Component } from 'react';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationLogoController extends Component {
    state = { visible: false, OrganizationLogoComponentRender: null };

    componentWillMount = async () => {
        const p_array = [];
        const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
        roster_data.allRosters.edges.forEach((r) => {
            const { gameId } = r.node;
            const currGame = _.find(gameOptions, (o) => {
                return o.game_id === gameId;
            });
            p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
        });
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationLogoComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationLogoComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({ games: p_array, visible: true, OrganizationLogoComponentRender: OrganizationLogoComponentRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const m_array = [];
        const p = this.state.games;
        p.forEach((g, i) => {
            m_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.props.handleRosterClick(g.roster_id); }} key={`gm_roster_${i}`} style={{ cursor: 'pointer', paddingLeft: 10 }} >
                {g.text}
            </div>);
        });
        const { OrganizationLogoComponentRender } = this.state;
        return <OrganizationLogoComponentRender roster_games={<div style={{ display: 'flex' }}>{m_array}</div>} image_src={this.image_src} />;
    }
}

OrganizationLogoController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    handleRosterClick: PropTypes.func.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationLogoController));
