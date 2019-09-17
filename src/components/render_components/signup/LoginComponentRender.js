import React, { Component } from 'react';
// import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
// import { GlobalStyles } from 'Theme/Theme';
import { Panel, Form, ControlLabel, HelpBlock, FormGroup, FormControl, ButtonGroup, Button } from 'rsuite';

class LoginComponentRender extends Component {
	state = { loginInfo: {} };

	handleInputChange = (loginInfo) => {
		this.setState({ loginInfo });
	};
	render() {
		// return (
		//     <div>
		//         <div id="login" className={this.props.classes.signupModal}>
		//             <div className={this.props.classes.tabular_menu}>
		//                 <div className={this.props.classes.tabular_menu_item_active}>Sign In</div>
		//             </div>
		//             <div className={this.props.classes.signupModalContent}>
		//                 <form className="ui large form" onSubmit={this.props.handleSubmit}>
		//                     <div className="ui stacked segment">
		//                         <div className={this.props.classes.form_body}>
		//                             <div className={this.props.classes.input_title}>
		//                                 Email Address
		//                             </div>
		//                             <div className="field">
		//                                 <div className="ui input">
		//                                     <input type="text" name="email" placeholder="E-mail address" style={{
		//                                         backgroundColor: 'transparent',
		//                                         borderColor: '#fff',
		//                                         color: '#fff',
		//                                         height: '45px',
		//                                         fontSize: '16px'
		//                                     }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.email}/>
		//                                     <div style={{
		//                                         position: 'absolute',
		//                                         right: 0,
		//                                         marginTop: 13,
		//                                         marginRight: 30
		//                                     }}>{this.props.touched.email && this.props.errors.email && <div style={{
		//                                             color: 'red'
		//                                         }}>{this.props.errors.email}</div>}</div>
		//                                 </div>
		//                             </div>
		//                             <div className={this.props.classes.input_title}>
		//                                 Password
		//                             </div>
		//                             <div className="field">
		//                                 <div className="ui input">
		//                                     <input type="password" name="password" placeholder="Password" style={{
		//                                         backgroundColor: 'transparent',
		//                                         borderColor: '#fff',
		//                                         color: '#fff',
		//                                         height: '45px',
		//                                         fontSize: '16px'
		//                                     }} className={this.props.classes.input_box} onBlur={this.props.handleBlur} onChange={this.props.handleChange} value={this.props.values.password}/>
		//                                     <div style={{
		//                                         position: 'absolute',
		//                                         right: 0,
		//                                         marginTop: 13,
		//                                         marginRight: 30
		//                                     }}>{this.props.touched.password && this.props.errors.password && <div style={{
		//                                             color: 'red'
		//                                         }}>{this.props.errors.password}</div>}</div>
		//                                 </div>
		//                             </div>
		//                             <div >{this.props.loginAccountButton}</div>
		//                             <div >{this.props.forgotPasswordButton}</div>
		//                             <div >{this.props.needAccountButton}</div>
		//                             <div className="ui error message"/>
		//                         </div>
		//                     </div>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// )
		const formValue = this.state.loginInfo;
		return (
			<div
				style={{
					position: 'absolute',
					left: '50%',
					marginLeft: '-188px',
					top: '50%',
					marginTop: '-219px'
				}}
				id="login"
			>
				<Panel
					style={{ height: 460, backgroundColor: 'rgba(14, 10, 10, 0.78)' }}
					header={<h2 style={{ textAlign: 'center', color: 'white' }}>LOGIN</h2>}
					bordered
				>
					<Form formValue={formValue} onChange={this.handleInputChange}>
						<FormGroup>
							<ControlLabel>Email</ControlLabel>
							<FormControl name="email" type="email" />
							<HelpBlock tooltip>Required</HelpBlock>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Password</ControlLabel>
							<FormControl name="password" type="password" />
							<HelpBlock tooltip>Required</HelpBlock>
						</FormGroup>
						<FormGroup>
							<ButtonGroup style={{ marginLeft: 74 }} vertical>
								<Button
                                    onClick={() => {
										this.props.onSubmit(formValue);
									}}
									appearance="primary"
								>
									LOGIN
								</Button>
								<Button appearance="default">FORGOT PASSWORD</Button>
							</ButtonGroup>
						</FormGroup>
					</Form>
				</Panel>
			</div>
		);
	}
}

LoginComponentRender.propTypes = {
	onSubmit: PropTypes.func.isRequired
};

export default LoginComponentRender;
