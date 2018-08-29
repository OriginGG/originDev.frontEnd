import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getSponsorsQuery } from '../../../../queries/sponsors';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponserListController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        console.log(`them = ${theme}`);
        const subDomain = this.props.uiStore.current_subdomain;
        const OrganizationSponsersItemComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationSponsersItemComponentRender`);
        const sponser_data = await this.props.appManager.executeQuery('query', getSponsorsQuery, { subDomain });
        const { edges } = sponser_data.resultData.edges;
        console.log(`sponser_data = ${JSON.stringify(sponser_data.resultData.edges)}`);
        console.log(`edges = ${edges}`);
        this.setState({ sponser_data: sponser_data.resultData.edges, visible: true, OrganizationSponsersItemComponentRender: OrganizationSponsersItemComponentRender.default });
    }
    // handleClick = (link) => {
    //     if (link) {
    //         window.open(link, '_blank');
    //     }
    // }

    handleClick = (i) => {              // eslint-disable-line
        console.log(`i = ${i}`);
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

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationSponsersItemComponentRender } = this.state;
        const p_array = [];
        const no_items = '';
        // if (this.state.sponser_data.length < 1) {
        //      no_items = 'No Sponsers Are Currently In This List';
        // }
        const sponser_image1 = this.state.sponser_data[0].node.sponsor1;
        const sponser_image2 = this.state.sponser_data[0].node.sponsor2;
        const sponser_image3 = this.state.sponser_data[0].node.sponsor3;
        const sponser_image4 = this.state.sponser_data[0].node.sponsor4;
        const sponser_link1 = this.state.sponser_data[0].node.hrefLink1;
        const sponser_link2 = this.state.sponser_data[0].node.hrefLink2;
        const sponser_link3 = this.state.sponser_data[0].node.hrefLink3;
        const sponser_link4 = this.state.sponser_data[0].node.hrefLink4;
        const sponser_desc1 = this.state.sponser_data[0].node.sponsorDesc1;
        const sponser_desc2 = this.state.sponser_data[0].node.sponsorDesc2;
        const sponser_desc3 = this.state.sponser_data[0].node.sponsorDesc3;
        const sponser_desc4 = this.state.sponser_data[0].node.sponsorDesc4;
        const sponser_name1 = this.state.sponser_data[0].node.sponsorName1;
        const sponser_name2 = this.state.sponser_data[0].node.sponsorName2;
        const sponser_name3 = this.state.sponser_data[0].node.sponsorName3;
        const sponser_name4 = this.state.sponser_data[0].node.sponsorName4;

        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        let close_button = 'white';

        if (theme === 'obliviot/light') {
            close_button = 'black';
        }


        const sponser_array = [];

        if (sponser_desc1.length > 0) {
            sponser_array.push({
 s_image: sponser_image1, s_link: sponser_link1, s_desc: sponser_desc1, s_name: sponser_name1
});
        }

        if (sponser_desc2.length > 0) {
            sponser_array.push({
 s_image: sponser_image2, s_link: sponser_link2, s_desc: sponser_desc2, s_name: sponser_name2
});
        }

        if (sponser_desc3.length > 0) {
            sponser_array.push({
 s_image: sponser_image3, s_link: sponser_link3, s_desc: sponser_desc3, s_name: sponser_name3
});
        }

        if (sponser_desc4.length > 0) {
            sponser_array.push({
 s_image: sponser_image4, s_link: sponser_link4, s_desc: sponser_desc4, s_name: sponser_name4
});
        }
        // sponser_array.push({ s_image: sponser_image2, s_link: sponser_link2, s_desc: sponser_desc2 });
        // sponser_array.push({ s_image: sponser_image3, s_link: sponser_link3, s_desc: sponser_desc3 });
        // sponser_array.push({ s_image: sponser_image4, s_link: sponser_link4, s_desc: sponser_desc4 });

        console.log(`sponser_array = ${JSON.stringify(sponser_array)}`);

        sponser_array.forEach((r, i) => {
            console.log(`r = ${JSON.stringify(r)}`);
            const individualSponserByIndividualId = r;
            p_array.push(<div role="menuItem" tabIndex={-1} onClick={() => { this.handleClick(individualSponserByIndividualId.s_link); }} key={`roster_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationSponsersItemComponentRender
                sponser_image={individualSponserByIndividualId.s_image}
                sponser_name={individualSponserByIndividualId.s_name}
                sponser_desc={individualSponserByIndividualId.s_desc}
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

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationSponserListController));
