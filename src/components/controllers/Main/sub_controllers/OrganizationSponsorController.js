import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
// import Slider from 'react-slick';
import AliceCarousel from 'react-alice-carousel';
import { GlobalStyles } from 'Theme/Theme';
// import OrganizationSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';
import { getSponsorsQuery } from '../../../../queries/sponsors';
// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponsorController extends Component {
    state = { visible: false, OrganizationSponserComponentRender: null, OrganizationSponserComponentElementRender: null };
    componentDidMount = async () => {
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const OrganizationSponserComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationSponserComponentRender`);
        const OrganizationSponserComponentElementRender = await import(`../../../render_components/themes/${theme}/OrganizationSponserComponentElementRender`);
        const subDomain = this.props.uiStore.current_subdomain;
        const sponsor_data = await this.props.appManager.executeQuery('query', getSponsorsQuery, { subDomain });
        this.sponsor_image1 = sponsor_data.resultData.edges[0].node.sponsor1;
        this.sponsor_image2 = sponsor_data.resultData.edges[0].node.sponsor2;
        this.sponsor_image3 = sponsor_data.resultData.edges[0].node.sponsor3;
        this.sponsor_image4 = sponsor_data.resultData.edges[0].node.sponsor4;
        this.sponsor_link1 = sponsor_data.resultData.edges[0].node.hrefLink1;
        this.sponsor_link2 = sponsor_data.resultData.edges[0].node.hrefLink2;
        this.sponsor_link3 = sponsor_data.resultData.edges[0].node.hrefLink3;
        this.sponsor_link4 = sponsor_data.resultData.edges[0].node.hrefLink4;
        this.setState({
            visible: true,
            OrganizationSponserComponentRender: OrganizationSponserComponentRender.default,
            OrganizationSponserComponentElementRender: OrganizationSponserComponentElementRender.default,
        });
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    handleClick = (link) => {
        console.log(`link = ${link}`);
        if (link && link.includes('http')) {
            console.log(`link has http = ${link}`);
            window.open(link, '_blank');
        } else if (link) {
            console.log(`link not full ${link}`);
            const new_link = `http://${link}`;
            window.open(new_link, '_blank');
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        const settings = {
            buttonsDisabled: true,
            dotsDisabled: true,
            swipeDisabled: true,
            autoPlay: true,
            keysControlDisabled: true,
            autoPlayInterval: 6000,
            responsive: {
                0: {
                    items: 4
                },
                1024: {
                    items: 4
                },
                600: {
                    items: 2
                },
                480: {
                    items: 2
                }
            },

            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 6000,
            initialSlide: 0,
            variableWidth: false,
            arrows: false,
            // responsive: [{
            //     breakpoint: 1024,
            //     settings: {
            //         slidesToShow: 4,
            //         slidesToScroll: 4,
            //         infinite: true,
            //     }
            // }, {
            //     breakpoint: 600,
            //     settings: {
            //         slidesToShow: 2,
            //         slidesToScroll: 2,
            //         initialSlide: 2
            //     }
            // }, {
            //     breakpoint: 480,
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1
            //     }
            // }]
        };
        const { OrganizationSponserComponentRender } = this.state;
        const { OrganizationSponserComponentElementRender } = this.state;
        const p_array = [];
        p_array.push(<OrganizationSponserComponentElementRender handleClick={() => { this.handleClick(this.sponsor_link1); }} key="sponsor_1" sponsor_image={this.sponsor_image1} />);
        p_array.push(<OrganizationSponserComponentElementRender handleClick={() => { this.handleClick(this.sponsor_link2); }} key="sponsor_2" sponsor_image={this.sponsor_image2} />);
        p_array.push(<OrganizationSponserComponentElementRender handleClick={() => { this.handleClick(this.sponsor_link3); }} key="sponsor_3" sponsor_image={this.sponsor_image3} />);
        p_array.push(<OrganizationSponserComponentElementRender handleClick={() => { this.handleClick(this.sponsor_link4); }} key="sponsor_4" sponsor_image={this.sponsor_image4} />);
        return (
            <OrganizationSponserComponentRender sponsor_content={<AliceCarousel {...settings}>{p_array}</AliceCarousel>} />
        );
    }
}
OrganizationSponsorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationSponsorController));
