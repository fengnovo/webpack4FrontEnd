import React from 'react';

const Header = (props) => {
    return (
        <header className="header">
            <div className="logo"></div>
            <a className="login" href="javascript:;" onClick={null}>登陆</a>
            {'infoManage'===props.colName ? <a className="new" href="#newInfo" onClick={props.new}>发布话题</a> : null}
        </header>
    );
};

export default Header;