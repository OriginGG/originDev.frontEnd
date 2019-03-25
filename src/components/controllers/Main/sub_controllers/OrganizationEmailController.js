import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import find from 'lodash/find';
import { inject } from 'mobx-react';
import loadable from '@loadable/component';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
// import { GlobalStyles } from 'Theme/Theme';
import { getRosterQuery } from '../../../../queries/rosters';
import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';

class OrganizationEmailController extends Component {
    state = { OrganizationEmailComponentRender: null };

    componentDidMount = async () => {
        const p_array = [];
        if (!this.isMobile()) {
            const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { rosterType: 'roster', organisationId: this.props.uiStore.current_organisation.id });
            roster_data.allCombinedRosters.edges.forEach((r) => {
                const { gameId } = r.node;
                const currGame = find(gameOptions, (o) => {
                    return o.game_id === gameId;
                });
                p_array.push({ roster_id: r.node.id, image: currGame.image, text: currGame.text });
            });
        }
        // const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // const theme = this.props.uiStore.current_organisation.themeId;
        const OrganizationEmailComponentRender = loadable(
            (props) =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${props.uiStore
                    .current_theme_full_name}/OrganizationEmailComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        this.setState({ OrganizationEmailComponentRender });
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
        const { OrganizationEmailComponentRender } = this.state;
        return <OrganizationEmailComponentRender
            uiStore={this.props.uiStore}
            handleCustomerEmailClose={this.props.handleCustomerEmailClose}
            handleEmailChange={this.props.handleEmailChange}
            handleCustomerEmailSubmit={this.props.handleCustomerEmailSubmit}
        />;
    }
}

OrganizationEmailController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    handleCustomerEmailClose: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handleCustomerEmailSubmit: PropTypes.func.isRequired,
    appManager: PropTypes.object.isRequired
};


export default inject('uiStore', 'appManager')(OrganizationEmailController);
