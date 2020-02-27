import React, { Component, useState, useEffect } from "react";
import Split from "../contracts/Split.json";
import { Container, Card, Nav } from "react-bootstrap";

function Home(props) {
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
    <Container>
        <br></br>
        <br></br>
        <br></br>
      <Card>
        <Card.Header as="h5">Your Account</Card.Header>
        <Card.Body>
          <Card.Title>Account Balance</Card.Title>
          <Card.Text>
              {Balance} Ethers
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
