import React from 'react';
import $ from 'jquery';
import Immutable from 'immutable';

import Header from '../components/header';
import Navigate from '../components/navigate';
import ListFilter from '../components/listFilter';
import Table from '../components/table';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';

// import TableStore from '../stores/tableStore';
// import TableActions from '../actions/tableActions';


class List extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {   
            showModal: false 
        };
        this.option = {
            page: 1
        };
        this._bind.apply(this, ['onRowClick', 'onRowSelect', 'onSelectAll', 'getTableData','onPageChange','onChangeModal']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    onRowClick (row) {
        window.open(`#/detail/${row.id}`);
    }

    onRowSelect (row, isSelected) {
        // console.log(row);
        // console.log("selected: " + isSelected)
    }

    onSelectAll (isSelected) {
        // console.log("is select all: " + isSelected);
    }

    getTableData (option) {
        var _this = this;
        // var url = (option.page == 1 ? '/test/testData.json' : '/test/testData2.json');
        var url = 'https://cnodejs.org/api/v1/topics?limit=10';
        this.option = option;   // listFilter 查询时，缓存查询条件，翻页时用

        $.getJSON(url, option, function(json, textStatus) {
            _this.setState({
                list: json.data,
                total: 10000
            })
        });
    }

    onPageChange (page, sizePerPage) {
        var opt = Object.assign(this.option, {page});
        this.getTableData(opt);
    }

    onChangeModal () {

        this.setState({
            showModal: !this.state.showModal
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        
    }

    render() {
        var opFun = {
            doDelete: this.doDelete,
            doFirstCheck: this.doFirstCheck,
            doRecheck: this.doRecheck
        };
        var tableConfig =  {
            "column": [
                {"field": "id", "isKey": true, "name": "id"},
                {"field": "loginname", "isKey": false, "name": "发表人"},
                {"field": "title", "isKey": false, "name": "标题"},
                {"field": "create_at", "isKey": false, "name": "时间"}
            ],
            "checkboxMode": false
        };
        // globalConfig.tableConfig.infoTable;
        var tableFun = {
            onRowClick: this.onRowClick,
            onRowSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll,
            onPageChange: this.onPageChange
        };
        var tableData = {
            list: this.state.list,
            page: this.option.page || 1,
            total: this.state.total
        };

        return (
            <div className="info-manage-page page-wrap" ref="list">
                <Header colName='list' onChangeModal={this.onChangeModal} /> 
                <div className='info-manage-body page-body'> 
                    <div className='body-left'>
                        <Navigate colName='list'/>
                    </div>
                    <div className='body-right'>
                        <ListFilter colName='list' getTableData={this.getTableData} />
                        <Table tableConfig={tableConfig} tableFun={tableFun} tableData={tableData} />
                        <Footer />
                    </div>
                </div>
                <MaskModal showModal={this.state.showModal} onChangeModal={this.onChangeModal}/>
            </div>
        ); 
    }
};

export default List;
