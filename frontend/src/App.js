import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUserComponent from './components/CreateUserComponent';
import LandingPage from './components/landing';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFound from './components/NotFound';
import ResponsiveAppBar from './components/reg';
import ViewUserComponent from './components/ViewUserComponent';
import getall from './components/GetAll';

function App() {
  return (
    <div>
      <Router>
        <ResponsiveAppBar />

        <div className=' '>
          {/*<sidebar></sidebar> */}
          {/*<Navbar/>*/}

          <Switch>
            {/*<Route path = "/" exact component = {ListUserComponent}></Route>*/}
            <Route path='/' exact component={LandingPage}></Route>
            <Route path='/login' exact component={LoginPage} />
            <Route path='/register' exact component={RegisterPage} />
            <Route path='/users' component={ListUserComponent}></Route>
            <Route path='/add-user/:id' component={CreateUserComponent}></Route>
            <Route path='/view-user/:id' component={ViewUserComponent}></Route>
            <Route path='/getall' component={getall}></Route>
            {/* <Route path = "/update-user/:id" component = {UpdateUserComponent}></Route> */}
          </Switch>
        </div>
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
