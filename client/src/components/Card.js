import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardImgOverlay,
  CardTitle, CardSubtitle, Button, Row, Col, Modal,
  ModalHeader, ModalBody, } from 'reactstrap';
//import {CSSTransition, TransitionGroup} from 'react-transition-group';
//import uuid from 'uuid';
import {connect} from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import axios from 'axios';

var host = "http://"+ window.location.hostname;
//var host = "http://ec2-18-216-236-140.us-east-2.compute.amazonaws.com";
//console.log("host: " + host);

class CardHld extends Component{

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
      };

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    componentDidMount() {   
        //console.log("componentDidMount");
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        //console.log(this + "-" + id);
        //console.log(JSON.stringify(this));
        this.props.deleteItem(id)
    }

    imgChk = link => { (link === "") ? 
                            link = "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" 
                            : link = link;
                            return link;
                        };               

    render () {
        const { items } = this.props.item;
        //console.log('items: ' + JSON.stringify({items}));

        const display = (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                <ModalHeader toggle={this.toggle}>
                    Delete Item
                </ModalHeader>
                <ModalBody>
                    <p>
                    {'Register or Login to delete items'}
                    </p>
                    <br/>
                    <RegisterModal />
                    <br/>
                    <LoginModal />
                </ModalBody>
            </Modal>
        )

        return (
             //<Container>
             <>
                {this.props.isAuthenticated ? this.toggle : display}
                <Row>
                    {items.map(({ _id, name, location, link}) => (
                        <Col sm="6" key={_id}>
                        {/* {this.imgChk(link)} */}
                        {/* <img width="100%" src={this.imgChk(link)} alt="Card image cap" /> */}
                        <img width="100%" src={
                                (!link.startsWith("https://")) ? 
                                "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" : 
                                link} alt="Card image cap" />
                            <Card body>
                                <CardTitle>
                                    {name},  {location}
                                    <Button
                                        className="float-right" color="danger" size="sm"
                                        //onClick = {this.onDeleteClick.bind(this, _id)}
                                        onClick = {this.props.isAuthenticated 
                                        ? this.onDeleteClick.bind(this, _id)
                                        : this.toggle}
                                        >X
                                    </Button>
                                </CardTitle>
                                {/* <img width="100%" src= {link} alt="Card image cap" /> */}
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button>Go somewhere</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
            //</Container>
        );
    };
};

const mapStateToProps = (state) => {
    //console.log('mapState: ' + JSON.stringify(state));
    return {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
};

/* const mapDispachToProps = (dispach) => {
    //const setItemsLoading = () => dispach({type:'ITEMS_LOADING'});
    return {
        //getItems: () => dispach => { 
        getItems: () => { 
            //dispach(setItemsLoading());
            dispach({type:'ITEMS_LOADING'});
            axios
                .get(host+':5000/api/items/')
                .then(res => dispach({type:'GET_ITEMS', payload: res.data}))
                //.then(res => console.log('res' + JSON.stringify(res.data)))
        },

        // getItems: () => dispach({type:'GET_ITEMS'}),
        //deleteItem: (_id) => dispach({type:'DELETE_ITEM', id})
        deleteItem: (id) => {
            axios
                .delete(host+`:5000/api/items/${id}`)
                .then (res => dispach({type:'DELETE_ITEM', id}))
        }
        
    }
};
 */
export default connect(mapStateToProps, {getItems, deleteItem})(CardHld);