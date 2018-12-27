import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
import { Input, Segment, Header, Button } from 'semantic-ui-react/dist/commonjs';
import { createUserQuery, updateUserQuery, getAllNonAdminUsersQuery } from '../../../../queries/users';
import OrganizationAdminCollaboratorComponentRender from '../../../render_components/admin/OrganizationAdminCollaboratorComponentRender';

class AdminCollaboratorController extends Component {
    state = {
        submitting: false, visible: false, modal_open: false, firstname_value: '', lastname_value: '', email_value: '', password_value: ''
    }

    componentDidMount = async () => {
        await this.updateTable();
        this.setState({ visible: true });
    }

    updateTable = async () => {
        return new Promise(async (resolve) => {
            const users = await this.props.appManager.executeQueryAuth('query', getAllNonAdminUsersQuery, { subDomain: this.props.uiStore.current_organisation.subDomain });
            this.table_data = [];
            users.allUsers.edges.forEach((u) => {
                this.table_data.push(<tr>
                    <td>{u.node.firstName}</td>
                    <td>{u.node.lastName}</td>
                    <td>{u.node.email}</td>
                    <td>{u.node.passwordHash}</td>
                </tr>);
            });
            resolve(true);
        });
    }
    cancelModal = () => {
        this.setState({ modal_open: false, submitting: false });
    }
    handleInputChange = (e, field) => {
        const v = e.target.value;
        const p = this.state;
        p[field] = v;
        this.setState(p);
    }
    addTeam = () => {
        this.setState({ modal_open: true });
    }
    saveModal = async () => {
    }

    handleSubmit = async () => {
        this.setState({ submitting: true });
        const payload = {
            firstName: this.state.firstname_value,
            lastName: this.state.firstname_value,
            password: this.state.password_value,
            email: this.state.email_value,
            adminUser: false
        };
        const my_id = await this.props.appManager.executeQueryAuth('mutation', createUserQuery, payload);
        // console.log(my_id);
        const actual_id = my_id.registerUser.user.id;
        await this.props.appManager.executeQueryAuth('mutation', updateUserQuery, { id: actual_id, organisation: this.props.uiStore.current_organisation.subDomain });
        await this.updateTable();
        this.setState({ modal_open: false, submitting: false });
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        let md = <OrganizationAdminCollaboratorComponentRender
            addTeam={this.addTeam}
            tableData={this.table_data}
        />;
        if (this.state.modal_open) {
            md = <Segment>
                <div style={{ marginBottom: 14 }}>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <Header as="h4">First Name</Header>
                            <Input onChange={(e) => { this.handleInputChange(e, 'firstname_value'); }} style={{ width: 280 }} value={this.state.firstname_value} placeholder="First name..." />
                        </div>
                        <div className="column">
                            <Header as="h4">Last Name</Header>
                            <Input onChange={(e) => { this.handleInputChange(e, 'lastname_value'); }} style={{ width: 280 }} value={this.state.lastname_value} placeholder="Last name..." />
                        </div>
                    </div>
                    <div className="ui stackable two column grid">
                        <div className="column">
                            <Header as="h4">Email</Header>
                            <Input onChange={(e) => { this.handleInputChange(e, 'email_value'); }} style={{ width: 280 }} value={this.state.email_value} placeholder="Email..." />
                        </div>
                        <div className="column">
                            <Header as="h4">Password</Header>
                            <Input onChange={(e) => { this.handleInputChange(e, 'password_value'); }} style={{ width: 280 }} type="password" value={this.state.password_value} placeholder="" />
                        </div>
                    </div>
                </div >
                <Button disabled={this.state.submitting} onClick={this.handleSubmit} primary>Submit</Button>
                <Button onClick={this.cancelModal} negative>Cancel</Button>

            </Segment >;
        }
        return (
            <div
                style={{ height: '100vh', width: 'calc(100vw - 420px)' }}
                ref={(c) => {
                    this.modal_ref = c;
                }}>
                {md}
            </div>
        );
    }
}

AdminCollaboratorController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminCollaboratorController));

