/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

const images = [
    'https://res.cloudinary.com/origingg/video/upload/v1560964017/videos/Background_-_4422.mp4',
    'https://res.cloudinary.com/origingg/video/upload/v1560962967/videos/Tunnel_-_5175.mp4',
    'https://res.cloudinary.com/origingg/video/upload/v1560962669/videos/Video_Game_-_7249.mp4',
    'https://res.cloudinary.com/origingg/video/upload/v1560962126/videos/Pexels_Videos_3766.mp4',
    'https://res.cloudinary.com/origingg/video/upload/v1560961394/videos/test.mp4'
];

class CredentialsComponentRender extends Component {
    getRandomInt =(min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }   

    render() {
        const n = this.getRandomInt(0, 4);
        const s = images[n];
		return (
			<div>
				<div id="video-bg">
					<video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
						<source src={s} type="video/mp4" />
					</video>
				</div>

				<header className={this.props.classes.signupHeader}>
					<div className="ui container">
						<a href="/" className="header item">
							{this.props.headerComponent}
						</a>
					</div>
				</header>
				<div id="modal_container" className="container">
					<div>{this.props.bodyComponent}</div>
				</div>
				<div className={this.props.classes.signupFooter}>
					<p className={this.props.classes.signupFooterText}>© Origin. All rights reserved.</p>
				</div>
			</div>
		);
	}
}

CredentialsComponentRender.propTypes = {
	classes: PropTypes.object.isRequired
};

export default injectSheet(GlobalStyles)(CredentialsComponentRender);
