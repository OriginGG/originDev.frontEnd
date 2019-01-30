import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Card, Button, Input, Segment } from 'semantic-ui-react/dist/commonjs';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { createBlogPostQuery, updateBlogPostQuery, deleteBlogQuery } from '../../../../queries/blogs';

const { confirm } = Modal;

// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

class AdminAddBlogController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false, visible: false, blog_image: null, blog_title: '', text: ''
        }; // You can also pass a Quill Delta here
    }
    componentDidMount = () => {
        this.logo_files = null;
        const p = {
            blog_title: this.props.blogTitle,
            blog_image: this.props.blogMedia,
            text: this.props.blogContent,
            visible: true
        };
        this.create_blog = true;
        if (this.props.blogContent || this.props.blogMedia || this.props.blogTitle) {
            this.create_blog = false;
        }
        this.setState(p);
    }
    handleSubmit = async () => {
        this.setState({ submitting: true });
        const f_name = await this.uploadBlogMedia();
        const f_title = this.state.blog_title;
        const f_text = this.state.text;

        if (!f_name && !f_title && !f_text) {
            toast.error('Not all Blog fields filled out or an image has nott been uploaded', {
                position: toast.POSITION.TOP_LEFT
            });
            this.setState({ submitting: false });
            return;
        }
        if (this.create_blog) {
            if (this.state.blog_title && this.state.text) {
                await this.props.appManager.executeQueryAuth(
                    'mutation', createBlogPostQuery,
                    {
                        organisationId: this.props.uiStore.current_organisation.id,
                        blogTitle: this.state.blog_title,
                        blogContent: this.state.text,
                        blogMedia: f_name
                    }
                );
                toast.success('Blog post added !', {
                    position: toast.POSITION.TOP_LEFT
                });
                this.setState({ submitting: false });
                this.props.handleCancel();
            }
        } else {
            await this.props.appManager.executeQueryAuth(
                'mutation', updateBlogPostQuery,
                {
                    id: this.props.blogId,
                    blogTitle: this.state.blog_title,
                    blogContent: this.state.text,
                    blogMedia: f_name
                }
            );
            toast.success('Blog post updated !', {
                position: toast.POSITION.TOP_LEFT
            });
            this.setState({ submitting: false });
            this.props.handleCancel();
        }
    }
    handleCancel = () => {
        this.setState({ submitting: false });
        this.props.handleCancel();
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
                const theme = '';
                const subDomain = `_${this.props.uiStore.current_organisation.id}_`;
                const formData = new FormData();
                const fn = `_blog_${this.props.blogId}`;
                formData.append('images', this.logo_files);
                axios.post(`${process.env.REACT_APP_API_SERVER}/c_upload?sub_domain=${subDomain}&theme=${theme}&force_name=${fn}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((x) => {
                    debugger;
                    resolve(x.data.url);
                });
            } else {
                if (this.create_blog === false) {
                    resolve(this.state.blog_image);
                } else {
                    resolve(null);
                }
            }
        });
    }
    showDeleteConfirm = () => {
        return new Promise(resolve => {
            confirm({
                title: 'Delete this blog',
                content: 'Are you sure?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => {
                    resolve(true);
                },
                onCancel: () => {
                    resolve(false);
                }
            });
        });
    };
    handleDelete = async () => {
        const action = await this.showDeleteConfirm();
        if (action) {
            await this.props.appManager.executeQueryAuth(
                'mutation', deleteBlogQuery,
                {
                    id: this.props.blogId,
                }
            );
            toast.success('Blog post deleted !', {
                position: toast.POSITION.TOP_LEFT
            });
            this.props.handleCancel();
        }
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div>
                <Card style={{ width: 'calc(100vw - 420px)' }}>
                    <Card.Content>
                        <Card.Header>
                            Add New Blog Post
                    </Card.Header>
                        <Card.Description>
                            <Segment>
                                <Input value={this.state.blog_title} onChange={this.handleTitleChange} style={{ width: 'calc(100vw - 488px)' }} label="Title:" placeholder="Enter Blog Title" />
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
                                theme="snow"
                                modules={{
                                    clipboard: {
                                        matchVisual: false
                                    }
                                }}
                                value={this.state.text}
                                onChange={this.handleChange} />
                            <Button disabled={this.state.submitting} onClick={this.handleSubmit} style={{ marginTop: 12 }} primary>
                                SUBMIT
                        </Button> {!this.create_blog &&
                                <Button onClick={this.handleDelete} style={{ float: 'right', marginTop: 12 }} negative>
                                    DELETE BLOG
                        </Button>
                            }
                            <Button onClick={this.handleCancel} style={{ float: 'right', marginTop: 12 }} teal>
                                CANCEL
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

AdminAddBlogController.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    blogMedia: PropTypes.string,
    blogContent: PropTypes.string,
    blogTitle: PropTypes.string,
    blogId: PropTypes.number
};
AdminAddBlogController.defaultProps = {
    blogMedia: null,
    blogContent: '',
    blogTitle: '',
    blogId: -1
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminAddBlogController));

