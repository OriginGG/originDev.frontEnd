import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { isMobile } from 'react-device-detect';
// import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
// import { getBlogsQuery } from '../../../../queries/blogs';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'

class OrganizationBlogViewController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        // const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        // console.log(`them = ${theme}`);

        const OrganizationNewsModalComponentRender = loadable(
            (props) =>
                import(/* webpackChunkName: "renderComponents" */ `../../../render_components/themes/${props.theme}/OrganizationNewsModalComponentRender`),
            {
                fallback: <div>Loading...</div>
            });
        this.setState({ visible: true, OrganizationNewsModalComponentRender });
    }

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

    render() {
        if (this.state.visible === false) {
            return null;
        }
        let theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        if (this.isMobile()) {
            theme = 'mobile/dark';
        }
        let close_button = 'white';
        if (theme === 'obliviot/light' || theme === 'enigma/light' || theme === 'felzec/light') {
            close_button = 'black';
        }
        const { OrganizationNewsModalComponentRender } = this.state;

        const p_array = <OrganizationNewsModalComponentRender theme={theme} extra_style={{ display: 'inherit' }} closeModal={this.closeModal} blog_media={this.props.blog_media} blog_content={this.props.blog_content} blog_title={this.props.blog_title} blog_date={this.props.blog_date} />;

        return (<div>
            {this.props.shareBlog && <div
                className="button_pulse_anim"
                onClick={this.props.shareBlog}
                tabIndex={-2}
                role="menuItem"
                style={{
                    color: 'lightskyblue',
                    cursor: 'pointer',
                    fontSize: 28,
                    position: 'absolute',
                    right: 72,
                    top: 94,
                    zIndex: 10000,
                }}><span className="fa fa-share-alt" /></div>
            }
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
    blog_title: PropTypes.object.isRequired,
    blog_date: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired,
    // roster_id: PropTypes.number.isRequired,
    closeBlogView: PropTypes.func.isRequired,
    shareBlog: PropTypes.func
};

OrganizationBlogViewController.defaultProps = {
    shareBlog: null
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(OrganizationBlogViewController);
