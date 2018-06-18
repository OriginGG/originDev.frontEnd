
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Input } from 'antd';
import _ from 'lodash';
import { PickList } from 'primereact/components/picklist/PickList';
import blankProfileImage from '../../../../assets/images/blank_person.png';


class AdminPickListController extends Component {
    state = { visible: false };
    // state = { visible: false, input_value: '' };
    componentDidMount() {
        const s = this.sortAlpha(this.props.source);
        const t = this.sortAlpha(this.props.target);
        this.setState({ visible: true, source: s, target: t });
    }
    componentWillReceiveProps = (nextProps) => {
        const s = this.sortAlpha(nextProps.source);
        const t = this.sortAlpha(nextProps.target);
        this.setState({ source: s, target: t });
    }
    sortAlpha = t => {
        return _.orderBy(
            t,
            [
                user => {
                    return user.node.username;
                }
            ],
            ['asc']
        );
    }
    userTemplate = (user) => {
        let im = blankProfileImage;
        if (user.node.profileImageUrl) {
            im = user.node.profileImageUrl;
        }
        return (
            <div className="ui-helper-clearfix">
                <img src={im} alt="" style={{ display: 'inline-block', margin: '2px 0 2px 2px', width: 48 }} />
                <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{user.node.username}</div>
            </div>
        );
    }
    updateFilter = input_value => {
        if (input_value.length >= 3) {
            const p = _.filter(this.props.source, (o) => {
                if (o.node.username) {
                    return o.node.username.toLowerCase().indexOf(input_value.toLowerCase()) > -1;
                }
            });
            this.setState({ source: p });
        } else {
            this.setState({ source: this.props.source });
        }
    }

    // handleFilter = e => {
    //     const input_value = e.target.value;
    //     this.setState({ input_value });
    //     this.updateFilter(input_value);
    // }
    onChange = (event) => {
        // const ns = [];
        // let nt = [];
        // const { source } = this.props;
        // const { target } = this.props;
        // let df = false;
        // debugger;
        // source.forEach((o, i) => {
        //     const el = _.findIndex(event.target, t => t.node.id === o.node.id);
        //     if (el === -1) {
        //         ns.push(source[i]);
        //     } else {
        //         df = true;
        //     }
        // });
        // if (df) {
        //     nt = event.target;
        // } else {
        //     debugger;
        //     target.forEach((o, i) => {
        //         const el = _.findIndex(event.target, t => t.node.id === o.node.id);
        //         if (el === -1) {
        //             nt.push(target[i]);
        //         } else {
        //             ns.push(target[i]);
        //         }
        //     });
        // }
        // this.setState({
        //     source: ns,
        //     target: nt,
        //     input_value: ''
        // });
        this.props.onChange(event.source, event.target);
        // this.updateFilter('');
    }
    render() {
        if (this.state.visible === false) {
            return null;
        }
        return (
            <div style={{ width: '100%' }}>
                <PickList
                    source={this.state.source}
                    target={this.state.target}
                    itemTemplate={this.userTemplate}
                    sourceHeader="Available Users"
                    targetHeader="Added Users"
                    responsive={true}
                    sourceStyle={{ height: '300px' }}
                    targetStyle={{ height: '300px' }}
                    onChange={this.onChange} />
                {/* <div style={{ marginLeft: 58, marginTop: 8 }}>
                    <Input onChange={this.handleFilter} value={this.state.input_value} placeholder="Search" style={{ width: 200 }} />
                </div> */}
            </div>
        );
    }
}

AdminPickListController.propTypes = {
    onChange: PropTypes.func.isRequired,
    source: PropTypes.array.isRequired,
    target: PropTypes.array.isRequired
};


export default AdminPickListController;
