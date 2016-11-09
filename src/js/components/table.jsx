import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Immutable from 'immutable';


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

        var tableHeight =  window.innerHeight - 40 - 113 - 36 - 75;  // 40 header, 113 top, 36 bottom, 75 pagination
        tableHeight = Math.min(612, tableHeight);   // 612, 20条数据的高度。取二者较小值，用于滚动

        var columns = props.tableConfig.column.map((item, i) => {
            return (
                <TableHeaderColumn key={item.field} dataField={item.field} isKey={item.isKey}>{item.name}</TableHeaderColumn>       
            );
        });
        
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
