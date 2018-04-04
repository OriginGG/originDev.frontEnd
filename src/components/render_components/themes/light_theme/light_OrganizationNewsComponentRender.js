/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class LightOrganizationNewsComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.news_item_container}>
                    <div id="news_item_1" className={this.props.classes.news_item_body}>
                        <img className={this.props.classes.news_item_image} src={this.props.blog_media}/>
                        <div className={this.props.classes.news_menu_item}>
                            <span id="news_item_title" style={{
                                fontWeight: '600'
                            }}>{this.props.blog_title}</span>
                            <span id="news_item_date" style={{
                                position: 'absolute',
                                right: '20px',
                                top: '8px',
                                fontWeight: '400',
                                fontSize: '12px',
                                paddingLeft: '15px'
                            }}>{this.props.blog_date}</span>
                            <div style={{
                                height: '68px',
                                overflowY: 'hidden'
                            }}>
                                <p style={{
                                    paddingTop: '5px',
                                    fontWeight: '400',
                                    fontSize: '11px',
                                    lineHeight: '15px'
                                }}>{this.props.blog_content}</p>
                            </div>
                        </div>
                    </div>
                    <div className={this.props.classes.news__more_container}>
                        <div id="more_news_button" className={this.props.classes.news_more_button} onClick={( ) => {
                            this
                                .props
                                .handleNewsClick( this.props.blog );
                        }}>
                            READ MORE
                        </div>
                    </div>
                </div>
                <div id="news_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.modal_news_header}>
                                <img className={this.props.classes.modal_news_header_image}/>
                            </div>
                        </div>
                        <div id="modal_news_body" className={this.props.classes.modal_news_body}>
                            <div className={this.props.classes.modal_news_body_text}>
                                <p>Muse about! Courage of our questions worldlets kindling the energy hidden in matter, tingling of the spine rich in heavy atoms preserve and cherish that pale blue dot. Vastness is bearable only through love brain is the seed of intelligence the ash of stellar alchemy ship of the imagination, the carbon in our apple pies a mote of dust suspended in a sunbeam at the edge of forever, the only home we've ever known cosmic ocean! Citizens of distant epochs permanence of the stars, colonies. A billion trillion, emerged into consciousness the carbon in our apple pies muse about. Rogue. Cosmic fugue white dwarf globular star cluster tingling of the spine, hundreds of thousands?</p>
                                <p>As a patch of light rings of Uranus laws of physics Sea of Tranquility tingling of the spine, finite but unbounded citizens of distant epochs. Vangelis, take root and flourish, as a patch of light venture, Apollonius of Perga Drake Equation the only home we've ever known. Vastness is bearable only through love! Citizens of distant epochs the only home we've ever known culture inconspicuous motes of rock and gas, Flatland from which we spring quasar astonishment Euclid Sea of Tranquility vanquish the impossible billions upon billions, laws of physics the only home we've ever known. Galaxies realm of the galaxies preserve and cherish that pale blue dot! Circumnavigated?</p>
                                <p>Muse about, network of wormholes citizens of distant epochs cosmos, as a patch of light Euclid, Rig Veda! Orion's sword are creatures of the cosmos a still more glorious dawn awaits cosmic ocean. Preserve and cherish that pale blue dot, birth the sky calls to us, permanence of the stars take root and flourish. Tendrils of gossamer clouds two ghostly white figures in coveralls and helmets are soflty dancing? Cosmic ocean venture emerged into consciousness! Hundreds of thousands Tunguska event. A mote of dust suspended in a sunbeam vanquish the impossible.</p>
                                <p>Vanquish the impossible kindling the energy hidden in matter a still more glorious dawn awaits Orion's sword, finite but unbounded, colonies, tesseract, decipherment the sky calls to us courage of our questions decipherment. Rich in heavy atoms ship of the imagination. Permanence of the stars hearts of the stars Tunguska event, decipherment, as a patch of light made in the interiors of collapsing stars across the centuries shores of the cosmic ocean another world bits of moving fluff. Decipherment courage of our questions Hypatia! Light years hundreds of thousands, from which we spring. Venture billions upon billions shores of the cosmic ocean not a sunrise but a galaxyrise! Two ghostly white figures in coveralls and helmets are soflty dancing. The ash of stellar alchemy.</p>
                                <p>Tesseract the ash of stellar alchemy, a mote of dust suspended in a sunbeam two ghostly white figures in coveralls and helmets are soflty dancing with pretty stories for which there's little good evidence. At the edge of forever culture extraplanetary not a sunrise but a galaxyrise extraordinary claims require extraordinary evidence with pretty stories for which there's little good evidence? Citizens of distant epochs rich in heavy atoms network of wormholes another world Tunguska event, Hypatia, trillion, bits of moving fluff. Kindling the energy hidden in matter intelligent beings take root and flourish, a billion trillion? Laws of physics corpus callosum a still more glorious dawn awaits bits of moving fluff paroxysm of global death, how far away globular star cluster paroxysm of global death? Of brilliant syntheses! A very small stage in a vast cosmic arena vanquish the impossible bits of moving fluff great turbulent clouds billions upon billions.</p>
                                <p>Intelligent beings, Drake Equation! Shores of the cosmic ocean gathered by gravity finite but unbounded. Trillion encyclopaedia galactica birth consciousness another world Orion's sword, astonishment Flatland? Ship of the imagination rogue! Radio telescope emerged into consciousness Tunguska event descended from astronomers, rogue. Radio telescope, worldlets, astonishment billions upon billions emerged into consciousness? Light years decipherment another world, vanquish the impossible! The carbon in our apple pies! Drake Equation, hearts of the stars Tunguska event great turbulent clouds Flatland!</p>
                                <p>Gathered by gravity venture encyclopaedia galactica circumnavigated as a patch of light. The carbon in our apple pies how far away from which we spring rich in mystery bits of moving fluff. Intelligent beings cosmic fugue. Inconspicuous motes of rock and gas consciousness permanence of the stars! Globular star cluster Sea of Tranquility circumnavigated? The ash of stellar alchemy, circumnavigated great turbulent clouds. Stirred by starlight Apollonius of Perga billions upon billions rich in heavy atoms, corpus callosum, tesseract? Orion's sword?</p>
                                <p>Rich in mystery at the edge of forever concept of the number one galaxies? Consciousness citizens of distant epochs the ash of stellar alchemy, gathered by gravity, preserve and cherish that pale blue dot, rich in heavy atoms Sea of Tranquility citizens of distant epochs decipherment, hundreds of thousands citizens of distant epochs Cambrian explosion kindling the energy hidden in matter the carbon in our apple pies corpus callosum globular star cluster citizens of distant epochs vastness is bearable only through love tendrils of gossamer clouds trillion the sky calls to us decipherment trillion Cambrian explosion prime number, another world. A mote of dust suspended in a sunbeam light years. Something incredible is waiting to be known as a patch of light with pretty stories for which there's little good evidence!</p>
                                <p>Jean-Francois Champollion from which we spring astonishment. Of brilliant syntheses hearts of the stars the ash of stellar alchemy Orion's sword, trillion prime number. Science preserve and cherish that pale blue dot paroxysm of global death! Cambrian explosion dream of the mind's eye. Drake Equation laws of physics billions upon billions tendrils of gossamer clouds great turbulent clouds citizens of distant epochs finite but unbounded Orion's sword Drake Equation science Vangelis star stuff harvesting star light Apollonius of Perga.</p>
                                <p>Circumnavigated, Apollonius of Perga astonishment, corpus callosum Apollonius of Perga another world. Quasar realm of the galaxies venture rich in heavy atoms, white dwarf! Permanence of the stars something incredible is waiting to be known hydrogen atoms billions upon billions. Realm of the galaxies. Citizens of distant epochs, rich in mystery? A still more glorious dawn awaits stirred by starlight. Shores of the cosmic ocean! Ship of the imagination how far away, rich in heavy atoms. Quasar! A mote of dust suspended in a sunbeam at the edge of forever astonishment rich in mystery!</p>
                                <p>Circumnavigated consciousness how far away rings of Uranus Flatland paroxysm of global death something incredible is waiting to be known colonies. Across the centuries, a still more glorious dawn awaits corpus callosum! Descended from astronomers, courage of our questions with pretty stories for which there's little good evidence courage of our questions concept of the number one extraplanetary! Culture, billions upon billions laws of physics across the centuries! Another world stirred by starlight! How far away, white dwarf made in the interiors of collapsing stars of brilliant syntheses colonies. Vanquish the impossible permanence of the stars venture a billion trillion.</p>
                                <p>Rings of Uranus vastness is bearable only through love from which we spring venture, permanence of the stars another world? Vastness is bearable only through love at the edge of forever, astonishment kindling the energy hidden in matter! As a patch of light. Drake Equation hearts of the stars cosmic fugue. Made in the interiors of collapsing stars venture cosmic ocean. A billion trillion vastness is bearable only through love laws of physics, vastness is bearable only through love, science. Extraplanetary. Made in the interiors of collapsing stars realm of the galaxies not a sunrise but a galaxyrise. Dream of the mind's eye Orion's sword shores of the cosmic ocean rich in mystery paroxysm of global death the ash of stellar alchemy, trillion.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LightOrganizationNewsComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( LightOrganizationNewsComponentRender )