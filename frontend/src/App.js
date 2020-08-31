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
import Restaurant from './components/Restaurant';
import RestauranteleMele from './components/RestauranteleMele';
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
          <Nav.Link href='/restaurants-requests'>Cereri creare restaurant</Nav.Link>
          <Nav.Link href='/restaurantele-mele'>Restaurantele mele</Nav.Link>
        </Nav>
        <Nav className="justify-content-end align-items-center">
          <AddNewPlace />
          <Nav.Link href='/register'><button className='btn btn-outline-info'>Inregistrare</button></Nav.Link>
          <Nav.Link href='/login'><button className='btn btn-outline-info'>Logare</button></Nav.Link>
        </Nav>
      </Navbar >
      <Switch>
        <Route exact path='/' component={Restaurants} />
        <Route exact path='/home' component={Restaurants} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/restaurants-requests' component={RestaurantsRequests} />
        <Route exact path='/restaurantele-mele' component={(props) => <Restaurants {...props} owner={true} />} />
        <Route exact path='/restaurant/:id' component={Restaurant} />
      </Switch>
    </ApolloProvider >
  );
}

export default App;
