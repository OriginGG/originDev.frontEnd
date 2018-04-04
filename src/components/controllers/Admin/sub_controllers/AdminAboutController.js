import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Card, Input, Segment, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { toast, ToastContainer } from 'react-toastify';

import OrganizationAdminAboutComponentRender from '../../../render_components/admin/OrganizationAdminAboutComponentRender';
import { getPagesQuery, updatePageQuery } from '../../../../queries/pages';
// import OrganizationAdminBlogComponentRender from '../../../render_components/OrganizationAdminBlogComponentRender';

class AdminAboutController extends Component {
    state = {
        page_content: '', about_title: '', about_sub_title: '', visible: false, edit_page: false, row_array: []
    };
    componentWillMount = () => {
        this.calcRows();
    }
    calcRows = async () => {
        const pages = await this.props.appManager.executeQuery('query', getPagesQuery, {
            organisation: this.props.uiStore.current_organisation.subDomain
        });
        const p_array = [];
        const { edges } = pages.allPages;
        edges.forEach((p) => {
            p_array.push(<tr>
                <td>{p.node.pageTitle}</td>
                <td>{p.node.pageSubtitle}</td>
                <td>{p.node.pageKey}</td>
                <td>{p.node.pageContent}</td>
                <td>{p.node.createdAt}</td>
                <td onClick={() => { this.editClick(p.node.id, p.node.pageContent, p.node.pageTitle, p.node.pageSubtitle); }} className={this.props.classes.admin_table_edit}>Edit</td>
            </tr>);
        });
        this.setState({ row_array: p_array, visible: true, edit_page: false  });
    }
    editClick = (id, pc, pt, pst) => {
        this.current_id = id;
        this.setState({
            about_title: pt, about_sub_title: pst, page_content: pc, edit_page: true
        });
    }
    handleInputChange = (e, field) => {
        const p = this.state;
        p[field] = e.target.value;
        this.setState(p);
    }
    handleQuillChange = (value) => {
        this.setState({ page_content: value });
    }
    handleSubmit = async () => {
        await this.props.appManager.executeQuery('mutation', updatePageQuery, {
            id: this.current_id,
            pageContent: this.state.page_content,
            organisation: this.props.uiStore.current_organisation.subDomain,
            pageTitle: this.state.about_title,
            pageSubtitle: this.state.about_sub_title
        });
        toast.success('Blog post added !', {
            position: toast.POSITION.TOP_LEFT
        });
        this.calcRows();
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        if (this.state.edit_page === false) {
            return (
                <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                    <OrganizationAdminAboutComponentRender rows={this.state.row_array} />
                </div>
            );
        }
        return (
            <div style={{ height: '100vh', width: 'calc(100vw - 420px)' }}>
                <Card style={{ width: 'calc(100vw - 380px)' }}>
                    <Card.Content>
                        <Card.Header>
                            Edit Page
                    </Card.Header>
                        <Card.Description>
                            <Segment>
                                <Input value={this.state.about_title} onChange={(e) => { this.handleInputChange(e, 'about_title'); }} style={{ width: 'calc(100vw - 438px)' }} label="Title:" placeholder="Title" />
                                <Input value={this.state.about_sub_title} onChange={(e) => { this.handleInputChange(e, 'about_sub_title'); }} style={{ marginTop: 8, width: 'calc(100vw - 438px)' }} label="Sub Title:" placeholder="Sub Title" />
                            </Segment>
                            <Segment>
                                <ReactQuill
                                    value={this.state.page_content}
                                    onChange={this.handleQuillChange} />
                            </Segment>
                            <Button primary onClick={this.handleSubmit}>SUBMIT</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <ToastContainer autoClose={2500} />
            </div>

        );
    }
}

AdminAboutController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminAboutController));

