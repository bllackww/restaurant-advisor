import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddNewPlace from './components/AddNewPlace'
import { Switch, Route } from 'react-router'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'font-awesome/css/font-awesome.min.css'
import Restaurants from './components/Restaurants';
import RestaurantsRequests from './components/RestaurantsRequests';

const client = new ApolloClient({
  uri: 'http://localhost:5000/main'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar variant='dark' className="bg-dark justify-content-between">
        <Nav>
          <Navbar.Brand href="/">Restaurant Advisor</Navbar.Brand>
          <Nav.Link href='/restaurants-requests'>Restaurants Requests</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <AddNewPlace />
          <Nav.Link href='/register'>Sign up</Nav.Link>
          <Nav.Link href='/login'>Sign in</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path='/' component={Restaurants} />
        <Route exact path='/home' component={Restaurants} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/restaurants-requests' component={RestaurantsRequests} />
      </Switch>
    </ApolloProvider >
  );
}

export default App;
