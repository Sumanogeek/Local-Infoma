import React, { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { clearErrors } from '../actions/errorActions';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import axios from 'axios';

var host = "http://"+ window.location.hostname;
//var host = "http://ec2-18-216-236-140.us-east-2.compute.amazonaws.com";

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        location: '',
        link: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addItem: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
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
        //const { isAuthenticated } = this.props.isAuthenticated;

        var display = null
        const linkRegister = (
            <ModalBody>
                <p>
                    {'Register or Login to add items'}
                </p>
                <br/>
                <RegisterModal />
                <br/>
                <LoginModal />
            </ModalBody>
        )
        const linkItems = (
            <ModalBody>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="item">Item</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Add Shop"
                        onChange={this.onChange}
                        className="mb-3"
                        />

                    <Label for="location">Location</Label>
                    <Input
                        type="text"
                        name="location"
                        id="location"
                        placeholder="Add shop location"
                        onChange={this.onChange}
                        className="mb-3"
                        />

                    <Label for="link">Link</Label>
                    <Input
                        type="text"
                        name="link"
                        id="link"
                        placeholder="Add image link"
                        onChange={this.onChange}
                        className="mb-3"
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
        )
        { this.props.isAuthenticated ? display = linkItems : display = linkRegister }

        return(
            <div>
                <Button
                    color="dark"
                    style={{margin: '2rem'}}
                    onClick={ this.toggle }
                    >Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>
                            Add New Item
                        </ModalHeader>
                            { display }
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {addItem, clearErrors}) (ItemModal);