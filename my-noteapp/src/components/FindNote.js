import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Navbar1 from "./Navbar1";
import Lottie from "react-lottie";
import anim3 from "../lotties/anim3.json";
import { useDispatch, useSelector } from "react-redux";
import {
  getallNotes,
  deletenotes,
  findNotesBySubject,
  getImpnote,
} from "../reducers/noteReducers";
import { useNavigate } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { Search } from "react-bootstrap-icons";
import { TrashFill } from "react-bootstrap-icons";
import { ShieldFillCheck } from "react-bootstrap-icons";

export default function FindNote() {
  const [remove, setRemove] = useState(false);
  const [search, setSearch] = useState("");
  const [impHead,setImpHead] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: anim3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();

  var color;
  const { findNote, notelist, impnotes, error, loading } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallNotes());
    setRemove(false);
  }, [remove]);

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
        <h1 className="text-center m-5">Search Note</h1>
        <Row>
          <Col xs={12} md={6}>
            <Form className="mt-3">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="danger"
                onClick={() => dispatch(findNotesBySubject(search))}
              >
                <Search style={{ marginRight: 3 }} />
                FindNote
              </Button>

              <Button
                variant="danger"
                className="m-3"
                onClick={() => {
                  dispatch(getImpnote(search[0]));
                  setImpHead(true)
                  console.log("clicked");
                }}
              >
                <Search style={{ marginRight: 3 }} />
                Impnotes
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6} className="mt-3">
            <Lottie options={defaultOptions} height={200} width={200} />
          </Col>
        </Row>
        {findNote == true ? (
          <h1 className="text-center m-5">Your Search Note</h1>
        ) : (
          <p></p>
        )}
        <Row>
          {findNote.map((item) => {
            color = "Danger";
            return (
              <div>
                <h1 className="text-center m-5">Your Search Note</h1>
                <Card
                  bg={color.toLowerCase()}
                  key={item._id}
                  text={color.toLowerCase() === "light" ? "dark" : "white"}
                  style={{ width: "16rem" }}
                  className="m-2 mr-3"
                >
                  <Card.Header>
                    {item.imp_note == true ? <ShieldFillCheck /> : <p></p>}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title> {item.subject} </Card.Title>
                    <Card.Text>{item.note}</Card.Text>
                    <div>
                      <PencilFill
                        size={25}
                        style={{ marginRight: 20 }}
                        onDoubleClick={() => {
                          navigate("/NoteView", {
                            state: {
                              subject: item.subject,
                              note: item.note,
                              id: item._id,
                              imp: item.imp_note,
                            },
                          });
                        }}
                      />

                      <TrashFill
                        size={25}
                        onDoubleClick={() => {
                          setRemove(true);
                          dispatch(deletenotes(item._id));
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
     { impHead == true ?  <h1 className="text-center m-5">ImportentNotes</h1> : <p></p>}
        <Row>
          {impnotes.map((item) => {
            color = "Danger";
            return (
              <div>
                <Card
                  bg={color.toLowerCase()}
                  key={item._id}
                  text={color.toLowerCase() === "light" ? "dark" : "white"}
                  style={{ width: "16rem" }}
                  className="m-2 mr-3"
                >
                  <Card.Header>
                    {item.imp_note == true ? <ShieldFillCheck /> : <p></p>}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title> {item.subject} </Card.Title>
                    <Card.Text>{item.note}</Card.Text>
                    <div>
                      <PencilFill
                        size={25}
                        style={{ marginRight: 20 }}
                        onDoubleClick={() => {
                          navigate("/NoteView", {
                            state: {
                              subject: item.subject,
                              note: item.note,
                              id: item._id,
                              imp: item.imp_note,
                            },
                          });
                        }}
                      />
                      <TrashFill
                        size={25}
                        onDoubleClick={() => {
                          setRemove(true);
                          dispatch(deletenotes(item._id));
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Row>
      </Container>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d13d4b"
          fill-opacity="1"
          d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,133.3C672,160,768,192,864,186.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <footer
        style={{
          background: "black",
          bottom: 0,
          width: "100%",
          height: 50,
        }}
        xs={12}
        md={12}
      >
        <p style={{ color: "white" }}>
          © 2021 Copyright: Lk@Darshan.All rights reserved
        </p>
      </footer>
    </div>
  );
}
