import React from 'react';

const Footer = (props) => {
    return (
        <footer className="footer">
            <p>  react-bootstrap-cnode {(new Date()).getFullYear()}</p>            
        </footer>
    );
};

export default Footer;