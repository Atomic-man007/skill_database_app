import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  // const isAuth  = false

  const token = localStorage.getItem('token');

  console.log("token",token);

 
  return <>{token ? <Route {...props} /> : <Redirect to="/login" />}</>;

};
export default PrivateRoute;