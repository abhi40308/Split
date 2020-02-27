import React, { Component, useState, useEffect } from "react";
import Split from "../contracts/Split.json";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";

function Header(props) {
  const [Balance, setBalance] = useState("20");
  const account = props.object.accounts;
  const web3 = props.object.web3;

  useEffect(() => {
    async function fetchBalance() {
      let balance = await web3.eth.getBalance(account[0]); //Will give value in.
      balance = web3.utils.fromWei(balance);
      setBalance(balance);
      console.log(balance);
    }
    fetchBalance();
  });
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Split</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/create">New Group</Link>
          &nbsp;
          &nbsp;
          &nbsp;
          <Link to="/groups">My Groups</Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
