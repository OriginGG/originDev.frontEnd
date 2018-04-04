import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import { getBlogsQuery } from '../../../../queries/blogs';

class OrganizationNewsController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        const theme = this.props.uiStore.current_organisation.themeId;
        const comp = await import(`../../../render_components/themes/${theme}_theme/${theme}_OrganizationNewsComponentRender`);
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
            this.blog_array.push(<OrganizationNewsComponentRender blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} blog_button_text="READ MORE" />);
        });
        this.setState({ visible: true });
    }
    createMarkup = (content) => {
        return { __html: content };
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        return (
            <div>
                {this.blog_array}
            </div>
        );
    }
}

OrganizationNewsController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationNewsController));
