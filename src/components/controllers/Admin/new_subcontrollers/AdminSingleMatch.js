import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import ReactSwipe from 'react-swipe';
import {
	// Button,
	ButtonToolbar,
	Panel,
	Form,
	FormGroup,
	FormControl,
	// Modal,
	IconButton,
	InputNumber,
	DatePicker,
	Icon,
	// Uploader,
	ControlLabel,
	// Notification,
	// HelpBlock,
	Row,
	Uploader,
	Grid,
	Col,
	SelectPicker
} from 'rsuite';

// import OrganizationAdminProfileComponentRender from '../../../render_components/admin/OrganizationAdminProfileComponentRender';
// import {
// 	updateOrganisationQuery,
// 	getOrganisationQuery,
// 	getOrganisationQueryAnyCase
// } from '../../../../queries/organisation';
// import { updateThemeQuery } from '../../../../queries/themes';
// import UploaderButton from './helpers/UploaderButton';

// function open(funcName, description) {
// 	Notification[funcName]({
// 		title: funcName,
// 		description
// 	});
// }
import findIndex from 'lodash/findIndex';
import { gameOptions } from './data/AllGames';
import blankImage from '../../../../assets/images/new_image_placeholder.png';
import UploaderButton from './helpers/UploaderButton';
import open from './helpers/Notify';
import { createRecentMatchQuery, updateRecentMatchQuery } from '../../../../queries/matches';

const selData = [
	{
		value: '1',
		label: 'Recent Matches'
	},
	{
		value: '2',
		label: 'Upcoming Matches'
	}
];
class AdminSingleMatchController extends Component {
	state = {
		visible: false,
		galleryItems: [],
		input_values: {
			my_score: '0',
			their_score: '0',
			url: '',
			match_type: '1',
			desc: '',
			date: new Date()
		},
		file_list: [],
		image_src: '',
		game_name: ''
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		const galleryItems = [];
		this.start_slide = 0;
		gameOptions.forEach((s, i) => {
			galleryItems.push(
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 200
					}}
					alt="test"
					key={`i_${i}`}
					src={s.image}
				/>
			);
		});
		let g = 0;
		if (this.props.match) {
			const { gameName } = this.props.match;
			const { gameLogo } = this.props.match;
			g = findIndex(gameOptions, (o) => {
				return o.value === gameName;
			});
			this.start_slide = g;
			const t = this.props.match.eventInfo === 'rm' ? '1' : '2';
			const { score } = this.props.match;
			const p_array = score.split(' - ');
			this.setState({
				input_values: {
					match_type: t,
					date: new Date(this.props.match.eventDate),
					desc: this.props.match.eventDescription,
					url: this.props.match.eventUrl,
					my_score: p_array[0],
					their_score: p_array[1]
				},
				image_src: gameLogo
			});
		}
		this.setState({
			visible: true,
			game_name: gameOptions[g].text,
			galleryItems
		});
	}
	dateSelect = (d) => {
		const { input_values } = this.state;
		input_values.date = d;
		this.setState({ input_values });
	};
	typeSelect = (d) => {
		const { input_values } = this.state;
		input_values.match_type = d;
		this.setState({ input_values });
	};
	slideCallBack = (e) => {
		const gm = gameOptions[e];
		// this.setState({ current_slide_src: slide_array[e] });
		this.setState({ game_name: gm.text });
		this.selected_slide = e;
	};
	handleSubmit = async () => {
		const ty = this.state.input_values.match_type === '1' ? 'rm' : 'um';
		if (!this.props.match) {
			await this.props.appManager.executeQueryAuth('mutation', createRecentMatchQuery, {
				organisationId: this.props.uiStore.current_organisation.id,
				gameName: this.state.game_name,
				eventInfo: ty,
				eventUrl: this.state.input_values.url,
				eventDate: this.state.input_values.date,
				gameLogo: this.state.image_src,
				eventDescription: this.state.desc,
				score: `${this.state.input_values.my_score} - ${this.state.input_values.their_score}`
			});
			open('success', 'Match Added');
		} else {
			await this.props.appManager.executeQueryAuth('mutation', updateRecentMatchQuery, {
				id: this.props.match.id,
				organisationId: this.props.uiStore.current_organisation.id,
				gameName: this.state.game_name,
				eventInfo: ty,
				eventUrl: this.state.input_values.url,
				eventDate: this.state.input_values.date,
				gameLogo: this.state.image_src,
				eventDescription: this.state.desc,
				score: `${this.state.input_values.my_score} - ${this.state.input_values.their_score}`
			});
			open('success', 'Match Updated');
		}
		this.props.handleBack();
	};
	handleFileChange = (value) => {
		this.setState({ file_list: value });
	};
	handleFileSuccess = (f) => {
		this.setState({ file_list: [], image_src: f.secure_url });
	};
	handleFileError = (f) => {
		console.log(f);
	};
	render() {
		const btext = !this.props.match ? 'ADD MATCH' : 'UPDATE MATCH';
		if (this.state.visible === false) {
			return null;
		}
		const theme = '';
		const subDomain = `_${this.props.uiStore.current_organisation.id}_`;
		const image_src = this.state.image_src ? this.state.image_src : blankImage;
		const formValue = this.state.input_values;
		return (
			<div>
				<Panel header={<h3>Add Recent Match</h3>} bordered>
					<Grid fluid>
						<Col lg={6} xs={24}>
							<Panel bordered>
								<ReactSwipe
									className="single-carousel"
									swipeOptions={{
										startSlide: this.start_slide,
										continuous: true,
										callback: this.slideCallBack
									}}
									ref={(el) => (this.reactSwipeEl = el)} // eslint-disable-line
								>
									{this.state.galleryItems}
								</ReactSwipe>
								<h2 style={{ textAlign: 'center' }}>{this.state.game_name}</h2>
								<ButtonToolbar style={{ textAlign: 'center', marginTop: 41 }}>
									<IconButton
										onClick={() => this.reactSwipeEl.prev()}
										icon={<Icon icon="arrow-left" />}
										placement="left"
									/>
									<IconButton
										onClick={() => this.reactSwipeEl.next()}
										icon={<Icon icon="arrow-right" />}
										placement="right"
									/>
								</ButtonToolbar>
							</Panel>
						</Col>
						<Col lg={18} xs={24}>
							<Panel bordered>
								<div style={{ minHeight: 200 }}>
									<Grid fluid>
										<Row>
											<Col lg={12} xs={24}>
												<div
													style={{
														textAlign: 'center',
														minHeight: 200,
														display: 'flex',
														alignItems: 'center'
													}}
												>
													<img
														src={image_src}
														alt=""
														style={{
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
															maxHeight: 200,
															maxWidth: 372
														}}
													/>
												</div>
											</Col>
											<Col lg={12} xs={24}>
												<div
													style={{
														minHeight: 200,
														display: 'flex',
														alignItems: 'center'
													}}
												>
													<Uploader
														toggleComponentClass={(props) => {
															return (
																<UploaderButton
																	ButtonText="Upload Opposition Logo"
																	{...props}
																/>
															);
														}}
														accept="image/x-png,image/gif,image/jpeg"
														listType="picture-text"
														onSuccess={this.handleFileSuccess}
														onError={this.handleFileError}
														fileList={this.state.file_list}
														name="images"
														action={`${process.env
															.REACT_APP_API_SERVER}/c_upload?sub_domain=${subDomain}&theme=${theme}`}
														onChange={this.handleFileChange}
													/>
												</div>
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
														<ControlLabel>Select Match Type</ControlLabel>
														<SelectPicker
															value={this.state.input_values.match_type}
															searchable={false}
															style={{ width: '100%' }}
															data={selData}
															onSelect={this.typeSelect}
														/>
														<ControlLabel>Your Score</ControlLabel>
														<FormControl accepter={InputNumber} name="my_score" />
														<ControlLabel>Their Score</ControlLabel>
														<FormControl accepter={InputNumber} name="their_score" />
														<ControlLabel>Info URL</ControlLabel>
														<FormControl name="url" />
														<ControlLabel>Event/Description</ControlLabel>
														<FormControl name="desc" />
														<ControlLabel>Select Date</ControlLabel>
														<DatePicker
															value={this.state.input_values.date}
															placement="leftBottom"
															onSelect={this.dateSelect}
															style={{ width: '100%' }}
														/>
													</FormGroup>
												</Form>
												<IconButton
													style={{ marginTop: 40 }}
													onClick={() => {
														this.handleSubmit();
													}}
													appearance="primary"
													icon={<Icon icon="flag" />}
													placement="right"
												>
													{btext}
												</IconButton>
												<IconButton
													style={{ float: 'right', marginTop: 40 }}
													onClick={() => {
														this.props.handleBack();
													}}
													appearance="secondary"
													icon={<Icon icon="arrow-left" />}
													placement="right"
												>
													GO BACK
												</IconButton>
											</Col>
										</Row>
									</Grid>
								</div>
							</Panel>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

AdminSingleMatchController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	handleBack: PropTypes.func.isRequired,
	match: PropTypes.object,
	appManager: PropTypes.object.isRequired
};

AdminSingleMatchController.defaultProps = {
	match: null
};

export default inject('uiStore', 'appManager')(AdminSingleMatchController);
