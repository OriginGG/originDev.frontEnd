import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';
// import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import dayjs from 'dayjs';
import OrganizationAdminBlogComponentRender from '../../../render_components/admin/OrganizationAdminBlogComponentRender';
import { getBlogsQuery } from '../../../../queries/blogs';
import AdminAddBlogController from './AdminAddBlogController';

class AdminBlogController extends Component {
    state = { visible: false, add_blog: false, edit_blog: false };
    componentDidMount = () => {
        this.fetchBlogData();
    }
    fetchBlogData = async () => {
        // const { subDomain } = this.props.uiStore.current_organisation;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { organisationId: this.props.uiStore.current_organisation.id });
        this.blog_array = [];
        blog_data.resultData.edges.forEach((blog, i) => {
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;
            const { createdAt } = blog.node;
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            // const { createdAt } = blog.node;
            this.blog_array.push(<tr key={`blog_table_k_${i}`} onClick={() => { this.editBlog(blog); }} style={{ cursor: 'pointer' }}>
                <td>{blogTitle}</td>
                <td style={{
                    height: 64, overflow: 'hidden', maxHeight: 64, display: 'block'
                }}>{bcontent}</td>
                <td><img style={{ height: 64 }} alt="" src={blogMedia} /></td>
                <td>{dayjs(createdAt).format('MMMM D, YYYY h:mm A')}</td>
            </tr>);
        });
        this.setState({ visible: true });
    }
    handleClick = () => {
        this.setState({ add_blog: true });
    }
    handleCancel = () => {
        this.setState({ add_blog: false, edit_blog: false });
        this.fetchBlogData();
    }
    editBlog = (blog) => {
        this.current_blog = blog;
        this.setState({ edit_blog: true });
    }
    createMarkup = (content) => {
        return { __html: content };
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        if (this.state.edit_blog === true) {
            const { blogContent } = this.current_blog.node;
            const { blogMedia } = this.current_blog.node;
            const { blogTitle } = this.current_blog.node;
            const { id } = this.current_blog.node;
            return <AdminAddBlogController handleCancel={this.handleCancel} blogId={id} blogContent={blogContent} blogMedia={blogMedia} blogTitle={blogTitle} />;
        }
        if (this.state.add_blog === true) {
            return <AdminAddBlogController handleCancel={this.handleCancel} />;
        }
        return (
            <div style={{
                width: 'calc(100vw - 416px)'
            }}>
                <OrganizationAdminBlogComponentRender
                    pagination_content={<span />}
                    blog_list={this.blog_array}
                    handleClick={this.handleClick}
                />
            </div>
        );
    }
}

AdminBlogController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
};

export default inject('uiStore', 'appManager')((AdminBlogController));
