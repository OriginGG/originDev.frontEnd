import React from 'react';
import PropTypes from 'prop-types';
import {
	Grid,
	Col
} from 'rsuite';
import imagePlaceholder from '../../../../../assets/images/blank_person.png';


const TeamUserComponent = ({ user }) => {
	const profileImageUrl = user.profileImageUrl ? user.profileImageUrl : imagePlaceholder;
	return (
		<div>
			<div style={{ cursor: 'pointer', marginTop: 4, marginBottom: 4, border: '1px solid #e5e5ea', borderRadius: '6px' }}>
				<Grid style={{ paddingLeft: 0, paddingRight: 0 }} fluid>
					<Col style={{ backgroundColor: 'aquamarine', paddingLeft: 0, paddingRight: 0 }} lg={6} xs={24}>
						<img
							alt=""
							style={{
								borderRight: '1px solid #e5e5ea',
								width: '48px',
								height: '48px',
								objectFit: 'cover'
							}}
							src={profileImageUrl}
						/>
					</Col>
					<Col style={{ paddingRight: 0, paddingLeft: 0 }} lg={18} xs={24}>
						<div
							style={{
								paddingRight: 0,
								paddingLeft: 0,
								backgroundColor: 'aquamarine',
								display: 'flex',
								alignItems: 'center',
								height: 48
							}}
						>
							<h3>{user.username}</h3>
						</div>
					</Col>
				</Grid>
			</div>
		</div>
	);
};

TeamUserComponent.propTypes = {
	user: PropTypes.object.isRequired
};

export default TeamUserComponent;

