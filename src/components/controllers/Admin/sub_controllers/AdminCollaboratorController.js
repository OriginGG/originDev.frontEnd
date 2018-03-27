import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import OrganizationAdminCollaboratorComponentRender from '../../../render_components/OrganizationAdminCollaboratorComponentRender';

class AdminCollaboratorController extends Component {
    // state = { modal_open: false}
    cancelModal = () => {
        // this.setState({ modal_open: false });
        this.file_uploaded = false;
    }
    saveModal = async () => {
    }
    render() {
        const md = <OrganizationAdminCollaboratorComponentRender
        />;
        // if (this.state.modal_open) {
        //     md = <div>
        //         <OrganizationAdminThemeModalComponentRender
        //             handleImageClick={this.handleImageClick}
        //             cancelModal={this.cancelModal}
        //             saveModal={this.saveModal}
        //             uploadFile={this.uploadFile}
        //             preview_image={this.state.preview_image_src}
        //             default_image1="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg1.jpg"
        //             default_image2="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg2.jpg"
        //             default_image3="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg"
        //         />
        //     </div>;
        // }
        return (
            <div
                style={{ height: '100vh', width: 'calc(100vw - 420px)' }}
                ref={(c) => {
                    this.modal_ref = c;
                }}>
                {md}
            </div>
        );
    }
}

// AdminCollaboratorController.propTypes = {
//     uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminCollaboratorController));

