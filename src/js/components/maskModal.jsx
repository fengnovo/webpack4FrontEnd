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
        this.close = () => {
            props.onChangeModal();
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
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>请登陆！</p>
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
