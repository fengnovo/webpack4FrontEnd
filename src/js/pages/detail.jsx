import React from 'react';
import Immutable from 'immutable';

import Header from '../components/header';
import Navigate from '../components/navigate';
import Footer from '../components/footer';
import MaskModal from '../components/maskModal';

// import TableStore from '../stores/tableStore';
// import TableActions from '../actions/tableActions';


class Detail extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            id: props.routeParams.id,
            colName: 'list',
            content: '加载中'
        };
    }

    componentDidMount() {
        let id = this.state.id || '5433d5e4e737cbe96dcef312';
        var _this = this;
        // var url = (option.page == 1 ? '/test/testData.json' : '/test/testData2.json');
        var url = 'https://cnodejs.org/api/v1/topic/'+id;

        $.getJSON(url, function(json, textStatus) {
            _this.setState({
                content: json.data.content
            })
        });
    }

    componentWillUnmount() {
        
    }

    render() {
        let contentHtml = <article id='contentHtml' className='news-content' dangerouslySetInnerHTML={{__html: this.state.content}}></article>;
        return (
            <div className="info-detail-page page-wrap" ref="detail">
                <Header { ...this.state }/>
                <div className='info-detail-body page-body'> 
                    <div className='body-left'>
                        <Navigate { ...this.state } />
                    </div>
                    <div className='body-right'>
                        {contentHtml}
                        <Footer { ...this.state } />
                    </div>
                </div>
            </div>
        ); 
    }
};

export default Detail;
