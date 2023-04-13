import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { deletenotes, updatenotes } from "../reducers/noteReducers";
import { useDispatch, useSelector } from "react-redux";
import { PencilFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import Navbar1 from "./Navbar1";

export default function NoteView() {
  const dispatch = useDispatch();
  const [subject, setsubject] = useState("");
  const [note, setnote] = useState("");
  const [imp_note, setImp_note] = useState(false);
  const [remove, setRemove] = useState(false);
  const [up, setUp] = useState(false);
  const [id, setId] = useState("");
  const location = useLocation();
  console.log(
    location.state.subject,
    location.state.note,
    location.state.id,
    location.state.imp
  );
  // const addNote = () => {
  //   dispatch(createNote({ subject, note, imp_note }));
  // };

  const updateNote = () => {
    dispatch(updatenotes({ id, subject, note, imp_note }));
    console.log("dispatch", id, subject, note);
  };
  return (
    <div>
      <Navbar1 />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d13d4b"
          fill-opacity="1"
          d="M0,224L60,229.3C120,235,240,245,360,240C480,235,600,213,720,186.7C840,160,960,128,1080,128C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                  placeholder="Enter Title"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="note">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  value={note}
                  onChange={(e) => setnote(e.target.value)}
                  placeholder="Enter Note"
                />
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicCheckbox">
                <Form.Check
                  type="switch"
                  value={imp_note}
                  onChange={() => setImp_note(!false)}
                  label="Importent Note"
                />
              </Form.Group>

              <Button
                variant="danger"
                // type="submit"
                onClick={() => updateNote()}
              >
                <PencilFill style={{ marginRight: 3 }} />
                update
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6} className="mt-3">
            <Card>
              <Card.Header as="h5">
                {location.state.imp == true ? <h3>Importnent</h3> : <p></p>}
              </Card.Header>
              <Card.Body>
                <Card.Title>{location.state.subject}</Card.Title>
                <Card.Text>{location.state.note}</Card.Text>
                <Button
                  style={{ marginRight: 5 }}
                  variant="danger"
                  onClick={() => {
                    setsubject(location.state.subject);
                    setnote(location.state.note);
                    setId(location.state.id);
                    setImp_note(location.state.imp);
                  }}
                >
                  update
                </Button>
                <Button
                  variant="danger"
                  onDoubleClick={() => {
                    setRemove(true);
                    dispatch(deletenotes(location.state.id));
                  }}
                >
                  delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d13d4b"
          fill-opacity="1"
          d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,133.3C672,160,768,192,864,186.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <footer style={{ background: "black", height: 50 }} xs={12} md={12}>
        <p style={{ color: "white" }}>© 2021 Copyright: Lk@Darshan.All rights reserved</p>
      </footer>
    </div>
  );
}
