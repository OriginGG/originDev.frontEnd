import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { GlobalStyles } from 'Theme/Theme';
import { getBlogsQuery } from '../../../../queries/blogs';
import default_image from '../../../../assets/images/game_images/blog_default_image.jpg';

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
class OrganizationBlogController extends Component {
    state = {
        blog_modal_open: false, OrganizationBlogComponentRender: null, OrganizationNewsModalComponentRender: null, visible: false
    };
    componentDidMount = async () => {
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        let OrganizationBlogMobileComponentRender = null;
        if (theme === 'felzec/light') {
            OrganizationBlogMobileComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationBlogMobileComponentRender`);
        }
        const OrganizationBlogComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationBlogComponentRender`);
        const OrganizationNewsModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNewsModalComponentRender`);
        // const OrganizationNewsModuleComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationBlogModuleComponentRender`);
        const subDomain = this.props.uiStore.current_subdomain;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { subDomain });
        this.results_array = [];
        blog_data.resultData.edges.forEach((blog, i) => {
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;
            const { createdAt } = blog.node;
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            // console.log(`blogMain = ${blog}`);
            const formattedDate = moment(createdAt).format('lll');
            this.results_array.push({
                content: bcontent, media: blogMedia, title: blogTitle, date: formattedDate, blog, key: i
            });
        });
        if (blog_data.resultData.edges.length > 0) {
            if (theme === 'felzec/light') {
                this.setState({
                    OrganizationBlogComponentRender: OrganizationBlogComponentRender.default,
                    OrganizationBlogMobileComponentRender: OrganizationBlogMobileComponentRender.default,
                    OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default,
                    visible: true
                });
            } else {
                this.setState({
                    OrganizationBlogComponentRender: OrganizationBlogComponentRender.default,
                    OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default,
                    visible: true
                });
            }
        }
    }
    componentDidCatch = (error, info) => {
        console.log(error, info);
    }
    // handleNewsClick = (blog) => {
    //      // console.log(`blog = ${JSON.stringify(blog)}`);
    //      if (blog) {
    //         const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blog.node.blogContent)} />;
    //         this.setState({ blog_modal_open: true, blog_media: blog.node.blogMedia, blog_content: bcontent });
    //      }
    // }
    createMarkup = (content) => {
        return { __html: content };
    }
    closeModal = () => {
        this.setState({ blog_modal_open: false });
    }
    isMobile = () => {
        // return true;
        console.log(`isMobile = ${isMobile}`);
        return isMobile;
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        const temp_bg = this.props.uiStore.current_theme_structure.main_section.background.imageNewsData;
        const bg_style = { background: `url(${temp_bg})`, backgroundSize: 'cover', filter: 'grayscale(100%)' };
        const f_style = { backgroundColor: 'rgba(255,255,255,.8)' };
        let b_title_1 = 'Coming Soon';
        let b_media_1 = default_image;
        let b_content_1 = 'Latest news coming soon';
        let b_1 = null;
        let b_title_2 = 'Coming Soon';
        let b_media_2 = default_image;
        let b_content_2 = 'Latest news coming soon';
        let b_2 = null;
        let b_title_3 = 'Coming Soon';
        let b_media_3 = default_image;
        let b_content_3 = 'Latest news coming soon';
        let b_3 = null;
        let b_title_4 = 'Coming Soon';
        let b_media_4 = default_image;
        let b_content_4 = 'Latest news coming soon';
        let b_4 = null;
        let b_title_5 = 'Coming Soon';
        let b_media_5 = default_image;
        let b_content_5 = 'Latest news coming soon';
        let b_5 = null;

        // console.log(`blog array = ${JSON.stringify(this.results_array)}`);

        if (this.results_array[0]) {
            b_title_1 = this.results_array[0].title;
            b_media_1 = this.results_array[0].media;
            b_content_1 = this.results_array[0].content;
            b_1 = this.results_array[0].blog;
        }
        if (this.results_array[1]) {
            b_title_2 = this.results_array[1].title;
            b_media_2 = this.results_array[1].media;
            b_content_2 = this.results_array[1].content;
            b_2 = this.results_array[1].blog;
        }
        if (this.results_array[2]) {
            b_title_3 = this.results_array[2].title;
            b_media_3 = this.results_array[2].media;
            b_content_3 = this.results_array[2].content;
            b_3 = this.results_array[2].blog;
        }
        if (this.results_array[3]) {
            b_title_4 = this.results_array[3].title;
            b_media_4 = this.results_array[3].media;
            b_content_4 = this.results_array[3].content;
            b_4 = this.results_array[3].blog;
        }
        if (this.results_array[4]) {
            b_title_5 = this.results_array[4].title;
            b_media_5 = this.results_array[4].media;
            b_content_5 = this.results_array[4].content;
            b_5 = this.results_array[4].blog;
        }
        const { OrganizationNewsModalComponentRender } = this.state;
        const { OrganizationBlogComponentRender } = this.state;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (isMobile && theme === 'felzec/light') {
            const { OrganizationBlogMobileComponentRender } = this.state;
            console.log(`isMobile so retunr corrwct blog style    ${this.isMobile}`);
            return (
                <div>
                    <OrganizationBlogMobileComponentRender
                        bg_style={bg_style}
                        filter_style={f_style}
                        blog_media_1={b_media_1}
                        blog_content_1={b_content_1}
                        blog_title_1={b_title_1}
                        blog_1={b_1}
                        blog_media_2={b_media_2}
                        blog_content_2={b_content_2}
                        blog_title_2={b_title_2}
                        blog_2={b_2}
                        blog_media_3={b_media_3}
                        blog_content_3={b_content_3}
                        blog_title_3={b_title_3}
                        blog_3={b_3}
                        blog_media_4={b_media_4}
                        blog_content_4={b_content_4}
                        blog_title_4={b_title_4}
                        blog_4={b_4}
                        blog_media_5={b_media_5}
                        blog_content_5={b_content_5}
                        blog_title_5={b_title_5}
                        blog_5={b_5}
                        handleNewsClick={this.props.handleNewsClick}
                    />
                    <BlogModal
                        modal_open={this.state.blog_modal_open}
                        content={<OrganizationNewsModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_media={this.state.blog_media} blog_content={this.state.blog_content} />}
                    />
                </div>
            );
        }
        return (
            <div>
                <OrganizationBlogComponentRender
                    bg_style={bg_style}
                    filter_style={f_style}
                    blog_media_1={b_media_1}
                    blog_content_1={b_content_1}
                    blog_title_1={b_title_1}
                    blog_1={b_1}
                    blog_media_2={b_media_2}
                    blog_content_2={b_content_2}
                    blog_title_2={b_title_2}
                    blog_2={b_2}
                    blog_media_3={b_media_3}
                    blog_content_3={b_content_3}
                    blog_title_3={b_title_3}
                    blog_3={b_3}
                    blog_media_4={b_media_4}
                    blog_content_4={b_content_4}
                    blog_title_4={b_title_4}
                    blog_4={b_4}
                    blog_media_5={b_media_5}
                    blog_content_5={b_content_5}
                    blog_title_5={b_title_5}
                    blog_5={b_5}
                    handleNewsClick={this.props.handleNewsClick}
                />
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
OrganizationBlogController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    handleNewsClick: PropTypes.func.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationBlogController));
