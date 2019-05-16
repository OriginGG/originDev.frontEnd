import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';
import Dropzone from 'react-dropzone';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import axios from 'axios';
import {
	Button,
	ButtonToolbar,
	Panel,
	Form,
	FormGroup,
	FormControl,
	Divider,
	ControlLabel,
	Notification,
	HelpBlock,
	Grid,
	Col,
	Row
} from 'rsuite';

// import OrganizationAdminProfileComponentRender from '../../../render_components/admin/OrganizationAdminProfileComponentRender';
import { createIndividualUserQuery, getIndividualUserByEmailQuery } from '../../../../queries/users';
import { updateIndividualUserQuery, getIndividualUserByHandleQuery } from '../../../../queries/individuals';
import blankImage from '../../../../assets/images/blank_person.png';
import blankImage2 from '../../../../assets/images/imgPlaceholder1.png';

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}

class AdminAddIndividualController extends Component {
	state = {
		input_values: {
			accomplishments: '',
			first_name_value: '',
			last_name_value: '',
			facebook_value: '',
			twitch_value: '',
			twitter_value: '',
			instagramLink: '',
			user_name_value: '',
			email: '',
			password: '',
			youtube_channel_value: '',
			youtube_video_1_value: '',
			youtube_video_2_value: '',
			youtube_video_3_value: '',
			about: '',
			profile_src: blankImage,
			banner_src: blankImage2
		}
	};
	componentDidMount() {
		this.upload_file = false;
		this.upload_banner_file = false;
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
	}
	getInputValue = (i) => {
		return i === null ? '' : i;
	};
	isMobile = () => {
		// return true;
		console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
		if (isMobile || window.outerWidth < 1050) {
			return true;
		}
		return false;
	};
	isURL = (str) => {
		// console.log(`string is ${str}`);
		return str.includes('http');
	};
	tooShort = (str) => {
		// console.log(`str.length = ${str.length}`);
		return str.length < 5;
	};
	tooLong = (str) => {
		// console.log(`str.length = ${str.length}`);
		return str.length > 255;
	};
	isTwitchURL = (str) => {
		// console.log(`WWWWWWWWWWWWWWWWWWWWWWWWWWWWW string is ${str}`);
		return str.includes('https://www.twitch.tv/team/');
	};
	handleSubmit = async () => {
		// a change in current subdomain.
		if (!this.state.input_values.first_name_value) {
			open('error', 'First Name must be supplied');
			return;
		}
		if (!this.state.input_values.email) {
			open('error', 'Email must be supplied');
			return;
		}
		if (!this.state.input_values.user_name_value) {
			open('error', 'Username must be supplied');
			return;
		}
		if (this.tooShort(this.state.input_values.password)) {
			open('error', 'Password is too short!');
			return;
		}
		if (this.tooLong(this.state.input_values.youtube_channel_value)) {
			open('error', 'YouTube URL exceeds 255 char limit');
			return;
		}
		if (this.state.input_values.youtube_channel_value.includes('http')) {
			open('error', 'YouTube Channel ID required not full URL');
			return;
		}
		if (this.state.input_values.twitter_value.includes('http')) {
			open('error', 'Twitter Handle required not full URL');
			return;
		}
		if (this.state.input_values.instagramLink.includes('http')) {
			open('error', 'Instagram ID required not full URL');
			return;
		}
		if (this.tooLong(this.state.input_values.twitter_value)) {
			open('error', 'Twitter Handle exceeds 255 char limit');
			return;
		}
		if (this.tooLong(this.state.input_values.twitch_value)) {
			open('error', 'Twitch URL exceeds 255 char limit');
			return;
		}
		const registered_user = await this.props.appManager.executeQuery('query', getIndividualUserByEmailQuery, {
			email: this.state.input_values.email
		});
		if (registered_user.allIndividualUsers.edges.length > 0) {
			open('error', 'A user with that email already exists!');
			return;
		}
		const named_user = await this.props.appManager.executeQuery('query', getIndividualUserByHandleQuery, {
			handle: this.state.input_values.user_name_value
		});
		if (named_user.allIndividualUsers.nodes.length > 0) {
			open('error', 'A user with that username already exists!');
			return;
		}
		let twitch_user_id = null;
		if (this.state.input_values.twitch_value) {
			const td = await axios.get(
				`${process.env.REACT_APP_API_SERVER}/twitch/getTwitchUserInfo?name=${this.state.input_values
					.twitch_value}`
			);
			if (td.data && td.data.success === true) {
				twitch_user_id = td.data.user.id;
			} else {
				open('error', `No Twitch User with name: ${this.state.input_values.twitch_value} exists!`);
				return;
			}
		}
		try {
			// export const createIndividualUserQuery = gql`mutation registerIndividual($firstName: String!, $lastName: String!, $email: String!, $password: String!, $authenticated: Boolean!, $userName: String! ) {
			const payload = {
				firstName: this.state.input_values.first_name_value,
				lastName: this.state.input_values.last_name_value,
				email: this.state.input_values.email,
				password: this.state.input_values.password,
				authenticated: true,
				userName: this.state.input_values.user_name_value
			};
			const user = await this.props.appManager.executeQuery('mutation', createIndividualUserQuery, payload);
			console.log(user);
			let logo_url = null;
			let banner_url = null;
			if (this.upload_file) {
				// const logo_data = await this.uploadLogo();
				const f = this.props.appManager.checkFileSizeLimit(this.logo_files);
				if (!f) {
					return;
				}
				const logo_data = await this.uploadLogoToCloudinary(
					'profile',
					user.individualUserRegister.individualUser.id,
					this.logo_files
				);
				logo_url = logo_data.secure_url;
			}
			if (this.upload_banner_file) {
				// const logo_data = await this.uploadLogo();
				const f = this.props.appManager.checkFileSizeLimit(this.b_logo_files);
				if (!f) {
					return;
				}
				const banner_data = await this.uploadLogoToCloudinary(
					'banner',
					user.individualUserRegister.individualUser.id,
					this.b_logo_files
				);
				banner_url = banner_data.secure_url;
			}
			await this.props.appManager.executeQueryAuth('mutation', updateIndividualUserQuery, {
				id: user.individualUserRegister.individualUser.id,
				about: this.state.input_values.about,
				bannerImageUrl: banner_url,
				profileImageUrl: logo_url,
				twitchUserId: twitch_user_id,
				userName: this.state.input_values.user_name_value,
				youtubeChannel: this.state.input_values.youtube_channel_value,
				twitterHandle: this.state.input_values.twitter_value,
				accomplishments: this.state.input_values.accomplishments,
				instagramLink: this.state.input_values.instagramLink,
				facebookLink: this.state.input_values.facebook_value,
				youtubeVideo1Url: this.state.input_values.youtube_video_1_value,
				youtubeVideo2Url: this.state.input_values.youtube_video_2_value,
				youtubeVideo3Url: this.state.input_values.youtube_video_3_value
			});
			this.props.handleAddMember(user.individualUserRegister.individualUser.id);
		} catch (err) {
			this.props.appManager.networkError();
		}
	};
	uploadLogoToCloudinary = (type, ind_id, files) => {
		return new Promise((resolve) => {
			const formData = new FormData();
			formData.append('images', files);
			const n = `ind_${type}_${ind_id}`;
			axios
				.post(
					`${process.env.REACT_APP_API_SERVER}/c_upload/?sub_domain=ind&theme=ind&force_name=${n}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				.then((x) => {
					resolve(x.data);
				});
		});
	};
	uploadFile = (e) => {
		this.logo_files = e[0]; // eslint-disable-line
		const reader = new FileReader();
		reader.readAsDataURL(this.logo_files);

		reader.onloadend = () => {
			const x = reader.result;
			const p = this.state.input_values;
			p.profile_src = x;
			this.setState({ input_values: p });
			this.upload_file = true;
		};
	};
	uploadFileBanner = (e) => {
		this.b_logo_files = e[0]; // eslint-disable-line
		const reader = new FileReader();
		reader.readAsDataURL(this.b_logo_files);

		reader.onloadend = () => {
			const x = reader.result;
			const p = this.state.input_values;
			p.banner_src = x;
			this.setState({ input_values: p });
			this.upload_banner_file = true;
		};
	};
	handleChange = (field, e) => {
		const v = e.target.value;
		const p = this.state.input_values;
		// console.log(`admin testing on change ${field} value ${v} input ${p}`);
		p[field] = v;
		this.setState({
			input_values: p
		});
	};

	handleFileClick = () => {
		this.dropzoneRef.open();
	};
	handleFileClickBanner = () => {
		this.dropzoneBannerRef.open();
	};
	render() {
		const formValue = this.state.input_values;
		return (
			<div>
				<Dropzone
					onDrop={this.uploadFile}
					style={{ width: 0, height: 0 }}
					ref={(node) => {
						this.dropzoneRef = node;
					}}
				/>
				<Dropzone
					onDrop={this.uploadFileBanner}
					style={{ width: 0, height: 0 }}
					ref={(node) => {
						this.dropzoneBannerRef = node;
					}}
				/>

				<Panel header={<h3>Personal Details</h3>} bordered>
					<Grid fluid>
						<Row>
							<Col lg={12} xs={24}>
								<img
									alt="logo"
									style={{ maxWidth: '100%', maxHeight: '320px' }}
									src={this.state.input_values.profile_src}
								/>
								<div>
									<Button
										style={{ marginTop: 8, marginBottom: 16 }}
										onClick={this.handleFileClick}
										appearance="primary"
									>
										Upload Profile Image
									</Button>
								</div>

								<Divider />
								<img
									alt="banner_logo"
									style={{ maxWidth: '100%', maxHeight: '320px' }}
									src={this.state.input_values.banner_src}
								/>
								<div>
									<Button
										style={{ marginTop: 8, marginBottom: 16 }}
										onClick={this.handleFileClickBanner}
										appearance="primary"
									>
										Upload Banner Image
									</Button>
								</div>
							</Col>
							<Col lg={12} xs={24}>
								<div>
									<Form
										style={{ paddingBottom: 0, marginBottom: 0 }}
										formValue={formValue}
										onChange={(input_values) => {
											console.log();
											this.setState({ input_values });
										}}
										fluid
									>
										<FormGroup>
											<ControlLabel>First Name</ControlLabel>
											<FormControl style={{ width: '80%' }} name="first_name_value" />
											<HelpBlock>Required</HelpBlock>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Last Name</ControlLabel>
											<FormControl name="last_name_value" />
										</FormGroup>
										<FormGroup>
											<ControlLabel>Username</ControlLabel>
											<FormControl name="user_name_value" />
											<HelpBlock>Required</HelpBlock>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Contact Email</ControlLabel>
											<FormControl name="email" />
											<HelpBlock>Required</HelpBlock>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Password</ControlLabel>
											<FormControl name="password" />
											<HelpBlock>Required</HelpBlock>
										</FormGroup>
										<FormGroup>
											<ControlLabel>About</ControlLabel>
											<FormControl rows={5} componentClass="textarea" name="about" />
										</FormGroup>
										<FormGroup>
											<ControlLabel>Accomplishments</ControlLabel>
											<FormControl rows={5} componentClass="textarea" name="accomplishments" />
										</FormGroup>
									</Form>
								</div>
							</Col>
						</Row>
					</Grid>
				</Panel>
				<Panel header={<h3>Social Media</h3>} bordered>
					<Grid fluid>
						<Col lg={12} xs={24}>
							<div>
								<Form
									style={{ paddingBottom: 0, marginBottom: 0 }}
									formValue={formValue}
									onChange={(input_values) => {
										console.log();
										this.setState({ input_values });
									}}
									fluid
								>
									<FormGroup>
										<ControlLabel>Twitch Handle</ControlLabel>
										<FormControl name="twitch_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Twitter Handle</ControlLabel>
										<FormControl name="twitter_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Instagram Link</ControlLabel>
										<FormControl name="instagramLink" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>Facebook Link</ControlLabel>
										<FormControl name="facebook_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>YouTube Channel</ControlLabel>
										<FormControl name="youtube_channel_value" />
									</FormGroup>
								</Form>
							</div>
						</Col>
						<Col lg={12} xs={24}>
							<div>
								<Form
									style={{ paddingBottom: 0, marginBottom: 0 }}
									formValue={formValue}
									onChange={(input_values) => {
										console.log();
										this.setState({ input_values });
									}}
									fluid
								>
									<FormGroup>
										<ControlLabel>YouTube Video 1</ControlLabel>
										<FormControl name="youtube_video_1_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>YouTube Video 1</ControlLabel>
										<FormControl name="youtube_video_2_value" />
									</FormGroup>
									<FormGroup>
										<ControlLabel>YouTube Video 1</ControlLabel>
										<FormControl name="youtube_video_3_value" />
									</FormGroup>
								</Form>
							</div>
						</Col>
					</Grid>
				</Panel>
				<div style={{ marginTop: 8, textAlign: 'center' }}>
					<ButtonToolbar>
						<Button onClick={this.handleSubmit} appearance="primary">
							Submit
						</Button>
						<Button onClick={this.props.handleCancel} appearance="default">Cancel</Button>
					</ButtonToolbar>
				</div>
			</div>
		);
	}
}

AdminAddIndividualController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired,
	handleAddMember: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(AdminAddIndividualController);
