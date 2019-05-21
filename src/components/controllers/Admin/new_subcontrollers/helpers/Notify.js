import {
	Notification,
} from 'rsuite';

function open(funcName, description) {
	Notification[funcName]({
		title: funcName,
		description
	});
}

export default open;
