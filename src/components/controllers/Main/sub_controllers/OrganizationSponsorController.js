import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { GlobalStyles } from 'Theme/Theme';
// import OrganizationSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';
import { getSponsorsQuery } from '../../../../queries/sponsors';
import sponsorImage1 from '../../../../assets/images/sponsor-logo1.png';
import sponsorImage2 from '../../../../assets/images/sponsor-logo2.png';
// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponsorController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        const subDomain = this.props.uiStore.current_subdomain;
        const sponsor_data = await this.props.appManager.executeQueryAuth('query', getSponsorsQuery, { subDomain });
        if (sponsor_data.resultData.edges.length > 0) {
            this.sponsor_image1 = sponsor_data.resultData.edges[0].node.sponsor1;
            this.sponsor_image2 = sponsor_data.resultData.edges[0].node.sponsor2;
            this.sponsor_image3 = sponsor_data.resultData.edges[0].node.sponsor3;
            this.sponsor_image4 = sponsor_data.resultData.edges[0].node.sponsor4;
        }
        if (!this.sponsor_image1) {
            this.sponsor_image1 = sponsorImage1;
        }
        if (!this.sponsor_image2) {
            this.sponsor_image2 = sponsorImage2;
        }
        if (!this.sponsor_image3) {
            this.sponsor_image3 = sponsorImage1;
        }
        if (!this.sponsor_image4) {
            this.sponsor_image4 = sponsorImage2;
        }
        this.setState({ visible: true });
    }
    mouse_over = false;
    componentWillUnMount = () => {
        clearInterval(this.timer);
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const settings = {
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 6000,
            initialSlide: 0,
            variableWidth: false,
            arrows: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (
            <div className="col-sm-12" style={{ height: 36, maxWidth: 'calc(100vw - 68px)', overflow: 'hidden' }}>
                <Slider {...settings}>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image1} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image2} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image3} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image4} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image1} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image2} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image3} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                    <div className="container col-sm-4" style={{ width: '266px' }}>
                        <div>
                            <img src={this.sponsor_image4} alt="Change Logo" className={this.props.classes.header_logo} style={{ height: 35 }} />
                        </div>
                    </div>
                </Slider>
            </div>
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
