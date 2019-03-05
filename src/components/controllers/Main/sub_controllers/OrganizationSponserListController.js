import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getSponsorsQuery } from '../../../../queries/sponsors';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponserListController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }
        // console.log(`them = ${theme}`);
        // const subDomain = this.props.uiStore.current_subdomain;
        const OrganizationSponsersItemComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationSponsersItemComponentRender`);
        const sponser_data = await this.props.appManager.executeQuery('query', getSponsorsQuery, { organisationId: this.props.uiStore.current_organisation.id });
        const { nodes } = sponser_data.allOrgSponsors;
        // console.log(`sponser_data = ${JSON.stringify(sponser_data.resultData.edges)}`);
        // console.log(`nodes = ${JSON.stringify(nodes)}`);
        this.setState({ sponser_data: nodes, visible: true, OrganizationSponsersItemComponentRender: OrganizationSponsersItemComponentRender.default });
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
        // console.log(`i = ${i}`);
        if (i) {
            window.open(i, '_blank');
        }
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

    openPage = page => {
        // console.log(`open page ${page}`);
        window.open(page, '_blank');
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationSponsersItemComponentRender } = this.state;
        const p_array = [];
        let no_items = '';
        if (this.state.sponser_data.length < 1) {
             no_items = 'No Sponsers Are Currently In This List';
        }
        // const sponser_image1 = this.state.sponser_data[0].node.sponsor1;
        // const sponser_image2 = this.state.sponser_data[0].node.sponsor2;
        // const sponser_image3 = this.state.sponser_data[0].node.sponsor3;
        // const sponser_image4 = this.state.sponser_data[0].node.sponsor4;
        // const sponser_link1 = this.state.sponser_data[0].node.hrefLink1;
        // const sponser_link2 = this.state.sponser_data[0].node.hrefLink2;
        // const sponser_link3 = this.state.sponser_data[0].node.hrefLink3;
        // const sponser_link4 = this.state.sponser_data[0].node.hrefLink4;
        // const sponser_desc1 = this.state.sponser_data[0].node.sponsorDesc1;
        // const sponser_desc2 = this.state.sponser_data[0].node.sponsorDesc2;
        // const sponser_desc3 = this.state.sponser_data[0].node.sponsorDesc3;
        // const sponser_desc4 = this.state.sponser_data[0].node.sponsorDesc4;
        // const sponser_name1 = this.state.sponser_data[0].node.sponsorName1;
        // const sponser_name2 = this.state.sponser_data[0].node.sponsorName2;
        // const sponser_name3 = this.state.sponser_data[0].node.sponsorName3;
        // const sponser_name4 = this.state.sponser_data[0].node.sponsorName4;

        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }

        let close_button = 'white';

        if (theme === 'obliviot/light' || theme === 'enigma/light') {
            close_button = 'black';
        }


        const sponser_array = [];
        this.state.sponser_data.forEach(n => {
            if (n.description && n.description.length > 0) {
                sponser_array.push({
                    s_image: n.imageUrl, s_bg_image: n.bgImages, s_link: n.hrefLink, s_desc: n.description, s_name: n.name
                });
            }
        });
        // sponser_array.push({ s_image: sponser_image2, s_link: sponser_link2, s_desc: sponser_desc2 });
        // sponser_array.push({ s_image: sponser_image3, s_link: sponser_link3, s_desc: sponser_desc3 });
        // sponser_array.push({ s_image: sponser_image4, s_link: sponser_link4, s_desc: sponser_desc4 });

        // console.log(`sponser_array = ${JSON.stringify(sponser_array)}`);

        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        const fbg_style = { background: `url(${this.image_src})`, backgroundSize: 'cover' };

        if (theme === 'felzec/light') {
            const nav_style = { display: 'none' };
            p_array.push(<div role="menuItem" tabIndex={-1} key={`roster_gm_list_${theme}`} style={{ cursor: 'pointer' }}><OrganizationSponsersItemComponentRender
            bg_style={fbg_style}
            nav_style={nav_style}
        /></div>);
        }

        sponser_array.forEach((r, i) => {
            // console.log(`r = ${JSON.stringify(r)}`);
            const sl1 = <i key="social_item1" role="menuItem" tabIndex={-1} onClick={() => { this.openPage('http://www.facebook.com'); }} className="fab fa-facebook" />;
            const sl2 = <i key="social_item2" role="menuItem" tabIndex={-1} onClick={() => { this.openPage('http://www.twitter.com'); }} className="fab fa-twitter" />;
            const sl3 = <i key="social_item3" role="menuItem" tabIndex={-1} onClick={() => { this.openPage('http://www.instagram.com'); }} className="fab fa-instagram" />;
            const sl4 = <i key="social_item4" role="menuItem" tabIndex={-1} onClick={() => { this.openPage('http://www.youtube.com'); }} className="fab fa-youtube" />;
            const sl5 = <div key="social_item5" role="menuItem" tabIndex={-1} onClick={() => { this.openPage(r.s_link); }} >{r.s_link}</div>;
            const individualSponserByIndividualId = r;
            const bg_style = { background: `url(${individualSponserByIndividualId.s_bg_image})`, backgroundSize: 'cover' };
            p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualSponserByIndividualId.s_link); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationSponsersItemComponentRender
                sponser_image={individualSponserByIndividualId.s_image}
                sponser_name={individualSponserByIndividualId.s_name}
                sponser_desc={individualSponserByIndividualId.s_desc}
                social_link1={sl1}
                social_link2={sl2}
                social_link3={sl3}
                social_link4={sl4}
                sponsor_link={sl5}
                bg_style={bg_style}
            /></div>);
        });
        return (<div>
            <div
                onClick={this.props.closeSponsers}
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
                        color: 'white',
                        zIndex: 10000,
                    }}>
                    {no_items}
                </div>
            {p_array}</div>);
    }
}
OrganizationSponserListController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    // roster_id: PropTypes.number.isRequired,
    closeSponsers: PropTypes.func.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(OrganizationSponserListController);
