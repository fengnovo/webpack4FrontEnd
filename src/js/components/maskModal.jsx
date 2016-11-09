import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Immutable from 'immutable';

class MaskModal extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            showModal: props.showModal || false,
            container: props.showModal || null
        };

        this._bind.apply(this, ['close', 'open', 'enter']);
    }

    _bind (...methods) {
        methods.forEach( (method)=> this[method] = this[method].bind(this));
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    close () {
        this.setState({ showModal: false });
    }

    open () {
        this.setState({ showModal: true });
    }

    enter () {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Modal className='mask-model' show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>能居中显示吗</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>取消</Button>
                    <Button bsStyle='primary' onClick={this.enter}>确定</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};


export default MaskModal;
