import "regenerator-runtime/runtime";
import React, { useRef, useState } from "react";
import { login, logout } from "./utils";
import "./global.css";
import { BN } from "bn.js";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

import {
  Nav,
  Navbar,
  Container,
  Row,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { utils } from "near-api-js";

export default function App() {
  const [subAccount, changeSubAccount] = useState(
    "Your SubAccount Name Will be Shown Here"
  );
  const [displaySuccess, changeDisplaySuccess] = useState(false);

  const subAccountRef = useRef();

  // Deploy Contract Code to new account
  const deployCode = async () => {
    await window.contract.deploy_contract_code({
      account_id: `${subAccount}`,
    });
    changeDisplaySuccess(true);
  };

  return (
    <React.Fragment>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='near.org'>NEAR</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='https://github.com/near-daos/sputnik-dao-contract/blob/372df7d715c4c7c06ba14a3ba5b4db65f50b81f9/sputnikdao-factory2/src/lib.rs'>
                Sputnik DAO Example
              </Nav.Link>
            </Nav>
            <Nav.Link
              onClick={window.walletConnection.isSignedIn() ? logout : login}
            >
              {window.walletConnection.isSignedIn()
                ? window.accountId
                : "Login"}
            </Nav.Link>{" "}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: "5vh" }}>
        <Row>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput1'
                >
                  <Form.Label>
                    Sub Account Name (will auto correct to lowercase){" "}
                  </Form.Label>
                  <Alert variant={"primary"}>{subAccount}</Alert>
                  <Form.Control
                    onChange={() => {
                      let value = subAccountRef.current.value;
                      changeSubAccount(
                        `${value.toLowerCase()}.${process.env.CONTRACT_NAME}`
                      );
                    }}
                    ref={subAccountRef}
                    placeholder='enter your subaccount name here'
                  />
                </Form.Group>
              </Form>
              <Button onClick={deployCode}> Deploy Contract Code</Button>
              {displaySuccess ? (
                <Alert style={{ marginTop: "2vh" }}>
                  Sub Account Created and Contract Deployed
                </Alert>
              ) : null}
            </Card.Body>
          </Card>
        </Row>

        <Row style={{ marginTop: "5vh" }}>
          <Card style={{ marginTop: "5vh" }}>
            <Card.Title>
              In a separate terminal, try to call your new contract account!
            </Card.Title>
            <Card.Body>
              <Card.Body>
                Copy and paste the following into a separate terminal
              </Card.Body>
              <Alert>{`near call ${subAccount} addMessage '{"text": "Aloha"}' --account-id ${window.accountId}
`}</Alert>
              <Card.Body>Now try making a view call from that </Card.Body>
              <Alert>{`near view ${subAccount} getMessages '{}'`}</Alert>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
}
