import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
import PrivateRoute from './services/privateRoute';
import RestrictedRoute from './services/restrictedRoute';
import CreateUserComponent from './components/CreateUserComponent';
import LandingPage from './components/landing';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Headerresponsive from './components/Header';
import ViewUserComponent from './components/ViewUserComponent';
import getall from './components/GetAll';


function App() {
  return (
    <div>
      <Router>
        <Headerresponsive />

        <div className=' '>
          {/*<sidebar></sidebar> */}
          {/*<Navbar/>*/}

          <Switch>
          <PrivateRoute path='/' exact component={LandingPage}></PrivateRoute>
          <RestrictedRoute path='/login' exact component={LoginPage} />
          <Route path='/register' exact component={RegisterPage} />
          <PrivateRoute path='/users' component={ListUserComponent}></PrivateRoute>
          <PrivateRoute path='/add-user/:id' component={CreateUserComponent}></PrivateRoute>
          <PrivateRoute path='/view-user/:id' component={ViewUserComponent}></PrivateRoute>
          <PrivateRoute path='/getall' component={getall}></PrivateRoute>
            {/* <Route path = "/update-user/:id" component = {UpdateUserComponent}></Route> */}
          </Switch>
        </div>
        <br></br>
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
