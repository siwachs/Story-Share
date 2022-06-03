import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../REDUX/actions/userActions";
import Loader from "../Utils/Loader/Loader";
import Message from "../Utils/Message/Message";

const Login = () => {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("Sign In");
  const [role, setRole] = useState("Buyer");

  const dispatch = useDispatch(),
    navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (auth === "Sign In") {
      if (email !== "" && password !== "") {
        dispatch(login(email, password));
      }
    } else {
      if (name !== "" && email !== "" && password !== "") {
        dispatch(register(image, name, email, password, role));
      }
    }
  };

  const { error, loading, userInfo } = useSelector((state) => state.loginUser);

  const changeState = () => {
    if (auth == "Sign In") {
      setAuth("Sign Up");
    } else {
      setAuth("Sign In");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const filePickerHandler = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <h1>{auth}</h1>
              {error && <Message variant="danger">{error}</Message>}
              <Form onSubmit={submitHandler}>
                {auth == "Sign Up" && (
                  <Form.Group controlId="image">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      placeholder="Profile Image"
                      onChange={filePickerHandler}
                    ></Form.Control>
                  </Form.Group>
                )}

                {auth == "Sign Up" && (
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                      <option value="Middleman">Middleman</option>
                    </Form.Control>
                  </Form.Group>
                )}

                {auth == "Sign Up" && (
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                )}

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Group>

                <Button className="my-3" type="submit" varient="primary">
                  {auth}
                </Button>
              </Form>

              <Row className="py-3">
                <Col>
                  <div onClick={changeState}>
                    {auth == "Sign In" ? (
                      <p className="_text">New Here? Sign Up!</p>
                    ) : (
                      <p className="_text">Already a account? Sign In</p>
                    )}
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
