import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Immutable from 'immutable';
import moment from 'moment';


var globalConfig = {pageSize:10};
class Table extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            // tableData: props.tableData
        };
        this.selectRowProp =  {
            onSelect: props.tableFun.onRowSelect,
            onSelectAll: props.tableFun.onSelectAll
        };
        this.options = {
            sizePerPage: globalConfig.pageSize || 20,
            sizePerPageList: [],
            onRowClick: props.tableFun.onRowClick,
            onPageChange: props.tableFun.onPageChange
        };

        props.tableConfig.checkboxMode && (this.selectRowProp.mode = 'checkbox');

        // this._bind.apply(this, ['onPageChange']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        var props = this.props;
        var {list=[], total=0}  = props.tableData;
        list.length>0 && list.map((item, i) => {
            item.loginname = item.author.loginname;
            switch(item.tab){
                case 'share' :
                    item.tab = '分享';
                    break;
                case 'job' :
                    item.tab = '招聘';
                    break;
                case 'ask' :
                    item.tab = '问答';
                    break;
                default:
                    item.tab = '';
                    break;
            }
            item.create_at = moment(item.create_at).format('YYYY-MM-DD hh:mm:ss');
        });
        var tableHeight =  window.innerHeight - 40 - 113 - 36 - 75;  // 40 header, 113 top, 36 bottom, 75 pagination
        tableHeight = Math.min(612, tableHeight);   // 612, 20条数据的高度。取二者较小值，用于滚动
        console.log(tableHeight);
        var columns = [];
           columns.push(<TableHeaderColumn columnClassName="dsn" key="id"  dataField="id" isKey={true}>id</TableHeaderColumn>);
           columns.push(<TableHeaderColumn columnClassName="w1" key="loginname"  dataField="loginname" isKey={false}>发表人</TableHeaderColumn>);
           columns.push(<TableHeaderColumn columnClassName="w7" key="title"  dataField="title" isKey={false}>标题</TableHeaderColumn>);
           columns.push(<TableHeaderColumn columnClassName="w-5" key="tab"  dataField="tab" isKey={false}>类型</TableHeaderColumn>);
           columns.push(<TableHeaderColumn columnClassName="w1-5" key="create_at"  dataField="create_at" isKey={false}>时间</TableHeaderColumn>);
        
        return (
            <BootstrapTable ref='tableContainer'
                data={list} height={tableHeight} remote={ true } fetchInfo={ { dataTotalSize: total } }
                selectRow={this.selectRowProp} striped={true} hover={true} condensed={true} 
                ignoreSinglePage={true} pagination={true} options={this.options} >
                {columns}
            </BootstrapTable>
        );
    }
};

export default Table;
