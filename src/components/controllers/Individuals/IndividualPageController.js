import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
// import { isMobile } from 'react-device-detect';
// import PropTypes from 'prop-types';
// import historyStore from '../../../utils/stores/browserHistory';


class IndividualPageController extends Component {
    render() {
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
    // appManager: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
