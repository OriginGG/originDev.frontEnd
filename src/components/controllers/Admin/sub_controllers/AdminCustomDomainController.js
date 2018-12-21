import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import injectSheet from 'react-jss';
import { Button, Card, Image, Input } from 'semantic-ui-react';
import { GlobalStyles } from 'Theme/Theme';
import { inject } from 'mobx-react';
// import axios from 'axios';
import { toast } from 'react-toastify';


const CheckIsValidDomain = (domain) => {
    const re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);          // eslint-disable-line
    return domain.match(re);
};

class AdminCustomDomainController extends Component {
    state = { input_value: '', sent: false }

    handleInputChange = (e) => {
        this.setState({ input_value: e.target.value });
    }
    handleSubmit = async () => {
        if (!CheckIsValidDomain(this.state.input_value)) {
            toast.error('That doesn\'t appear to be a valid domain name, please check the name you supplied!', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
            });
        } else {
            const o = this.props.uiStore.current_organisation;
            const payload = {
                text: `*Organization:* ${o.name}\n*Domain Request name:* ${this.state.input_value}\n*Owner Email:* ${o.usersByOrganisation.edges[0].node.email}\n`,

            };
            axios.post(process.env.REACT_APP_SLACK_NEW_PRODUCT_WEBHOOK, JSON.stringify(payload), {
                withCredentials: false,
                transformRequest: [(data, headers) => {
                    delete headers.post['Content-Type'];                // eslint-disable-line
                    return data;
                }]
            });
            const full_url = `${process.env.REACT_APP_API_SERVER}/emails/request_custom_domain`;
            await axios.post(
                full_url,
                {
                    payload: o
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            this.setState({ sent: true });
        }
    }
    render() {
        if (!this.state.sent) {
            return (<Card>
                <Card.Content>
                    <Image floated="right" size="mini" src="https://res.cloudinary.com/origingg/image/upload/v1545319630/custom_domain.jpg" />
                    <Card.Header>Add Custom Domain</Card.Header>
                    <Card.Description>
                        As a subscribed member you can request a custom domain be linked to your Organizations page.
                        Simply enter the domain name you wish to use, and this will send a support request to our team.
                        Once we have received your request, our team will contact you via email to begin the process.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Input value={this.state.input_value} onChange={this.handleInputChange} style={{ width: '100%', marginTop: 8, marginBottom: 8 }} placeholder="Domain name..." />
                        <Button onClick={this.handleSubmit} basic color="green">
                            Send
          </Button>
                </Card.Content>
            </Card>
            );
        }
        const dm = `Your domain request '${this.state.input_value}' has been sent to our support team, we will be in touch shortly.
            Regards, Origin Team.`;
        return (
            <div style={{ width: 'calc(100vw - 410px)' }}>
                <h2>Add Custom Domain - Submitted</h2>
                <div className="ui raised segment" style={{ backgroundColor: '#e6e4ff' }}>
                    {dm}
                </div>
            </div>
        );
    }
}

AdminCustomDomainController.propTypes = {
    uiStore: PropTypes.object.isRequired,
    // appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(injectSheet(GlobalStyles)(AdminCustomDomainController));

