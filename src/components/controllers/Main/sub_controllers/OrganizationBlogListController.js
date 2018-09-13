import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { GlobalStyles } from 'Theme/Theme';
// import { gameOptions } from '../../Admin/sub_controllers/data/AllGames';
import { getBlogsQuery } from '../../../../queries/blogs';
// import blankProfileImage from '../../../../assets/images/blank_person.png';

// import { getOrganisationQuery } from './queries/organisation'
class OrganizationBlogListController extends Component {
    state = { visible: false };
    componentDidMount = async () => {
        // const theme = this.props.uiStore.current_organisation.themeId;
        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;
        console.log(`them = ${theme}`);
        const subDomain = this.props.uiStore.current_subdomain;
        const comp = await import(`../../../render_components/themes/${theme}/OrganizationNewsComponentRender`);
        const OrganizationNewsComponentRender = comp.default;
        const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, { subDomain });
        this.blog_array = [];
        blog_data.resultData.edges.forEach((blog, i) => {
            console.log(`i ========= ${i}`);
            const { blogContent } = blog.node;
            const { blogMedia } = blog.node;
            const { blogTitle } = blog.node;
            const { createdAt } = blog.node;
            const formattedDate = moment(createdAt).format('lll');
            const bcontent = <div dangerouslySetInnerHTML={this.createMarkup(blogContent)} />;
            this.blog_array.push(<OrganizationNewsComponentRender key={`news_blog_item_k_${i}`} blog={blog} blog_date={formattedDate} blog_title={blogTitle} blog_content={bcontent} blog_media={blogMedia} handleNewsClick={this.handleNewsClick} />);
        });
        this.setState({ visible: true });
    }

    handleClick = (i) => {              // eslint-disable-line
        console.log(`i = ${i}`);
    }

    createMarkup = (content) => {
        return { __html: content };
    }

    render() {
        if (this.state.visible === false) {
            return null;
        }
        // const { OrganizationNewsComponentRender } = this.state;
        // const p_array = [];
        let no_items = '';
        if (this.blog_array.length < 1) {
             no_items = 'No Blogs Are Currently In This List';
        }

        const theme = `${this.props.uiStore.current_organisation.themeBaseId}/${this.props.uiStore.current_organisation.themeId}`;

        let close_button = 'white';

        if (theme === 'obliviot/light' || theme === 'enigma/light') {
            close_button = 'black';
        }

        // const blog_array = [];
        // this.state.blog_data.resultData.edges.forEach(n => {
        //     console.log(`CHECK CHECK CHECK ${JSON.stringify(n)}`);
        //     blog_array.push({
        //         content: n.node.blogContent, media: n.node.blogMedia, title: n.node.blogTitle, date: moment(n.node.createdAt).format('lll')
        //     });
        // });
        // console.log(`WHOOOOOOPS blog_array = ${JSON.stringify(blog_array)}`);
        // blog_array.forEach((r, i) => {
        //     console.log(`r = ${JSON.stringify(r)}`);
        //     p_array.push(<div role="menuItem" tabIndex={-1} key={`blog_gm_list_${i}`} style={{ cursor: 'pointer' }}><OrganizationNewsComponentRender
        //         blog={r}
        //         blog_date={r.date}
        //         blog_title={r.title}
        //         blog_content={r.content}
        //         blog_media={r.media}
        //     /></div>);
        // });
        return (<div>
            <div
                onClick={this.props.closeBlogs}
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
                <div
                    tabIndex={-1}
                    role="menuItem"
                    style={{
                        width: '100%',
                        fontSize: 32,
                        fontWeight: 900,
                        position: 'absolute',
                        top: 200,
                        left: '0%',
                        textAlign: 'center',
                        color: 'white',
                        zIndex: 10000,
                    }}>
                    {no_items}
                </div>
            {this.blog_array}</div>);
    }
}
OrganizationBlogListController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    // roster_id: PropTypes.number.isRequired,
    closeBlogs: PropTypes.func.isRequired
};
// LoginController.propTypes = {
//     // uiStore: PropTypes.object.isRequired,
//     appManager: PropTypes.object.isRequired
// };

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(OrganizationBlogListController));
