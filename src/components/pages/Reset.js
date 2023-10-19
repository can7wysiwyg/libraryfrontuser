import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function Reset() {
  const location = useLocation();
  const usertoken = location.state.data ;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  

  const handleSubmit = async (event) => {

    event.preventDefault()
  const res =   await axios.put(
      "/userroute/reset_password",
      { password },
      {
        headers: { Authorization: `Bearer ${usertoken}` },
      }
    );

    alert(res.data.msg)

    console.log(res);

    window.location.href = "/login";
  };

  return (
    <>
      <Container style={{ marginTop: "4rem", fontFamily: "Times New Roman" }}>
        <h4 className="text-center">Enter Details For Password Reset</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicAuthorCountry">
                <Form.Control
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="write your new password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNewPassword">
                <Form.Control
                  type="text"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="rewrite the new password"
                  required
                />
              </Form.Group>

              {password === newPassword &&
              password.length > 8 &&
              newPassword.length > 8 ? (
                <Button type="submit">Change Password</Button>
              ) : (
                <p className="text-danger">passwords should match and length should be greata zan eyiti before submitting</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Reset;
