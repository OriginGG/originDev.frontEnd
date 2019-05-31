import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	// ButtonToolbar,
	Modal,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	Icon
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
} from 'rsuite';

class ConfirmModalComponent extends Component {
	state = { modal_open: false };
	componentWillReceiveProps = (newProps) => {
		if (newProps.modal_open !== this.state.modal_open) {
			this.setState({ modal_open: newProps.modal_open });
		}
	};
	render() {
		return (
			<Modal backdrop="static" show={this.state.modal_open} onHide={this.closeModal} size="xs">
				<Modal.Body>
					<Icon
						icon="remind"
						style={{
							color: '#ffb300',
							fontSize: 24
						}}
					/>
                    {'  '}
                    {this.props.modal_text}
				</Modal.Body>
				<Modal.Footer>
					<Button
                        onClick={this.props.modalConfirm}
						appearance="primary"
					>
						Ok
					</Button>
					<Button onClick={this.props.modalCancel} appearance="subtle">
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

ConfirmModalComponent.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    modal_text: PropTypes.string.isRequired,
	modalConfirm: PropTypes.func.isRequired,
	modalCancel: PropTypes.func.isRequired,
};

export default ConfirmModalComponent;
