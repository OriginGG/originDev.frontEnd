import { observable, action } from 'mobx';
import dayjs from 'dayjs';

class UiStore {
	@observable current_organisation = {};
	@observable current_subdomain = '';
	@observable current_theme_data = {};
	@observable current_theme_structure = {};
	@observable origin_theme_data = {};
	@observable origin_theme_structure = {};
	@observable user_id = 0;
	@observable individual_user_id = 0;
	@observable current_blog = {};
	@observable submitting_content = false;
	@observable subscribed = false;
	setOrganisation = (o) => {
		const theme = o.nodes[0];
		const { themeData } = theme.themesByOrganisationId.edges[0].node;
		const { themeStructure } = theme.themesByOrganisationId.edges[0].node;
		this.current_theme_data = JSON.parse(themeData);
		this.current_theme_structure = JSON.parse(themeStructure);
		this.current_organisation = o.nodes[0]; // eslint-disable-line
		this.current_theme_full_name = `${this.current_organisation.themeBaseId}/${this.current_organisation.themeId}`;
	};
	@action
	getSubScriptionDaysLeft = () => {
		const cur = dayjs(this.current_organisation.createdAt); // .toLocaleString('en-US', { timeZone: 'America/New_York' }));
		const day_diff = dayjs(new Date()).diff(cur, 'days');
		return 14 - day_diff;
	};
	@action
	setSubmittingContent = (f) => {
		this.submitting_content = f;
	};
	@action
	setUserID = (id) => {
		this.user_id = id;
	};
	@action
	setSubscribed = (subscribed) => {
		this.subscribed = subscribed;
	};
	@action
	setUserEmail = (email) => {
		this.user_email = email;
	};
	@action
	setIndividualUserID = (id) => {
		this.individual_user_id = id;
	};
	@action
	setSubDomain = (o) => {
		this.current_subdomain = o;
	};
	@action
	setOriginTheme = (o) => {
		const { themeData } = o;
		const { themeStructure } = o;
		this.origin_theme_data = JSON.parse(themeData);
		this.origin_theme_structure = JSON.parse(themeStructure);
	};
	@action
	setBlogStory = (o) => {
		this.current_blog = o;
	};
}

export default new UiStore();
