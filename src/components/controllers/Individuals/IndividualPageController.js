import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import PropTypes from 'prop-types';
import { getIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
// import { isMobile } from 'react-device-detect';
// import historyStore from '../../../utils/stores/browserHistory';


class IndividualPageController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        const authPayload = this.props.appManager.GetQueryParams('p');
        if (authPayload) {
            const p = JSON.parse(Buffer.from(authPayload, 'hex').toString('utf8'));
            this.authPayload = p;
            const token = p.authenticateIndividual.individualAuthPayload.jwtToken;
            const d = this.props.appManager.decodeJWT(token);
            this.user_id = d.id;
            const user = await this.props.appManager.executeQuery('query', getIndividualUserQuery, { id: this.user_id });
            if (user.individualUserById !== null) {
                this.is_admin = true;
            }
            this.setState({ visible: true });
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <IndividualPageComponentRender
                ColumnOne={<IndividualBasicInfoComponentRender />}
                ColumnTwo={<IndividualSocialStatsComponentRender />}
                ColumnThree={<IndividualSocialStatsComponentRender />}
            />
        );
    }
}
IndividualPageController.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
