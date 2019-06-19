/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class CredentialsComponentRender extends Component {
	render() {
		return (
			<div className={this.props.classes}>
				<div className="fullscreen-bg">
					<video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
						<source src="https://res.cloudinary.com/origingg/video/upload/v1560962126/videos/Pexels_Videos_3766.mp4" type="video/mp4" />
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
