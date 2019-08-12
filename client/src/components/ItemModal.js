import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
//import uuid from 'uuid';
import axios from 'axios';

//var host = "http://"+ window.location.hostname;
var host = "http://ec2-18-216-236-140.us-east-2.compute.amazonaws.com";

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        location: '',
        link: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            [e.target.location]: e.target.value,
            [e.target.link]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            //id: uuid(),
            name: this.state.name,
            location: this.state.location,
            link: this.state.link
        }

        // Add item via addItem dispach action
        this.props.addItem(newItem);

        //Close modal
        this.toggle();
    };

    render() {
        return(
            <div>
                <Button
                    color="dark"
                    style={{margin: '2rem'}}
                    onClick={this.toggle}
                    >Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>
                            Add New Item
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="Add new item"
                                        onChange={this.onChange}
                                        />
                                    <Input
                                        type="text"
                                        name="location"
                                        id="item"
                                        placeholder="Add shop location"
                                        onChange={this.onChange}
                                        style={{marginTop: '2rem'}}
                                        />
                                    <Input
                                        type="text"
                                        name="link"
                                        id="item"
                                        placeholder="Add image link"
                                        onChange={this.onChange}
                                        style={{marginTop: '2rem'}}
                                        />
                                    <Button
                                        color="dark"
                                        style={{marginTop: '2rem'}}
                                        block
                                        >Add Item
                                    </Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>

                </Modal>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
})

const mapDispachToProps = (dispach) => {
    return {
        addItem: (item) => {
            axios
                .post(host+':5000/api/items', item)
                .then(res => dispach({type:'ADD_ITEM', payload: res.data}))
        }
    }
};

export default connect(mapStateToProps, mapDispachToProps) (ItemModal);