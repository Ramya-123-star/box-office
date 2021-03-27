/* eslint-disable*/
import React from "react";
import {Switch,Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import Starred from "./components/pages/Starred";

function App() {
  return(
   <Switch>
    <Route exact path="/">
      <Home />
      </Route>
      <Route exact path="/starred">
      <Starred />
      </Route>
      <Route> 
        <div> Not found </div> 
        </Route>
    </ Switch>
  );
};
export default App;