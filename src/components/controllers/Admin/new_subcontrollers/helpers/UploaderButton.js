import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rsuite';

const UploaderButton = ({ onClick, ButtonText }) => {
	return <Button size="sm" appearance="primary" onClick={onClick}>{ButtonText}</Button>;
};

UploaderButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	ButtonText: PropTypes.string
};

UploaderButton.defaultProps = {
	ButtonText: 'UPLOAD'
};

export default UploaderButton;
