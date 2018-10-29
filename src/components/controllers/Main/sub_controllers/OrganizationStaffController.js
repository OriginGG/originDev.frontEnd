import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { GlobalStyles } from 'Theme/Theme';
import { staffOptions } from '../../Admin/sub_controllers/data/AllPositions';
import { getRosterQuery } from '../../../../queries/rosters';
import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationStaffController extends Component {
    state = { visible: false/* , overlay_showing: false */ };
    componentDidMount = async () => {
        const subDomain = this.props.uiStore.current_subdomain;

        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationRosterItemComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationRosterItemComponentRender`);
        const OrganizationAboutModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationAboutModalComponentRender`);
        const roster_data = await this.props.appManager.executeQuery('query', getRosterQuery, { subDomain, rosterType: 'staff' });
        const outer_edges = roster_data.allCombinedRosters.edges;
        let p_array = [];
        for (let outer in outer_edges) {                // eslint-disable-line
            const { edges } = outer_edges[outer].node.combinedRosterIndividualsByRosterId;
            const p_type = outer_edges[outer].node.positionId;
            const tx = _.find(staffOptions, o => o.position_id === p_type).text;
            const ed_array = [];
            // console.log(`staff = ${JSON.stringify(edges)}`);
            edges.forEach((ed) => {
                const pm = JSON.parse(JSON.stringify(ed));
                pm.node.individualUserByIndividualId.position = tx;
                ed_array.push(pm);
            });
            p_array = p_array.concat(ed_array);
        }
        const temp_style = { display: 'none' };
        this.setState({
            roster_list: p_array,
            felzec_overlay_style: temp_style,
            // theme_name: theme,
            // overlay_showing: false,
            visible: true,
            OrganizationAboutModalComponentRender: OrganizationAboutModalComponentRender.default,
            OrganizationRosterItemComponentRender: OrganizationRosterItemComponentRender.default
        });
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    handleClick = (i) => {              // eslint-disable-line
        // this.handle_social('twitter', i);
        // if (this.state.theme_name === 'felzec/light') {
        //     if (this.state.overlay_showing) {
        //         const temp_style = { display: 'none' };
        //         this.setState({ overlay_showing: false, felzec_overlay_style: temp_style });
        //         const x = this.props.appManager.getDomainInfo();
        //         let p = x.hostname;
        //         if (p.indexOf(x.subDomain) > -1) {
        //             p = p.substr(x.subDomain.length + 1, p.length);
        //             let pt = '';
        //             if (x.port) {
        //                 pt = `:${x.port}`;
        //             }
        //             const url = `${x.protocol}//${p}${pt}/individual?u=${i}`;
        //             window.open(url, '_blank');
        //         }
        //     } else {
        //         const temp_style = { display: 'inherit' };
        //         this.setState({ overlay_showing: true, felzec_overlay_style: temp_style });
        //     }
        // }

        const x = this.props.appManager.getDomainInfo();
        let p = x.hostname;
        if (p.indexOf(x.subDomain) > -1) {
            p = p.substr(x.subDomain.length + 1, p.length);
            let pt = '';
            if (x.port) {
                pt = `:${x.port}`;
            }
            const url = `${x.protocol}//${p}${pt}/individual?u=${i}`;
            window.open(url, '_blank');
        }
    }

    handleMouseOver = (i) => {
        console.log(JSON.stringify(i.display));
        const overlay_style = { display: 'inherit' };
        this.setState({ felzec_overlay_style: overlay_style });
    }

    handleMouseOut = (i) => {
        console.log(JSON.stringify(i.display));
        const overlay_style = { display: 'none' };
        this.setState({ felzec_overlay_style: overlay_style });
    }

    handle_social = (s, ind_user) => {
        // console.log(`type = ${s}`);
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
            default: {
                break;
            }
        }
        // console.log(s);
    }

    handleSupportClick = () => {
        console.log('handle support click');
        const emailTo = this.props.uiStore.current_organisation.supportContactEmail;
        window.open(`mailto:${emailTo}`, '_blank');
    }
    handleBusinessClick = () => {
        console.log('handle business click');
        const emailTo = this.props.uiStore.current_organisation.businessContactEmail;
        window.open(`mailto:${emailTo}`, '_blank');
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationRosterItemComponentRender } = this.state;
        const { OrganizationAboutModalComponentRender } = this.state;
        const p_array = [];
        let no_items = '';
        if (this.state.roster_list.length < 1) {
            no_items = 'No Staff Members Are Currently Listed';
            p_array.push(<div
                tabIndex={-1}
                role="menuItem"
                style={{
                    width: '100%',
                    fontSize: 32,
                    fontWeight: 900,
                    left: '0%',
                    textAlign: 'center',
                    color: close_button,
                    zIndex: 10000,
                }}>
                {no_items}
            </div>);
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let close_button = 'white';
        if (theme === 'obliviot/light' || theme === 'enigma/light') {
            close_button = 'black';
        }
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        const sponsor_style = { background: `url(${this.image_src})`, backgroundSize: 'cover' };
        this.state.roster_list.forEach((r, i) => {
            const { individualUserByIndividualId } = r.node;
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
            p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualUserByIndividualId.id); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationRosterItemComponentRender
                roster_nickname={individualUserByIndividualId.position}
                roster_about={individualUserByIndividualId.about}
                roster_name={individualUserByIndividualId.firstName}
                felzec_overlay_style={this.state.felzec_overlay_style}
                roster_image={im}
                ind_user={individualUserByIndividualId}
                handle_mouseover={this.handleMouseOver}
                handle_mouseout={this.handleMouseOut}
                handle_social={this.handle_social}
                twitter_style={twitter_style}
                facebook_style={facebook_style}
                youtube_style={youtube_style}
                instagram_style={instagram_style}
            /></div>);
        });
        const s = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover', filter: 'opacity(.2)' };
        const d = { background: 'url(https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg)', backgroundSize: 'cover' };
        const f = { backgroundColor: 'rgba(255,0,0,.7)' };
        let f_array = p_array;
        if (theme === 'felzec/light') {
            f_array = [];
        }
        console.log(`currennt_org = ${JSON.stringify(this.props.uiStore.current_organisation)}`);
        const b_email = this.props.uiStore.current_organisation.businessContactEmail;
        const s_email = this.props.uiStore.current_organisation.supportContactEmail;
        return (<div>
            <OrganizationAboutModalComponentRender
            extra_style={{ display: 'inherit' }}
            about_support_email={s_email}
            about_business_email={b_email}
            about_desc_style={d}
            about_staff={p_array}
            staff_style={s}
            filter_style={f}
            bg_style={sponsor_style}
            about_title={this.props.about_title}
            handleSupportClick={this.handleSupportClick}
            handleBusinessClick={this.handleBusinessClick}
            about_content={this.props.about_content} />
            <div
                onClick={this.props.closeStaff}
                tabIndex={-1}
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
            {f_array}</div>);
    }
}
OrganizationStaffController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    closeStaff: PropTypes.func.isRequired,
    about_title: PropTypes.string.isRequired,
    about_content: PropTypes.string.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationStaffController));
