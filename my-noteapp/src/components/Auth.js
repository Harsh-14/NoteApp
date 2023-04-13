import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser, signupUser } from "../reducers/authReducers";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import Lottie from "react-lottie";
import anim2 from "../lotties/anim2.json";
import { BoxArrowInRight} from "react-bootstrap-icons";
export default function Auth() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anim2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState("signin");
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const authenticate = () => {
    if (auth == "signin") {
      dispatch(signinUser({ username, password }));
    } else {
      dispatch(signupUser({ email, username, password }));
    }
  };
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d13d4b"
          fill-opacity="1"
          d="M0,224L60,229.3C120,235,240,245,360,240C480,235,600,213,720,186.7C840,160,960,128,1080,128C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <Container className="mt-5">
        <div>
          <Row>
            <Container>
              <Row>
                <Col xs={12} md={6} style={{ backgroundColor: "" }}>
                  <h1>{auth.toLocaleUpperCase()} </h1>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <br />
                  {loading && (
                    <div className="text-center m-5">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}

                  <Form>
                    {auth == "signup" ? (
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder="Enter Your Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    ) : (
                      <h6></h6>
                    )}

                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        placeholder="Enter username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Your username or email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="note">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        placeholder="Enter Note"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                      />
                    </Form.Group>

                    {auth == "signin" ? (
                      <h6 onClick={() => setAuth("signup")}>
                        Don't have an account ?{" "}
                      </h6>
                    ) : (
                      <h6 onClick={() => setAuth("signin")}>
                        Already have an account ?
                      </h6>
                    )}
                    <Button variant="danger" className="mt-3" onClick={() => authenticate()}>
                    <BoxArrowInRight style={{marginRight:3}}/>
                      {auth.toLocaleUpperCase()}
                    </Button>
                  </Form>
                </Col>
                <Col xs={12} md={6} style={{ backgroundColor: "" }}>
                  <Lottie options={defaultOptions} height={400} width={400} />
                </Col>
              </Row>
            </Container>
          </Row>
        </div>
      </Container>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d13d4b"
          fill-opacity="1"
          d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,133.3C672,160,768,192,864,186.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
