import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import { GlobalStyles } from 'Theme/Theme';
import { Modal } from 'antd';

import PropTypes from 'prop-types';
import { getIndividualUserQuery } from '../../../queries/individuals';
import IndividualPageComponentRender from '../../render_components/individual/IndividualPageComponentRender';
import IndividualSocialStatsComponentRender from '../../render_components/individual/IndividualSocialStatsComponentRender';
import IndividualBasicInfoComponentRender from '../../render_components/individual/IndividualBasicInfoComponentRender';
import IndividualVideosComponentRender from '../../render_components/individual/IndividualVideosComponentRender';
import IndividualEditComponentRender from '../../render_components/individual/IndividualEditModalComponentRender';
// import { isMobile } from 'react-device-detect';
// import historyStore from '../../../utils/stores/browserHistory';


const EditModal = (props) => {
    return (
        <Modal
            style={{ top: 32 }}
            width="max-content"
            closable={false}
            footer={null}
            visible={props.modal_open}
            animationDuration={1000}
        >
            <div style={{ display: 'block' }}>
                {props.content}
            </div>
        </Modal >);
};
class IndividualPageController extends Component {
    state = { visible: false, modal_open: false };
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
        this.setState({ modal_open: true });
    }
    closeModal = () => {
        this.setState({ modal_open: false });
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
            <div>
                <IndividualPageComponentRender
                    handleEditClick={this.handleEditClick}
                    button_style={s}
                    ColumnOne={<IndividualBasicInfoComponentRender />}
                    ColumnTwo={<IndividualSocialStatsComponentRender />}
                    ColumnThree={<IndividualVideosComponentRender />}
                />
                <EditModal
                    modal_open={this.state.modal_open}
                    content={<IndividualEditComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} />}
                />
            </div>
        );
    }
}
IndividualPageController.propTypes = {
    // uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

EditModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(IndividualPageController));
