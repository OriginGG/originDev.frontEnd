import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { Modal } from 'antd';
import { isMobile } from 'react-device-detect';
import dayjs from 'dayjs';
// import { GlobalStyles } from 'Theme/Theme';
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

function BlankComponent() {
    return <div />;
}


class OrganizationNewsController extends Component {
    state = {
        blog_modal_open: false, blog_media: null, blog_content: null, OrganizationNewsModalComponentRender: null, visible: false
    };
    componentDidMount = async () => {
        // console.log('organizationnews controller called');
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let theme_type = this.props.uiStore.current_organisation.themeBaseId;
        if (this.isMobile()) {
            theme = 'mobile/dark';
            theme_type = 'mobile';
        }
        let  OrganizationNewsMobileComponentRender = BlankComponent;
        if (this.isMobile() && theme === 'felzec/light') {
            OrganizationNewsMobileComponentRender = loadable(
                () =>
                    import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationNewsMobileComponentRender`),
                {
                    fallback: <div>Loading...</div>
                });
        }
        const OrganizationNewsModalComponentRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationNewsModalComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        const OrganizationNewsModuleComponentRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationNewsModuleComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        const OrganizationNewsComponentRender = loadable(
            () =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${theme}/OrganizationNewsComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        // const subDomain = this.props.uiStore.current_subdomain;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { organisationId: this.props.uiStore.current_organisation.id });
        this.blog_array = [];
        this.results_array = [];
        if (blog_data.resultData.edges.length < 1) {
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup('Post your first News story')} />;
            if (theme_type !== 'obliviot' || theme_type !== 'mobile') {
                // console.log(`theme_type = ${theme_type} and isMobile = ${this.isMobile()}`);
                if (theme_type === 'felzec') {
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${1}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${2}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${3}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${4}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${5}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                } else {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${1}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${2}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${3}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${4}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${5}`} blog={null} blog_date="1-30-2018" blog_title="Yout Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                }
            }

            if (theme_type === 'obliviot' || theme_type === 'mobile') {
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${1}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${2}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${3}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${4}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${5}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={bcontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
            }
        }
        blog_data.resultData.edges.forEach((blog, i) => {
            console.log(`i ========= ${i} theme_type = ${theme_type}`);
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;
            const { createdAt } = blog.node;
            const formattedDate = dayjs(createdAt).format('MMMM D, YYYY h:mm A');
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            // const { createdAt } = blog.node;
            this.results_array.push({
                content: blogContent, media: blogMedia, title: blogTitle, date: formattedDate
            });
            if (theme_type !== 'obliviot' && theme_type !== 'mobile') {
                console.log(`theme_type = ${theme_type} and isMobile = ${this.isMobile()}`);
                if (theme_type === 'felzec' && this.isMobile()) {
                    this.blog_array.push(<OrganizationNewsMobileComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
                } else {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
                }
            }

            if (theme_type === 'obliviot' && i > 2) {
                console.log(`news item = ${blogTitle}`);
                if (i === 3) {
                    this.blog_array = [];
                }
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
            }
            if (theme_type === 'obliviot' && i < 3) {
                const ocontent = <div dangerouslySetInnerHTML={this.createMarkup('Post your first News story')} />;
                if (blog_data.resultData.edges.length === 1) {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                }
                if (blog_data.resultData.edges.length === 2) {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                }
                if (blog_data.resultData.edges.length === 3) {
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                    this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
                }
            }
            if (theme_type === 'mobile' && i > 2) {
                console.log(`news item = ${blogTitle}`);
                if (i === 3) {
                    this.blog_array = [];
                }
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.props.handleNewsClick} />);
            }
        });
        console.log(`langth of printable array = ${this.blog_array.length}`);
        if (theme_type === 'mobile' || theme_type === 'obliviot') {
            if (this.blog_array.length === 2) {
                const ocontent = <div dangerouslySetInnerHTML={this.createMarkup('Post your first News story')} />;
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
            }
            if (this.blog_array.length === 1) {
                const ocontent = <div dangerouslySetInnerHTML={this.createMarkup('Post your first News story')} />;
                this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${0}`} blog={null} blog_date="1-30-2018" blog_title="Your Post" blog_content={ocontent} blog_media={default_image} handleNewsClick={this.props.handleNewsClick} />);
            }
        }
        if (blog_data.resultData.edges.length > -1) {
            this.setState({
                OrganizationNewsModuleComponentRender,
                OrganizationNewsModalComponentRender,
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
        // console.log(`page isMObile ${isMobile} screen width = ${window.outerWidth}`);
        if (isMobile || window.outerWidth < 1050) {
            return true;
        }
        return false;
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

export default inject('uiStore', 'appManager')(OrganizationNewsController);
