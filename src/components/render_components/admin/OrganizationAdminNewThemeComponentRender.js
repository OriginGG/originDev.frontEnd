/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class OrganizationAdminThemeComponentRender extends Component {
    render( ) {
        return (
            <div>
                <div className={this.props.classes.admin_title_box}>
                    <h2>Manage Theme</h2>
                </div>
                <div className={this.props.classes.theme_type_container}>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.enigma_dark_style} onClick={this.props.handleEnigmaDarkClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.enigma_dark_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Enigma Dark</div>
                    </div>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.enigma_light_style} onClick={this.props.handleEnigmaLightClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.enigma_light_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Enigma Light</div>
                    </div>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.obliviot_dark_style} onClick={this.props.handleObliviotDarkClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.obliviot_dark_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Obliviot Dark</div>
                    </div>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.obliviot_light_style} onClick={this.props.handleObliviotLightClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.obliviot_light_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Obliviot Light</div>
                    </div>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.felzec_light_style} onClick={this.props.handleFelzecLightClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.felzec_light_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Felzek</div>
                    </div>
                    <div className={this.props.classes.admin_theme_display_container} style={this.props.enigma2_dark_style} onClick={this.props.handleEnigma2DarkClick}>
                        <img className={this.props.classes.admin_theme_display_image} src={this.props.enigma2_dark_image}/>
                        <div className={this.props.classes.admin_theme_display_text}>Enigma2</div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box} onClick={this.props.handleSubmit}>
                    <div className={this.props.classes.admin_submit_button}>Save</div>
                </div>
                <p>Change Jumbotron Images</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change Main Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_main_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editMainImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change Sponsor Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_sponsor_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editSponsorImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change News Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_news_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editNewsImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change Matches Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_matches_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editMatchessImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change Rosters Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_rosters_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editRostersImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <p>Change Media Background (Felzec Theme)</p>
                <div className={this.props.classes.jumbotron_container}>
                    <img className={this.props.classes.jumbotron_image} src={this.props.image_media_src}/>
                    <div id="theme_modal_button" className={this.props.classes.jumbotron_overlay} onClick={this.props.editMediaImage}>
                        <div className={this.props.classes.jumbotron_model_switch}>Edit</div>
                    </div>
                </div>
                <div id="theme_modal" className="ui modal">
                    <i className="close icon"/>
                    <div className={this.props.classes.modal_inner}>
                        <div className="header">
                            <div className={this.props.classes.admin_title_box}>
                                <h2>Section 1 Background Image</h2>
                            </div>
                        </div>
                        <div className={this.props.classes.admin_file_button}>
                            <label className="class.admin_sponser_label" htmlFor="hidden-new-file">
                                <i className="cloud icon"/>
                                Choose File
                            </label>
                            <input type="file" id="hidden-new-file" style={{
                                display: 'none'
                            }}/>
                        </div>
                        <div className={this.props.classes.modal_blog_media_container}>
                            <img id="blog_media_preview" className={this.props.classes.modal_blog_media_preview} src={this.props.preview_image}/>
                        </div>
                        <p className={this.props.classes.theme_modal_OR}>OR</p>
                        <div className={this.props.classes.theme_modal_small_container}>
                            <img className={this.props.classes.theme_modal_small_img} src={this.props.default_image1}/>
                            <img className={this.props.classes.theme_modal_small_img} src={this.props.default_image2}/>
                            <img className={this.props.classes.theme_modal_small_img} src={this.props.default_image3}/>
                        </div>
                        <div className="ui fluid input">
                            <input type="text" placeholder="Color"/>
                        </div>
                        <div className="actions">
                            <div className={this.props.classes.blog_add_actions}>
                                <div className="ui black deny button">
                                    Cancel
                                </div>
                                <div className="ui positive right labeled icon button">
                                    Save
                                    <i className="checkmark icon"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.admin_submit_box} onClick={this.props.handleSubmit}>
                    <div className={this.props.classes.admin_submit_button}>Save</div>
                </div>
            </div>
        )
    }
}

OrganizationAdminThemeComponentRender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default injectSheet( GlobalStyles )( OrganizationAdminThemeComponentRender )