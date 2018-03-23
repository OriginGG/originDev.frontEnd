import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { Modal } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
// import { toast, ToastContainer } from 'react-toastify';
import OrganizationAdminThemeComponentRender from '../../../render_components/OrganizationAdminThemeComponentRender';
import OrganizationAdminThemeModalComponentRender from '../../../render_components/OrganizationAdminThemeModalComponentRender';

class AdminThemeController extends Component {
    state = { modal_open: false, preview_image_src: null, image_src: null }
    componentWillMount = () => {
        this.setState({ preview_image_src: null, image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData });
    }
    editImage = () => {
        this.setState({ modal_open: true, preview_image_src: this.props.uiStore.current_theme_structure.main_section.background.imageData });
    }
    handleImageClick = (u) => {
        this.setState({ preview_image_src: u });
    }
    uploadFile = (e) => {
        debugger;         // eslint-disable-line
        this.logo_files = e[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ preview_image_src: x });
        };
    }
    render() {
        let md = <div />;
        if (this.state.modal_open) {
            md = <Modal style={{ width: 'calc(100vw - 700px)' }} dimmer="inverted" size="mini" open={this.state.modal_open}>
                <Modal.Content >
                    <div style={{ height: '800px' }}>
                        <OrganizationAdminThemeModalComponentRender
                            handleImageClick={this.handleImageClick}
                            uploadFile={this.uploadFile}
                            preview_image={this.state.preview_image_src}
                            default_image1="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg1.jpg"
                            default_image2="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg2.jpg"
                            default_image3="https://s3.amazonaws.com/origin-images/origin/jumbotron/section1-bg3.jpg"
                        />
                    </div>
                </Modal.Content>
            </Modal>;
        }
        return (
            <div>
                {md}
                <OrganizationAdminThemeComponentRender
                    editImage={this.editImage}
                    image_src={this.state.image_src}
                />
                <ToastContainer autoClose={2500} />

            </div>
        );
    }
}

AdminThemeController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminThemeController));

