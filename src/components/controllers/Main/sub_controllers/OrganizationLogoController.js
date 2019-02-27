import React, { Component } from 'react';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationLogoController extends Component {
    state = { visible: false, OrganizationLogoComponentRender: null };

    componentDidMount = async () => {
        const p_array = [];
        if (!this.isMobile()) {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { rosterType: 'roster', organisationId: this.props.uiStore.current_organisation.id });
            roster_data.allCombinedRosters.edges.forEach((r) => {
                const { gameId } = r.node;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
            });
        }
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationLogoComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationLogoComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({ games: p_array, visible: true, OrganizationLogoComponentRender: OrganizationLogoComponentRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'inherit' };
        if (this.isMobile()) {
            s = { display: 'none' };
        }
        const m_array = [];
        const p = this.state.games;
        p.forEach((g, i) => {
            m_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.props.handleRosterClick(g.roster_id); }} key={`gm_roster_${i}`} style={{ cursor: 'pointer', paddingLeft: 10 }} >
                {g.text}
            </div>);
        });
        const { OrganizationLogoComponentRender } = this.state;
        return <OrganizationLogoComponentRender roster_style={s} roster_games={<div style={{ display: 'flex' }}>{m_array}</div>} image_src={this.image_src} />;
    }
}

OrganizationLogoController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    handleRosterClick: PropTypes.func.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationLogoController));
