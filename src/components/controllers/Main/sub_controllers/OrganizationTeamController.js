import React, { Component } from 'react';
import injectSheet from 'react-jss';
import _ from 'lodash';
import { inject } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationTeamController extends Component {
    state = { visible: false, OrganizationTeamComponentRender: null };

    componentDidMount = async () => {
        const p_array = [];
        if (!this.isMobile()) {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            console.log(`team data = ${JSON.stringify(roster_data)}`);
            roster_data.allRosters.edges.forEach((r) => {
                const { gameId } = r.node;
                const currGame = _.find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
            });
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationTeamComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationTeamComponentRender`);
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({ games: p_array, visible: true, OrganizationTeamComponentRender: OrganizationTeamComponentRender.default });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    isMobile = () => {
        return isMobile;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover', filter: 'opacity(.2) sepia() saturate(10000%) hue-rotate(30deg)' };
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
        const { OrganizationTeamComponentRender } = this.state;
        return <OrganizationTeamComponentRender bg_style={s} />;
    }
}

OrganizationTeamController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    handleRosterClick: PropTypes.func.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationTeamController));
