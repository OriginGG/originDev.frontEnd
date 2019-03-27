import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
// import { GlobalStyles } from 'Theme/Theme';
import { isMobile } from 'react-device-detect';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getRosterByIDQuery } from '../../../../queries/rosters';
import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
function BlankComponent() {
    return <div />;
}

class OrganizationRosterController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }
        const OrganizationRosterItemComponentRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationRosterItemComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        let OrganizationRosterItemMobileComponentRender = BlankComponent;
        if (theme === 'felzec/light' || theme === 'enigma2/dark') {
            OrganizationRosterItemMobileComponentRender = loadable(
                () =>
                    import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationRosterItemMobileComponentRender`),
                {
                    fallback: <div>Loading...</div>
                });
        }
        if (theme === 'mobile/dark') {
            OrganizationRosterItemMobileComponentRender = loadable(
                () =>
                    import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationRosterItemMobileComponentRender`),
                {
                    fallback: <div>Loading...</div>
                });
        }
        const roster_data = await this.props.appManager.executeQuery('query', getRosterByIDQuery, { id: this.props.roster_id });
        const { edges } = roster_data.combinedRosterById.combinedRosterIndividualsByRosterId;
        // console.log(`ROSTER DATA = ${JSON.stringify(roster_data)}`);
        if (theme === 'felzec/light' || theme === 'enigma2/dark' || theme === 'mobile/dark') {
            this.setState({
                roster_list: edges,
                visible: true,
                OrganizationRosterItemComponentRender,
                OrganizationRosterItemMobileComponentRender
            });
        } else {
            this.setState({
                roster_list: edges,
                visible: true,
                OrganizationRosterItemComponentRender
            });
        }
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    isMobile = () => {
        // return true;
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
    }

    handleClick = (i) => {              // eslint-disable-line
        // console.log(`individidual = ${JSON.stringify(i)}`);
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

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let close_button = 'white';
        if (theme === 'obliviot/light' || theme === 'enigma/light') {
            close_button = 'black';
        }
        const { OrganizationRosterItemComponentRender } = this.state;
        const p_array = [];
        let no_items = '';
        if (this.state.roster_list.length < 1) {
            no_items = 'No Players Are Currently On This Roster';
        }
        this.state.roster_list.forEach((r, i) => {
            const { individualUserByIndividualId } = r.node;
            // console.log(`each roster item = ${individualUserByIndividualId}`);
            let im = blankProfileImage;
            if (individualUserByIndividualId.profileImageUrl) {
                im = individualUserByIndividualId.profileImageUrl;
            }
            let twitter_style = { display: 'inherit' };
            if (!individualUserByIndividualId.twitterHandle) {
                twitter_style = { display: 'none' };
            }
            let facebook_style = { display: 'inherit' };
            if (!individualUserByIndividualId.facebookLink) {
                facebook_style = { display: 'none' };
            }
            let youtube_style = { display: 'inherit' };
            if (!individualUserByIndividualId.youtubeChannel) {
                youtube_style = { display: 'none' };
            }
            let instagram_style = { display: 'inherit' };
            if (!individualUserByIndividualId.instagramLink) {
                instagram_style = { display: 'none' };
            }
            if (theme === 'felzec/light' && this.isMobile()) {
                const { OrganizationRosterItemMobileComponentRender } = this.state;
                p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemMobileComponentRender
                roster_nickname={individualUserByIndividualId.username}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
            /></div>);
            } else if (theme === 'enigma2/dark' && this.isMobile()) {
                const { OrganizationRosterItemMobileComponentRender } = this.state;
                p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemMobileComponentRender
                roster_nickname={individualUserByIndividualId.username}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
                /></div>);
            } else if (theme === 'mobile/dark') {
                const { OrganizationRosterItemMobileComponentRender } = this.state;
                p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemMobileComponentRender
                roster_nickname={individualUserByIndividualId.username}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
                /></div>);
            } else {
                p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemComponentRender
                roster_nickname={individualUserByIndividualId.username}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
            /></div>);
            }
        });
        return (<div>
            <div
                onClick={this.props.closeRosters}
                tabIndex={-2}
                role="menuItem"
                style={{
                    cursor: 'pointer',
                    fontSize: 28,
                    position: 'absolute',
                    right: 32,
                    top: 94,
                    zIndex: 10000,
                    color: close_button,
                }}><span className="fa fa-window-close" /></div>
                <div
                    tabIndex={-1}
                    role="menuItem"
                    style={{
                        width: '100%',
                        fontSize: 32,
                        fontWeight: 900,
                        position: 'absolute',
                        top: 200,
                        left: '0%',
                        textAlign: 'center',
                        color: close_button,
                        zIndex: 10000,
                    }}>
                    {no_items}
                </div>
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

export default inject('uiStore', 'appManager')(OrganizationRosterController);
