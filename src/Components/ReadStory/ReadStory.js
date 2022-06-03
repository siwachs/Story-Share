import React, { useEffect } from "react";
import "./ReadStory.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getStory } from "../../REDUX/actions/storyActions";
import Loader from "../Utils/Loader/Loader";
import { Container } from "react-bootstrap";
import Message from "../Utils/Message/Message";

const ReadStory = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(getStory(id));
  }, [id]);

  const { story, loading, error } = useSelector((state) => state.story);

  if (loading) return <Loader></Loader>;

  if (error) return <Message varient="danger">{error}</Message>;

  return (
    <Container>
      <div className="story_image center">
        <img className="img-fluid" src={story?.image}></img>
      </div>
      <h1 className="story_title">{story?.title}</h1>
      <div className="story_content">
        <p>{story?.story}</p>
      </div>
    </Container>
  );
};

export default ReadStory;
