import React from "react";
import Card from "../Utils/Card/Card";
import { useNavigate } from "react-router-dom";

const Story = ({ story, role }) => {
  const navigate = useNavigate();

  const readStory = (id) => {
    navigate(`/story/${id}`);
  };

  return (
    <div onClick={() => readStory(story._id)}>
      <Card
        className="hover-effect"
        style={{ margin: "1rem", marginBottom: "0" }}
      >
        <li className="user">
          <div className="user_content">
            <img className="user_img" src={story.image}></img>
            <div className="user_info">
              <h4 className="one-line_desc">{story.title}</h4>
              <p>{role}</p>
              <p className="one-line_desc">{story.story}</p>
            </div>
          </div>
        </li>
      </Card>
    </div>
  );
};

export default Story;
