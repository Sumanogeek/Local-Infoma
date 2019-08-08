import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardImgOverlay,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
//import {CSSTransition, TransitionGroup} from 'react-transition-group';
//import uuid from 'uuid';
import {connect} from 'react-redux';
//import {getItems} from '../actions/itemActions';
//import PropTypes from 'prop-types';
import axios from 'axios';

var host = "http://"+ window.location.hostname;
//console.log("host: " + host);

class CardHld extends Component{

    componentDidMount() {    
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        //console.log(this + "-" + id);
        //console.log(JSON.stringify(this));
        this.props.deleteItem(id);
    }

    render () {
        const items = this.props.item;
        //console.log('items' + items);
        return (
             //<Container>
                <Row>
                    {items.map(({ _id, name, location, link}) => (
                        <Col sm="6" key={_id}>
                        <img width="100%" src={link} alt="Card image cap" />
                            <Card body>
                                <CardTitle>
                                    {name},  {location}
                                    <Button
                                        className="float-right" color="danger" size="sm"
                                        onClick = {this.onDeleteClick.bind(this, _id)}
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
            //</Container>
        );
    };
};

const mapStateToProps = (state) => {
    //console.log('mapState: ' + JSON.stringify(state));
    return {
        item: state.items
    }
};

const mapDispachToProps = (dispach) => {
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

export default connect(mapStateToProps, mapDispachToProps)(CardHld);