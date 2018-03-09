import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';
import OrganizationNewsComponentRender from '../../../render_components/OrganizationNewsComponentRender';
import { getBlogsQuery } from '../../../../queries/blogs';

class OrganizationNewsController extends Component {
    state = { visible: false };
    componentWillMount = async () => {
        const subDomain = this.props.uiStore.current_subdomain;
        const blog_data = await this.props.appManager.executeQueryAuth('query', getBlogsQuery, { subDomain });

        this.blog_array = [];
        blog_data.resultData.edges.forEach((blog) => {
            this.blog_array.push(<OrganizationNewsComponentRender blog={blog} />);
        });
        console.log(blog_data);
        this.setState({ visible: true });
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
