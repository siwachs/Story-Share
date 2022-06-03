import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Loader from "../../Utils/Loader/Loader";
import { useParams } from "react-router-dom";
import { editStory, getStory } from "../../../REDUX/actions/storyActions";
import Message from "../../Utils/Message/Message";

const Edit = () => {
  const { loading, story, error } = useSelector((state) => state.story);
  const dispatch = useDispatch();
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [_story, setStory] = useState("");
  const { _loading } = useSelector((state) => state.editStory);

  useEffect(() => {
    if (!story) {
      dispatch(getStory(id));
    } else {
      setTitle(story.title);
      setStory(story.story);
    }
  }, [dispatch, id, story]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (_story != "" && title != "") {
      dispatch(editStory(id, _story, title));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {loading || _loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <h1>Edit your Story</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title (Must provided)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Story</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Story (Must provided)"
                    value={_story}
                    onChange={(e) => setStory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button className="my-3" type="submit" varient="primary">
                  Save Changes
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
