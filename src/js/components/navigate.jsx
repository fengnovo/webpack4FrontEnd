import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

const Navigate = (props) => {
    return (
        <div>
            <div>
                用户信息
            </div>
            <Nav className="navigate" bsStyle="pills" stacked activeKey={props.colName}>
                <NavItem eventKey={"list"}  href='#list'>
                    帖子
                </NavItem>
                
                
            </Nav>
        </div>
    );
};

export default Navigate;