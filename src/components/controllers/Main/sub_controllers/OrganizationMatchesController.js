import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { recentMatchesQuery } from '../../../../queries/matches';
import OrganizationMatchesComponentRender from '../../../render_components/OrganizationMatchesComponentRender';
import coc_image from '../../../../assets/images/game_images/clashofclans.png';
import cod_image from '../../../../assets/images/game_images/cod.png';
import dota_image from '../../../../assets/images/game_images/dota2.png';
import csgo_image from '../../../../assets/images/game_images/csgo.png';
import fortnite_image from '../../../../assets/images/game_images/fortnite.jpg';
import hearthstone_image from '../../../../assets/images/game_images/hearthstone.png';
import lol_image from '../../../../assets/images/game_images/lol.jpg';
import paladins_image from '../../../../assets/images/game_images/paladins.jpg';
import ow_image from '../../../../assets/images/game_images/ow.png';
import pubg_image from '../../../../assets/images/game_images/pubg.png';
import smite_image from '../../../../assets/images/game_images/smite.png';
import splatoon_image from '../../../../assets/images/game_images/splatoon.png';
import vainglory_image from '../../../../assets/images/game_images/vainglory.png';
import wow_image from '../../../../assets/images/game_images/wow.png';
// import { getOrganisationQuery } from './queries/organisation'

const gameOptions = [
    {
        value: 'Clash of Clans',
        image: coc_image
    },
    {
        value: 'Call of Duty',
        image: cod_image
    },
    {
        value: 'Dota 2',
        image: dota_image
    },
    {
        value: 'CS GO',
        image: csgo_image
    },
    {
        value: 'Fortnite',
        image: fortnite_image
    },
    {
        value: 'Hearthstone',
        image: hearthstone_image
    },
    {
        value: 'Lol',
        image: lol_image
    },
    {
        value: 'OW',
        image: ow_image
    },
    {
        value: 'Paladins',
        image: paladins_image
    },
    {
        value: 'Pubg',
        image: pubg_image
    },
    {
        value: 'Smite',
        image: smite_image
    },
    {
        value: 'Splatoon',
        image: splatoon_image
    },
    {
        value: 'Vainglory',
        image: vainglory_image
    },
    {
        value: 'WOW',
        image: wow_image
    },


];
class OrganizationMatchesController extends Component {
    render() {
        if (this.props.data.loading === true) {
            return null;
        }
        const { edges } = this.props.data.resultdata;
        const p_array = [];
        edges.forEach((res) => {
            const g_image = _.find(gameOptions, (o) => {
                return o.value === res.node.gameName;
            });
            p_array.push(<tr style={{ color: 'rgba(0, 0, 0, 0.87)', height: 48 }}>
                <td style={{
                    paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
                }}>
                    <img
                        alt=""
                        size="40"
                        src={g_image.image}
                        style={{
                            color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
                        }} />
                    <br />
                </td>
                <td style={{
                    paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
                }}>
                    <img
                        alt=""
                        size="40"
                        src={res.node.gameLogo}
                        style={{
                            color: 'rgb(255, 255, 255)', backgroundColor: 'transparent', userSelect: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20', borderRadius: 0, height: 40, width: 40
                        }} />
                    <br />
                </td>

                <td style={{
                    paddingLeft: 24, paddingRight: 24, height: 48, textAlign: 'left', fontSize: 13, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', backgroundColor: 'inherit'
                }}>
                    <span>{res.node.score}</span>
                </td>
            </tr>);
        });
        return <OrganizationMatchesComponentRender recent_matches={p_array} />;
    }
}
OrganizationMatchesController.propTypes = {
    data: PropTypes.object.isRequired,
};

export default graphql(recentMatchesQuery, {
    withRef: true,
    options: props => ({
        fetchPolicy: 'network-only',
        variables: {
            organisation: props.subDomain
        }
    })
})(inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationMatchesController)));

