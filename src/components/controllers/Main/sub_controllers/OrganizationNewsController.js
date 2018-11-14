import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { GlobalStyles } from 'Theme/Theme';
import { getBlogsQuery } from '../../../../queries/blogs';

const BlogModal = (props) => {
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
class OrganizationNewsController extends Component {
    state = {
        blog_modal_open: false, blog_media: null, blog_content: null, OrganizationNewsModalComponentRender: null, visible: false
    };
    componentDidMount = async () => {
        console.log('organizationnews controller called');
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        const theme_type = this.props.uiStore.current_organisation.themeBaseId;
        const comp = await import(`../../../render_components/themes/${theme}/OrganizationNewsComponentRender`);
        let m_comp = null;
        let  OrganizationNewsMobileComponentRender = null;
        if (this.isMobile() && theme === 'felzec/light') {
            m_comp = await import(`../../../render_components/themes/${theme}/OrganizationNewsMobileComponentRender`);
            OrganizationNewsMobileComponentRender = m_comp.default;
        }
        const OrganizationNewsModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNewsModalComponentRender`);
        const OrganizationNewsModuleComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNewsModuleComponentRender`);
        const OrganizationNewsComponentRender = comp.default;
        const subDomain = this.props.uiStore.current_subdomain;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { subDomain });
        this.blog_array = [];
        this.results_array = [];
        blog_data.resultData.edges.forEach((blog, i) => {
            console.log(`i ========= ${i}`);
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;
            const { createdAt } = blog.node;
            const formattedDate = moment(createdAt).format('lll');
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            // const { createdAt } = blog.node;
            this.results_array.push({
                content: blogContent, media: blogMedia, title: blogTitle, date: formattedDate
            });
            if (theme_type !== 'obliviot') {
                console.log(`theme_type = ${theme_type} and isMobile = ${this.isMobile()}`);
                if (theme_type === 'felzec' && this.isMobile()) {
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
                } else {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
                }
            }

            if (theme_type === 'obliviot' && i > 2) {
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
            }
        });
        if (blog_data.resultData.edges.length > 0) {
            this.setState({
                OrganizationNewsModuleComponentRender: OrganizationNewsModuleComponentRender.default,
                OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default,
                visible: true
            });
        }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    // handleNewsClick = (blog) => {
    //     const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blog.node.blogContent)} />;
    //     this.setState({ blog_modal_open: true, blog_media: blog.node.blogMedia, blog_content: bcontent });
    // }
    createMarkup = (content) => {
        return { __html: content };
    }
    isMobile = () => {
        // return true;
        console.log(`page isMObile ${isMobile}`);
        return isMobile;
    }
    closeModal = () => {
        this.setState({ blog_modal_open: false });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const { OrganizationNewsModalComponentRender } = this.state;
        const { OrganizationNewsModuleComponentRender } = this.state;
        return (
            <div>
                <OrganizationNewsModuleComponentRender news_items={this.blog_array} />
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
    appManager: PropTypes.object.isRequired,
    handleNewsClick: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNewsController));
