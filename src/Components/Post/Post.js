import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Loader from "../Utils/Loader/Loader";
import "./Post.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postStory } from "../../REDUX/actions/storyActions";
import Message from "../Utils/Message/Message";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [uid, setUid] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");

  const filePickerHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const { userInfo } = useSelector((state) => state.loginUser);

  const { loading, error } = useSelector((state) => state.postStory);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setUid(userInfo._id);
    }
  }, [userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (image && uid !== "" && title !== "" && story !== "") {
      dispatch(postStory(uid, image, title, story));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <h1>Post a Story</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="image">
                  <Form.Label>Any image you want to share</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    placeholder="Profile Image"
                    onChange={filePickerHandler}
                  ></Form.Control>
                </Form.Group>

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
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button className="my-3" type="submit" varient="primary">
                  Post
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
