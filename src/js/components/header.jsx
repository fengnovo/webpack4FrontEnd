import React from 'react';

const Header = (props) => {
    return (
        <header className="header">
            <div className="logo"></div>
            <a className="login" href="javascript:;" onClick={null}>登陆</a>
            {'list'===props.colName ? <a className="new" href="#new" onClick={props.new}>发布话题</a> : null}
        </header>
    );
};

export default Header;