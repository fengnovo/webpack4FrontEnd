import React from 'react';
import { ButtonToolbar, Button, DropdownButton, MenuItem, Form, FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Immutable from 'immutable';


var globalConfig = {pageSize:10};

class ListFilter extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            ranges: {
                '今天': [moment(), moment()],
                '最近7天': [moment().subtract(6, 'days'), moment()],
                '最近30天': [moment().subtract(29, 'days'), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),


            showModal: false,
            btnFlag: [true,false,false,false,false]
        };

        this._bind.apply(this, ['handleEvent', 'handleClick', '_renderForm']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        this.props.getTableData({
            status: 0, //草稿中
            beginTime: moment().subtract(29, 'days').unix(),
            endTime: moment().unix(),   // unix返回的时间是s，不是ms
            page: 1,
            pageSize: globalConfig.pageSize || 20
        });
    }

    componentWillUnmount() {
        
    }

    handleEvent (event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    }

    handleClick (index) {
        console.log(index);
        if(index === undefined){
            return;
        }
        let temArr = [false,false,false,false,false],
            temStr = ['','good','share','ask','job'];
        temArr[index] = true;
        this.setState({
            btnFlag: temArr
        });

        this.props.getTableData({
            status: 0, //草稿中
            // beginTime: moment().subtract(29, 'days').unix(),
            // endTime: moment().unix(),   // unix返回的时间是s，不是ms
            page: 1,
            pageSize: globalConfig.pageSize || 20,
            tab:temStr[index]
        });
    }


    _renderForm () {
        var state = this.state;
        var start = state.startDate.format('YYYY-MM-DD');
        var end = state.endDate.format('YYYY-MM-DD');
        var dateRangeStr = start + ' - ' + end;

        if (start === end) {
            dateRangeStr = start;
        }

        var switchLabel = (this.props.pageName || this.props.colName), form;

        switch (switchLabel) {
            case 'list':
                form = (
                    <Form componentClass="fieldset" inline className="list-filter" ref="listFilter">
                        <Button bsStyle="default" 
                            className={this.state.btnFlag[0] ? "btn-select" : "" } 
                            onClick={this.handleClick.bind(this,0)}>全部</Button>
                        <Button bsStyle="default"
                            className={this.state.btnFlag[1] ? "btn-select" : "" }  
                            onClick={this.handleClick.bind(this,1)}>精华</Button>
                        <Button bsStyle="default" 
                            className={this.state.btnFlag[2] ? "btn-select" : "" } 
                            onClick={this.handleClick.bind(this,2)}>分享</Button>
                        <Button bsStyle="default"
                            className={this.state.btnFlag[3] ? "btn-select" : "" } 
                            onClick={this.handleClick.bind(this,3)}>问答</Button>
                        <Button bsStyle="default" 
                            className={this.state.btnFlag[4] ? "btn-select" : "" } 
                            onClick={this.handleClick.bind(this,4)}>招聘</Button>
                    </Form>
                );
                break;
            default:
                form = null;
                break;
        }

        return form;
    }

    render() {
        return <div>{this._renderForm()}</div>;
    }
};


export default ListFilter;