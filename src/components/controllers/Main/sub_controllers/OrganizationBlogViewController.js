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
        const OrganizationNewsModalComponentRender = await import(`../../../render_components/themes/${theme}/OrganizationNewsModalComponentRender`);
        this.setState({ visible: true, OrganizationNewsModalComponentRender: OrganizationNewsModalComponentRender.default });
    }

    createMarkup = (content) => {
        return { __html: content };
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        let close_button = 'white';
        if (theme === 'obliviot/light' || theme === 'enigma/light') {
            close_button = 'black';
        }
        const { OrganizationNewsModalComponentRender } = this.state;

        const p_array = <OrganizationNewsModalComponentRender extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_media={this.props.blog_media} blog_content={this.props.blog_content} />;

        return (<div>
            <div
                onClick={this.props.closeBlogView}
                tabIndex={-2}
                role="menuItem"
                style={{
                    cursor: 'pointer',
                    fontSize: 28,
                    position: 'absolute',
                    right: 32,
                    top: 94,
                    zIndex: 10000,
                    color: close_button,
                }}><span className="fa fa-window-close" /></div>
            {p_array}</div>);
    }
}
OrganizationBlogViewController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    blog_media: PropTypes.object.isRequired,
    blog_content: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired,
    // roster_id: PropTypes.number.isRequired,
    closeBlogView: PropTypes.func.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationBlogViewController));
