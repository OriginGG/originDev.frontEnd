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
        const { nodes } = sponsor_data.organisationAccountBySubDomain.orgSponsorsByOrganisation;
        this.sponsor_data = nodes;
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
        // console.log(`link = ${link}`);
        if (link && link.includes('http')) {
            // console.log(`link has http = ${link}`);
            window.open(link, '_blank');
        } else if (link) {
            // console.log(`link not full ${link}`);
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
                    items: 1
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
        this.image_src = this.props.uiStore.current_theme_structure.main_section.background.imageData;
        const sponsor_style = { background: `url(${this.image_src})`, backgroundSize: 'cover' };

        const spons_style = { filter: 'grayscale(100%)' };
        // const sponsor_style = { backgroundColor: '#040404' };
        this.sponsor_data.forEach((n, i) => {
            p_array.push(<OrganizationSponserComponentElementRender handleClick={() => { this.handleClick(n.hrefLink); }} key={`sponsor_${i}`} sponsor_image={n.imageUrl} spons_style={spons_style} />);
        });
        return (
            <OrganizationSponserComponentRender felzec_sponsor_style={sponsor_style} sponsor_content={<AliceCarousel {...settings}>{p_array}</AliceCarousel>} />
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
