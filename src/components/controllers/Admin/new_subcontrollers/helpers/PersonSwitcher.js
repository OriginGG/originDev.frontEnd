import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Draggable } from 'react-smooth-dnd';

import {
	// Button,
	// ButtonToolbar,
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	// Icon,
	// IconButton,
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';

const applyDrag = (arr, dragResult) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0]; // eslint-disable-line
	}
	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}
	return result;
};

export default class PersonSwitcher extends Component {
	state = {
		target: [],
		source: [],
		visible: false
	};
	componentDidMount = () => {
		const { target, source } = this.props;
		this.setState({ target, source, visible: true });
	};
	render() {
		if (this.state.visible === false) {
			return null;
		}
		return (
			<div>
				<Panel bordered>
					<Grid fluid>
						<Col lg={11} xs={24}>
							<h3>Available Users</h3>
							<Container
								groupName="1"
								getChildPayload={(i) => this.state.source[i]}
								onDrop={(e) =>
									this.setState({ source: applyDrag(this.state.source, e) }, () => {
										this.props.updateArrays(this.state.source, this.state.target);
									})}
							>
								{this.state.source.map((p) => {
									return (
										<Draggable key={p.props.user.id}>
											<div className="draggable-item">{p}</div>
										</Draggable>
									);
								})}
							</Container>
						</Col>
						<Col lg={2} />
						<Col lg={11} xs={24}>
							<h3>Added Users</h3>
							<Container
								groupName="1"
								getChildPayload={(i) => this.state.target[i]}
								onDrop={(e) =>
									this.setState({ target: applyDrag(this.state.target, e) }, () => {
										this.props.updateArrays(this.state.source, this.state.target);
									})}
							>
								{this.state.target.map((p) => {
									return (
										<Draggable key={p.props.user.id}>
											<div className="draggable-item">{p}</div>
										</Draggable>
									);
								})}
							</Container>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

PersonSwitcher.propTypes = {
	target: PropTypes.array.isRequired,
    source: PropTypes.array.isRequired,
    updateArrays: PropTypes.func.isRequired
};
