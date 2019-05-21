/* eslint-disable */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { GlobalStyles } from 'Theme/Theme';

class DarkOrganizationFooterNewsComponentRender extends Component {
	render() {
		return (
			<div>
				<div className={this.props.classes.felzec_light_footer_news_row}>
					<div
						className={this.props.classes.felzec_light_news_footercontainer}
						onClick={() => {
							this.props.handleNewsClick(this.props.blog);
						}}
					>
						<div className="ui stackable two column grid">
							<div className="eight wide column">
								<img
									className={this.props.classes.felzec_main_footer_news_item_micro_image}
									src={this.props.blog_media}
								/>
							</div>
							<div className="eight wide column">
								<div
									style={{
										width: '100%',
										float: 'left',
										paddingRight: '0px',
										paddingTop: '25px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis'
									}}
								>
									<span className={this.props.classes.felzec_light_footer_news_title}>
										{this.props.blog_title}
									</span>
								</div>
								<div
									style={{
										width: '100%',
										overflowY: 'hidden',
										textOverflow: 'ellipsis'
									}}
								>
									<span className={this.props.classes.felzec_light_footer_news_body}>
										{this.props.blog_content}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

DarkOrganizationFooterNewsComponentRender.propTypes = {
	classes: PropTypes.object.isRequired
};

export default injectSheet(GlobalStyles)(DarkOrganizationFooterNewsComponentRender);
