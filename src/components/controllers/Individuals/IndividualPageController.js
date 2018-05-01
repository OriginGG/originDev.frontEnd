import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import PropTypes from 'prop-types';
import { getIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
import IndividualVideosComponentRender from '../../render_components/individual/IndividualVideosComponentRender';
// import { isMobile } from 'react-device-detect';
// import historyStore from '../../../utils/stores/browserHistory';


class IndividualPageController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        this.is_admin = false;
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
    handleEditClick = () => {
        debugger;
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        let s = { display: 'inherit' };
        if (this.is_admin === false) {
            s = { display: 'none' };
        }
        return (
            <IndividualPageComponentRender
                handleEditClick={this.handleEditClick}
                button_style={s}
                ColumnOne={<IndividualBasicInfoComponentRender />}
                ColumnTwo={<IndividualSocialStatsComponentRender />}
                ColumnThree={<IndividualVideosComponentRender />}
            />
        );
    }
}
IndividualPageController.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
