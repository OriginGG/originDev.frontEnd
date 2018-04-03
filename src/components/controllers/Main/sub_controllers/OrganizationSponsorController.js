import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import InfiniteCarousel from 'react-leaf-carousel';
import { GlobalStyles } from 'Theme/Theme';
// import OrganizationSponsorComponentRender from '../../../render_components/OrganizationSponserComponentRender';
import { getSponsorsQuery } from '../../../../queries/sponsors';
import sponsorImage1 from '../../../../assets/images/sponsor-logo1.png';
import sponsorImage2 from '../../../../assets/images/sponsor-logo2.png';
// import { getOrganisationQuery } from './queries/organisation'
class OrganizationSponsorController extends Component {
    state = { currentIndex: 0, visible: false };
    componentWillMount = async () => {
        this.timer = setInterval(() => {
            this.moveScroll();
        }, 3000);
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

    moveScroll = () => {
        if (this.mouse_over === false) {
            let x = this.state.currentIndex;
            if (x > 2) {
                x = 0;
            }
            this.setState({ currentIndex: x + 1 });
        }
    }
    mouseEnter = () => {
        this.mouse_over = true;
    }
    mouseLeave = () => {
        this.mouse_over = false;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ height: 53, marginTop: -14 }}>
                <InfiniteCarousel
                    breakpoints={[
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                    arrows={false}
                    autoCycle={true}
                    dots={false}
                    showSides={false}
                    slidesToScroll={1}
                    slidesToShow={1}
                    scrollOnDevice={false}
                >
                    <div style={{ marginTop: 0 }}>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image1} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image2} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image3} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image4} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                    </div>
                    <div style={{ marginTop: 0 }}>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image1} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image2} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image3} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                        <div className="container col-sm-4" style={{ width: 274, float: 'left' }}>
                            <img src={this.sponsor_image4} alt="Change Logo" className={this.props.classes.header_logo} style={{ width: 'auto', height: 35 }} />
                        </div>
                    </div>
                </InfiniteCarousel>
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
