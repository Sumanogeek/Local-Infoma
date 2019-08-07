import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import CardHld from './components/Card';
import ItemModal from './components/ItemModal';

import {Provider} from 'react-redux';
//import store from './store';
import {createStore} from 'redux';
import reducer from './store/reducer';
import {Container} from 'reactstrap';

import '../../server/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/*<h1>Hello!!!</h1>*/}
        <AppNavbar />
        <Container>
          <ItemModal />
          <CardHld />
        </Container>
      </div>
    </Provider>

  );
}

export default App;
