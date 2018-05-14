import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getRosterByIDQuery } from '../../../../queries/rosters';
import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationRosterController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationRosterItemComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationRosterItemComponentRender`);
        const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        const { edges } = roster_data.rosterById.rosterIndividualsByRosterId;
        console.log(roster_data);
        this.setState({ roster_list: edges, visible: true, OrganizationRosterItemComponentRender: OrganizationRosterItemComponentRender.default });
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    handleClick = (i) => {              // eslint-ignore-line
        // const x = this.props.appManager.getDomainInfo();
        // let p = x.hostname;
        // if (p.indexOf(x.subDomain) > -1) {
        //     p = p.substr(x.subDomain.length + 1, p.length);
        //     let pt = '';
        //     if (x.port) {
        //         pt = `:${x.port}`;
        //     }
        //     const url = `${x.protocol}//${p}${pt}/individual?u=${i}`;
        //     window.open(url, '_blank');
        // }
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationRosterItemComponentRender } = this.state;
        const p_array = [];
        this.state.roster_list.forEach((r, i) => {
            const { individualUserByIndividualId } = r.node;
            let im = blankProfileImage;
            if (individualUserByIndividualId.profileImageUrl) {
                im = individualUserByIndividualId.profileImageUrl;
            }

            p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId.id); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemComponentRender
                roster_nickname={individualUserByIndividualId.twitterHandle}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
            /></div>);
        });
        return (<div>
            <div
                onClick={this.props.closeRosters}
                tabIndex={-1}
                role="menuItem"
                style={{
                    cursor: 'pointer',
                    fontSize: 28,
                    position: 'absolute',
                    right: 32,
                    top: 94,
                    color: 'white',
                }}><span className="fa fa-window-close" /></div>
            {p_array}</div>);
    }
}
OrganizationRosterController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    roster_id: PropTypes.number.isRequired,
    closeRosters: PropTypes.func.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationRosterController));
