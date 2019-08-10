import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import CardHld from './components/Card';
import ItemModal from './components/ItemModal';

import {Provider} from 'react-redux';
//import store from './store';
import {createStore} from 'redux';
import reducer from './store/reducer';
import {Container} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = createStore(reducer);

//make a new Context
//const MyContext = React.createContext("east");

//create Context provider
/* class MyProvider extends Component {
  state = {
    host = "http://"+ window.location.hostname
  }
  render() {
    return(
      <MyContext.Provider value="Hie">
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
 */
function App() {
  return (
    <Provider store={store}>
    {/* <MyContext.Provider value={"North"}> */}
      <div className="App">
        {/*<h1>Hello!!!</h1>*/}
        {/* {(() => {
          console.log("storeB: "+ JSON.stringify(store))
          store.host = "Host";
          console.log("storeA: "+ JSON.stringify(store))
        })()} */}
        <AppNavbar />
        <Container>
          <ItemModal />
          <CardHld />
        </Container>
      </div>
    {/* </MyContext.Provider> */}
    </Provider>

  );
}

export default App;
