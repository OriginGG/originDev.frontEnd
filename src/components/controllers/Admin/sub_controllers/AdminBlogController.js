import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Card, Button, Input, Segment } from 'semantic-ui-react';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { createBlogPostQuery } from '../../../../queries/blogs';

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

class AdminBlogController extends Component {
    constructor(props) {
        super(props);
        this.state = { blog_image: null, blog_title: '', text: '' }; // You can also pass a Quill Delta here
    }
    handleSubmit = async () => {
        const f_name = await this.uploadBlogMedia();
        await this.props.appManager.executeQuery(
            'mutation', createBlogPostQuery,
            {
                organisation: this.props.uiStore.current_organisation.subDomain,
                blogTitle: this.state.blog_title,
                blogContent: this.state.text,
                blogMedia: f_name
            },
            true
        );
        toast.success('Blog post added !', {
            position: toast.POSITION.TOP_LEFT
        });
        this.setState({ blog_title: '', text: '', blog_image: null });
    }
    handleChange = (value) => {
        this.setState({ text: value });
    }
    handleTitleChange = (e) => {
        this.setState({ blog_title: e.target.value });
    }

    uploadFile = (e) => {
        this.logo_files = e[0];             // eslint-disable-line
        const reader = new FileReader();
        reader.readAsDataURL(this.logo_files);

        reader.onloadend = () => {
            const x = reader.result;
            this.setState({ blog_image: x });
        };
    }
    uploadBlogMedia = () => {
        return new Promise((resolve) => {
            if (this.logo_files) {
                const formData = new FormData();
                formData.append('images', this.logo_files);
                axios.post(`${process.env.REACT_APP_IMAGE_SERVER}/upload/${this.props.uiStore.current_organisation.subDomain}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((x) => {
                    resolve(x.data.Location);
                });
            } else {
                resolve(null);
            }
        });
    }

    render() {
        return (
            <div>
                <Card style={{ width: 'calc(100vw - 380px)' }}>
                    <Card.Content>
                        <Card.Header>
                            Add New Blog Post
                    </Card.Header>
                        <Card.Description>
                            <Segment>
                                <Input value={this.state.blog_title} onChange={this.handleTitleChange} style={{ width: 'calc(100vw - 438px)' }} label="Title:" placeholder="Enter Blog Title" />
                            </Segment>
                            <div>
                                <Dropzone onDrop={this.uploadFile} style={{ width: 0, height: 0 }} ref={(node) => { this.dropzoneRef = node; }} />
                            </div>
                            <div className={this.props.classes.subdomain_logo_upload_container}>
                                <img alt="" className={this.props.classes.subdomain_logo_upload} src={this.state.blog_image} />
                            </div>
                            <Button onClick={() => { this.dropzoneRef.open(); }} style={{ marginBottom: 12 }} primary>ATTACH MEDIA

                        </Button>

                            <ReactQuill
                                value={this.state.text}
                                onChange={this.handleChange} />
                            <Button onClick={this.handleSubmit} style={{ marginTop: 12 }} primary>
                                SUBMIT
                        </Button>

                        </Card.Description >
                    </Card.Content >
                </Card>
            </div>
        );
    }
    // render() {
    //     return (
    //         <OrganizationAdminBlogComponentRender />);
    // }
}

AdminBlogController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminBlogController));

