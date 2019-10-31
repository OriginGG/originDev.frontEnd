import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import dayjs from 'dayjs';
import {
	// Button,
	// ButtonToolbar,
	// Panel,
	Table,
	// Cell,
	// Column,
	// HeaderCell,
	Popover,
	Dropdown,
	IconButton,
	Icon,
	Whisper,
	Panel,
	// Form,
	// FormGroup,
	// FormControl,
	// Modal,
	// Icon,
	// Uploader,
	// ControlLabel,
	// Notification,
	// HelpBlock,
	Grid,
	Col
} from 'rsuite';
// import find from 'lodash/find';
import open from './helpers/Notify';
import imagePlaceholder from '../../../../assets/images/blank_person.png';
import { getBlogsQuery, deleteBlogQuery } from '../../../../queries/blogs';
import AdminSingleBlogController from './AdminSingleBlog';
import ConfirmModalComponent from './helpers/ConfirmModal';

const { Cell, Column, HeaderCell } = Table;

// import OrganizationAdminProfileComponentRender from '../../../render_components/admin/OrganizationAdminProfileComponentRender';
// import {
// 	updateOrganisationQuery,
// 	getOrganisationQuery,
// 	getOrganisationQueryAnyCase
// } from '../../../../queries/organisation';
// import { updateThemeQuery } from '../../../../queries/themes';
// import UploaderButton from './helpers/UploaderButton';

// function open(funcName, description) {
// 	Notification[funcName]({
// 		title: funcName,
// 		description
// 	});
// }

const ImageCell = ({ rowData, dataKey, ...props }) => (
	<Cell {...props} style={{ padding: 0 }}>
		<div
			style={{
				width: 40,
				height: 40,
				// background: '#f5f5f5',
				// borderRadius: 20,
				// marginTop: 2,
				overflow: 'hidden',
				display: 'inline-block'
			}}
		>
			<img alt="" src={rowData[dataKey]} width="44" />
		</div>
	</Cell>
);

const Menu = ({ onSelect }) => (
	<Dropdown.Menu onSelect={onSelect}>
		<Dropdown.Item eventKey="edit">
			Edit
			<span style={{ marginLeft: 4 }}>
				<Icon icon="edit" />
			</span>
		</Dropdown.Item>
		<Dropdown.Item eventKey="delete">
			<div>
				<span style={{ color: 'red' }}>Delete</span>
				<span style={{ marginLeft: 4 }}>
					<Icon icon="trash" />
				</span>
			</div>
		</Dropdown.Item>
	</Dropdown.Menu>
);

const MenuPopover = ({ onSelect, ...rest }) => (
	<Popover {...rest} full>
		<Menu onSelect={onSelect} />
	</Popover>
);

let tableBody;

class CustomWhisper extends React.Component {
	render() {
		return (
			<Whisper
				placement="autoVerticalLeft"
				trigger="click"
				triggerRef={(ref) => {
					this.trigger = ref;
				}}
				container={() => {
					return tableBody;
				}}
				speaker={
					<MenuPopover
						onSelect={(e) => {
							this.props.handleSelect(e, this.props.row);
						}}
					/>
				}
			>
				{this.props.children}
			</Whisper>
		);
	}
}

const ActionCell = ({ rowData, handleSelect, dataKey, ...props }) => {
	return (
		<Cell {...props} className="link-group">
			<CustomWhisper handleSelect={handleSelect} row={rowData}>
				<IconButton style={{ marginTop: 0 }} appearance="subtle" icon={<Icon icon="more" />} />
			</CustomWhisper>
		</Cell>
	);
};

class AdminBlogController extends Component {
	state = {
		visible: false,
		data: [],
		addBlog: null
	};
	componentDidMount() {
		this.current_sub_domain = this.props.uiStore.current_organisation.subDomain;
		this.calcBlogs();
	}
	calcBlogs = async () => {
		const blog_data = await this.props.appManager.executeQuery('query', getBlogsQuery, {
			organisationId: this.props.uiStore.current_organisation.id
		});
		const d = [];
		blog_data.resultData.edges.forEach((blog) => {
			const p = blog.node.blogMedia ? blog.node.blogMedia : imagePlaceholder;
			d.push({
				title: blog.node.blogTitle,
				image: p,
				date: dayjs(blog.node.createdAt).format('MMMM D, YYYY h:mm A'),
				node: blog.node
			});
		});
		this.setState({ data: d, visible: true });
	};
	handleSelect = (e, row) => {
		if (e === 'edit') {
			this.setState({ addBlog: <AdminSingleBlogController handleBack={this.handleBack} blog={row.node} /> });
		}
		if (e === 'delete') {
			this.deleteBlog(row.node.id);
		}
	};
	deleteBlog = (id) => {
		this.delete_blog_id = id;
		this.setState({ delete_modal_open: true });
	};
	confirmDeleteBlog = async () => {
		this.setState({ delete_modal_open: false });
		await this.props.appManager.executeQueryAuth('mutation', deleteBlogQuery, {
			id: this.delete_blog_id
		});
		open('success', 'Blog deleted !');
		this.calcBlogs();
	};
	addMatch = () => {
		this.setState({ addBlog: <AdminSingleBlogController handleBack={this.handleBack} /> });
	};
	handleBack = () => {
		this.setState({ addBlog: null });
		this.calcBlogs();
	};
	render() {
		const { data } = this.state;
		if (this.state.visible === false) {
			return null;
		}
		if (this.state.addBlog) {
			return <div>{this.state.addBlog}</div>;
		}
		return (
			<div>
				<ConfirmModalComponent
					modal_open={this.state.delete_modal_open}
					modal_text="Are you sure you want to delete this blog?"
					modalConfirm={this.confirmDeleteBlog}
					modalCancel={() => {
						this.setState({ delete_modal_open: false });
					}}
				/>
				<Panel header={<h3>Blogs...</h3>} bordered>
					<Grid fluid>
						<Col lg={24} xs={24}>
							<Table
								data={data}
								id="table"
								bodyRef={(ref) => {
									tableBody = ref;
								}}
							>
								<Column width={160}>
									<HeaderCell>Title</HeaderCell>
									<Cell dataKey="title" />
									{/* <NameCell dataKey="firstName" /> */}
								</Column>
								<Column width={140} align="center">
									<HeaderCell>Image</HeaderCell>
									<ImageCell dataKey="image" />
								</Column>
								<Column width={240}>
									<HeaderCell>Date</HeaderCell>
									<Cell dataKey="date" />
									{/* <NameCell dataKey="firstName" /> */}
								</Column>
								<Column width={90}>
									<HeaderCell>Action</HeaderCell>
									<ActionCell handleSelect={this.handleSelect} dataKey="id" />
								</Column>
							</Table>
							<IconButton
								onClick={this.addMatch}
								appearance="primary"
								icon={<Icon icon="plus" />}
								circle
							/>
						</Col>
					</Grid>
				</Panel>
			</div>
		);
	}
}

CustomWhisper.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
	row: PropTypes.object.isRequired
};
ImageCell.propTypes = {
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};

ActionCell.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	rowData: PropTypes.array.isRequired,
	dataKey: PropTypes.string.isRequired
};
Menu.propTypes = {
	onSelect: PropTypes.func.isRequired
};
MenuPopover.propTypes = {
	onSelect: PropTypes.func.isRequired
};

AdminBlogController.propTypes = {
	uiStore: PropTypes.object.isRequired,
	appManager: PropTypes.object.isRequired
};

export default inject('uiStore', 'appManager')(AdminBlogController);
