import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationPageComponentRender from '../../render_components/OrganizationPageComponentRender';
import OriginVideoController from './sub_controllers/OriginVideoController';
import OriginTwitterController from './sub_controllers/OriginTwitterController';
import OriginSponsorController from './sub_controllers/OriginSponsorController';
import OriginMatchesController from './sub_controllers/OriginMatchesController';

class OriginPageController extends Component {
    render() {
        return (<OrganizationPageComponentRender
            newsContent={<div>Some news</div>}
            twitterContent={<OriginTwitterController />}
            matchesContent={<OriginMatchesController />}
            videoContent={<OriginVideoController />}
            topSponsorContent={<OriginSponsorController />}
            bottomSponsorContent={<OriginSponsorController />}
        />);
    }
}
export default injectSheet(GlobalStyles)(OriginPageController);
