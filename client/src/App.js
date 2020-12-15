import React, { Component } from "react";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Singleresult from "./components/Singleresult";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import history from "./history";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar />
          <Route exact path="/" component={Search} />
          <Route exact path="/result" component={Singleresult} />
        </div>
      </Router>
    );
  }
}
