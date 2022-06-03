import React, { useEffect } from "react";
import Card from "../Utils/Card/Card";
import Loader from "../Utils/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import "./MyStories.scss";
import { useParams, useNavigate } from "react-router-dom";
import Story from "./Story";
import { deleteStory, getUserStories } from "../../REDUX/actions/storyActions";
import { Button } from "react-bootstrap";
import Message from "../Utils/Message/Message";

const MyStories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, stories, error } = useSelector(
    (state) => state.userStoriesList
  );
  const { _loading, isDeleted } = useSelector((state) => state.deleteStory);
  const { userInfo } = useSelector((state) => state.loginUser);
  const uid = useParams().id || userInfo?._id;
  const role = userInfo?.role;

  useEffect(() => {
    if (!uid) {
      navigate("/login");
    } else {
      dispatch(getUserStories(uid));
    }
  }, [uid, dispatch, isDeleted]);

  const editHandler = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading || _loading) return <Loader></Loader>;

  if (error) return <Message variant="danger">{error}</Message>;

  if (stories.length === 0) {
    return (
      <Card style={{ margin: "1rem" }}>
        <h1 className="center">No Stories Found!</h1>
      </Card>
    );
  } else {
    return (
      <ul className="user-list">
        {stories.map((story) => (
          <div>
            <Story role={role} key={story._id} story={story}></Story>
            {userInfo && userInfo._id === uid && (
              <Button
                onClick={() => dispatch(deleteStory(story._id))}
                className="my-1"
                variant="link"
              >
                DELETE
              </Button>
            )}
            {userInfo && userInfo._id === uid && (
              <Button
                onClick={() => editHandler(story._id)}
                className="my-1"
                variant="link"
              >
                EDIT
              </Button>
            )}
          </div>
        ))}
      </ul>
    );
  }
};

export default MyStories;
