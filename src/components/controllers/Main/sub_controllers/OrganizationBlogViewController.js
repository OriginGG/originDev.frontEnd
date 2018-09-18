import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
// import { getBlogsQuery } from '../../../../queries/blogs';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'

class OrganizationBlogViewController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        console.log(`them = ${theme}`);
        const { current_blog } = this.props.uiStore.current_blog;
        const OrganizationNewsModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNewsModalComponentRender`);
        this.setState({ visible: true, OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default, c_blog: current_blog });
    }

    createMarkup = (content) => {
        return { __html: content };
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const { OrganizationNewsModalComponentRender } = this.state;

        return <OrganizationNewsModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_media={this.state.c_blog.node.blogMedia} blog_content={this.state.c_blog.node.blog_content} />;
    }
}
OrganizationBlogViewController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired,
    // roster_id: PropTypes.number.isRequired,
    // closeBlogs: PropTypes.func.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationBlogViewController));
