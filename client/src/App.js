import React, { Component } from "react";
import Split from "./contracts/Split.json";
import getWeb3 from "./getWeb3";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import "./App.css";
import CreateGroup from "./components/CreateGroup";
import Header from "./components/Header";
import Home from "./components/Home";
import Groups from "./components/Groups";

// for routing
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = { web3: null, accounts: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({ web3, accounts });
    } catch (error) {
      alert(`Failed to load web3 or accounts.`);
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header object={this.state} />
        <Switch>
          <Route exact path="/" render={() => <Home object={this.state}/>}/>
          <Route exact path="/groups" render={() => <Groups object={this.state}/>}/>
          <Route exact path="/create" render={() => <CreateGroup object={this.state}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
