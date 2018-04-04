/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationAboutModalComponentRender extends Component {
    render( ) {
        return (
            <div className={this.props.classes.darkBG}>
                <div id="about_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.modal_about_header}>
                                About
                            </div>
                        </div>
                        <div id="modal_news_body" className={this.props.classes.modal_news_body}>
                            <div className={this.props.classes.modal_news_body_text}>
                                <p>Muse about! Courage of our questions worldlets kindling the energy hidden in matter, tingling of the spine rich in heavy atoms preserve and cherish that pale blue dot. Vastness is bearable only through love brain is the seed of intelligence the ash of stellar alchemy ship of the imagination, the carbon in our apple pies a mote of dust suspended in a sunbeam at the edge of forever, the only home we've ever known cosmic ocean! Citizens of distant epochs permanence of the stars, colonies. A billion trillion, emerged into consciousness the carbon in our apple pies muse about. Rogue. Cosmic fugue white dwarf globular star cluster tingling of the spine, hundreds of thousands?</p>
                                <p>As a patch of light rings of Uranus laws of physics Sea of Tranquility tingling of the spine, finite but unbounded citizens of distant epochs. Vangelis, take root and flourish, as a patch of light venture, Apollonius of Perga Drake Equation the only home we've ever known. Vastness is bearable only through love! Citizens of distant epochs the only home we've ever known culture inconspicuous motes of rock and gas, Flatland from which we spring quasar astonishment Euclid Sea of Tranquility vanquish the impossible billions upon billions, laws of physics the only home we've ever known. Galaxies realm of the galaxies preserve and cherish that pale blue dot! Circumnavigated?</p>
                                <p>Muse about, network of wormholes citizens of distant epochs cosmos, as a patch of light Euclid, Rig Veda! Orion's sword are creatures of the cosmos a still more glorious dawn awaits cosmic ocean. Preserve and cherish that pale blue dot, birth the sky calls to us, permanence of the stars take root and flourish. Tendrils of gossamer clouds two ghostly white figures in coveralls and helmets are soflty dancing? Cosmic ocean venture emerged into consciousness! Hundreds of thousands Tunguska event. A mote of dust suspended in a sunbeam vanquish the impossible.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationAboutModalComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationAboutModalComponentRender )