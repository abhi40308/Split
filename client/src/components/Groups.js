import React, { Component, useState, useEffect } from "react";
import Split from "../contracts/Split.json";
import { Container, Card, Nav } from "react-bootstrap";

function Groups(props) {
  const [Groups, setGroups] = useState();

  const account = props.object.accounts;
  const web3 = props.object.web3;

  useEffect(() => {
    async function getGroups() {
      const networkId = await web3.eth.net.getId();
      const splitETH_address = Split.networks[networkId].address;
      const splitETH = new web3.eth.Contract(Split.abi, splitETH_address);
      const splitETH_event = new web3.eth.Contract(Split.abi, splitETH_address);
      splitETH_event.setProvider(web3.currentProvider);

      splitETH_event
        .getPastEvents(
          "GroupCreated",
          {
            fromBlock: 0,
            toBlock: "latest"
          },
          function() {}
        )
        .then(async function(events) {
          for (let element of events) {
            console.log("element!!!!! : " + element);
            var friends = [];
            for (let usr of element.returnValues._users) {
              const result = await splitETH.methods
                .groupBalances(element.returnValues._name, usr)
                .call();

              friends.push({
                address: usr,
                balance: result
              });
            }
            const myBal = await splitETH.methods
              .groupBalances(element.returnValues._name, account[0])
              .call();

            const result2 = await splitETH.methods
              .groupCloseTime(element.returnValues._name)
              .call();
            setGroups([
              ...Groups,
              {
                name: web3.utils.toAscii(element.returnValues._name),
                friends: friends,
                timeout: element.returnValues._timeout,
                closed: result2 > 0 ? true : false,
                myBal: myBal
              }
            ]);
          }
        });
    }
    getGroups();
    console.log(Groups);
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
          <Card.Text>{Groups} </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Groups;
