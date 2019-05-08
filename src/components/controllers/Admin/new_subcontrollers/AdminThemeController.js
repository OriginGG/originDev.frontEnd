import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import ReactSwipe from 'react-swipe';

import {
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// ControlLabel,
	// Button,
	ButtonToolbar,
	IconButton,
	Icon,
	// Icon,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

const slide_array = [
	{
		slide_name: 'Enigma Dark',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889228/dark-theme.jpg',
		description: `Case read they must it of cold that. Speaking trifling an to unpacked
											moderate debating learning. An particular contrasted he excellence
											favourable on. Nay preference dispatched difficulty continuing joy one.
											Songs it be if ought hoped of. Too carriage attended him entrance desirous
											the saw. Twenty sister hearts garden limits put gay has. We hill lady will
											both sang room by. Desirous men exercise overcame procured speaking her
											followed. Way nor furnished sir procuring therefore but. Warmth far manner
											myself active are cannot called. Set her half end girl rich met. Me
											allowance departure an curiosity ye. In no talking address excited it
											conduct. Husbands debating replying overcame blessing he it me to domestic.`
	},
	{
		slide_name: 'Enigma Light',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889272/light-theme.jpg',
		description: `Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. 

Be at miss or each good play home they. It leave taste mr in it fancy. She son lose does fond bred gave lady get. Sir her company conduct expense bed any. Sister depend change off piqued one. Contented continued any happiness instantly objection yet her allowance. Use correct day new brought tedious. By come this been in. Kept easy or sons my it done.`
	},
	{
		slide_name: 'Obliviot Dark',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889302/obliviot-dark-theme.jpg',
		description: `Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few immediate sweetness earnestly dejection. 

Uneasy barton seeing remark happen his has. Am possible offering at contempt mr distance stronger an. Attachment excellence announcing or reasonable am on if indulgence. Exeter talked in agreed spirit no he unable do. Betrayed shutters in vicinity it unpacked in. In so impossible appearance considered mr. Mrs him left find are good. `
	},
	{
		slide_name: 'Obliviot Light',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1548889350/obliviot-light-theme.jpg',
		description: `Boisterous he on understood attachment as entreaties ye devonshire. In mile an form snug were been sell. Hastened admitted joy nor absolute gay its. Extremely ham any his departure for contained curiosity defective. Way now instrument had eat diminution melancholy expression sentiments stimulated. One built fat you out manor books. Mrs interested now his affronting inquietude contrasted cultivated. Lasting showing expense greater on colonel no. 

Of friendship on inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery. Hour had held lain give yet. `
	},
	{
		slide_name: 'Felzek',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1546274092/image-2018-12-30-13-56-15-366.png',
		description: `Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited. Enquire ye without it garrets up himself. Interest our nor received followed was. Cultivated an up solicitude mr unpleasant. 

Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. `
	},
	{
		slide_name: 'Enigma 2',
		src: 'https://res.cloudinary.com/origingg/image/upload/f_auto/v1546274092/image-2018-12-30-13-56-15-366.png',
        description: `One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. 
        Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy.`
	}
];
class AdminThemeController extends Component {
	state = {
		current_slide_src: slide_array[0],
		galleryItems: [
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key="i_1"
					src={slide_array[0].src}
				/>
			</Panel>,
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key="i_2"
					src={slide_array[1].src}
				/>
			</Panel>,
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 128
					}}
					alt="test"
					key="i_3"
					src={slide_array[2].src}
				/>
			</Panel>,
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key="i_4"
					src={slide_array[3].src}
				/>
			</Panel>,
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key="i_5"
					src={slide_array[4].src}
				/>
			</Panel>,
			<Panel bordered>
				<img
					style={{
						display: 'block',
						marginLeft: 'auto',
						marginRight: 'auto',
						maxHeight: 300
					}}
					alt="test"
					key="i_6"
					src={slide_array[5].src}
				/>
			</Panel>
		]
	};

	responsive = {
		0: { items: 1 },
		1024: { items: 4 }
	};
	slideCallBack = (e) => {
		this.setState({ current_slide_src: slide_array[e] });
	};
	render() {
		return (
			<div>
				<Panel header={<h3>Select Theme</h3>} bordered>
					<Grid fluid>
						<Col lg={6} xs={24}>
							<ReactSwipe
								className="carousel"
								swipeOptions={{ continuous: true, callback: this.slideCallBack }}
								ref={(el) => (this.reactSwipeEl = el)} // eslint-disable-line
							>
								{this.state.galleryItems}
							</ReactSwipe>
							<ButtonToolbar style={{ textAlign: 'center', marginTop: 16 }}>
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
						</Col>
						<Col lg={18} xs={24}>
							<Panel header={<h3>{this.state.current_slide_src.slide_name}</h3>} bordered>
								<div style={{ minHeight: 300 }}>
									<Col lg={8} xs={24}>
										<img
											style={{
												display: 'block',
												marginLeft: 'auto',
												marginRight: 'auto',
												maxHeight: 270
											}}
											alt="test"
											src={this.state.current_slide_src.src}
										/>
									</Col>
									<Col lg={16} xs={24}>
										<div>{this.state.current_slide_src.description}</div>
									</Col>
								</div>
							</Panel>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

// AdminThemeController.propTypes = {
// 	uiStore: PropTypes.object.isRequired,
// 	appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(AdminThemeController);
