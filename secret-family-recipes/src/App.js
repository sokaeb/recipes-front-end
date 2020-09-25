import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import UpdateRecipe from './components/UpdateRecipe';
import AllRecipes from './components/AllRecipes';
import { userLogin, userLogout } from './actions/index';

import './App.css';

const App = (props) => {
  const { userLogin, userLogout } = props;

useEffect(() => {
  if (localStorage.getItem('token')){
    userLogin();
  }else {
    userLogout();
  }
}, [userLogin, userLogout])

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="title">
            <h3>Secret Family Recipes</h3>
          </div>
          <Header />
        </header>
        <div> 
           
        </div>
      <Switch>
        <PrivateRoute exact path="/userprofile" component={UserProfile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/allrecipes" component={AllRecipes} />
        <Route path="/logout" component={Logout} />
        <Route path="/update-recipe/:id">
          <UpdateRecipe />
        </Route>
        <Route component={Login} />
      </Switch>
      </div>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    loadingRecipes: state.loadingRecipes,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps, { userLogin, userLogout })(App);
