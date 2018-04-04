import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { GlobalStyles } from 'Theme/Theme';
import { getBlogsQuery } from '../../../../queries/blogs';

const BlogModal = (props) => {
    return (
        <Modal
            style={{ top: 0 }}
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
class OrganizationNewsController extends Component {
    state = {
        blog_modal_open: false, blog_media: null, blog_content: null, OrganizationNewsModalComponentRender: null, visible: false
    };
    componentWillMount = async () => {
        const theme = this.props.uiStore.current_organisation.themeId;
        const comp = await import(`../../../render_components/themes/${theme}_theme/${theme}_OrganizationNewsComponentRender`);
        const OrganizationNewsModalComponentRender = await import(`../../../render_components/themes/${theme}_theme/${theme}_OrganizationNewsModalComponentRender`);
        const OrganizationNewsComponentRender = comp.default;
        const subDomain = this.props.uiStore.current_subdomain;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { subDomain });
        this.blog_array = [];
        blog_data.resultData.edges.forEach((blog) => {
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;

            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            // const { createdAt } = blog.node;
            this.blog_array.push(<OrganizationNewsComponentRender blog={blog} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.handleNewsClick} />);
        });
        this.setState({ OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default, visible: true });
    }
    handleNewsClick = (blog) => {
        const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blog.node.blogContent)} />;
        this.setState({ blog_modal_open: true, blog_media: blog.node.blogMedia, blog_content: bcontent });
    }
    createMarkup = (content) => {
        return { __html: content };
    }
    closeModal = () => {
        this.setState({ blog_modal_open: false });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const { OrganizationNewsModalComponentRender } = this.state;
        return (
            <div>
                {this.blog_array}
                <BlogModal
                    modal_open={this.state.blog_modal_open}
                    content={<OrganizationNewsModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_media={this.state.blog_media} blog_content={this.state.blog_content} />}
                />
            </div>
        );
    }
}

BlogModal.propTypes = {
    modal_open: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
};
OrganizationNewsController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNewsController));
