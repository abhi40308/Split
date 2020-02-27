import React, { Component, useState } from "react";
import "../App.css";
import Split from "../contracts/Split.json";
import { Form, Button, Container } from "react-bootstrap";

function CreateGroup(props) {
  const [Contract, setContract] = useState();
  const [GroupName, setGroupName] = useState("");
  const [UserName, setUserName] = useState("");
  const web3 = props.object.web3;
  const accounts = props.object.accounts;

  // create a new group, take code from handlesubmitnewchannel code.
  const createC = async () => {
    console.log("here");
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Split.networks[networkId];
    console.log(networkId);
    const instance = new web3.eth.Contract(
      Split.abi,
      deployedNetwork && deployedNetwork.address
    );
    setContract(instance);
    console.log(instance);
    // await instance.methods
    //   .createContract(GroupName, UserName)
    //   .send({ from: accounts[0] });
    const response = await instance.methods.getUserName().call();
    const nofU = await instance.methods.getNumberOfUsers().call();
    console.log('number of users : ', nofU);
    console.log(response);

    const getUB = await instance.methods.getUserBalance().call();
    console.log('user balnce', getUB);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createC();
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <Container className="CreateContract">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Enter Group Name"
              value={GroupName}
              onChange={evt => setGroupName(evt.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Enter User Name"
              value={UserName}
              onChange={evt => setUserName(evt.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CreateGroup;
