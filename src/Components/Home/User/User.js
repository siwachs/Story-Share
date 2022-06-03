import React from "react";
import Card from "../../Utils/Card/Card";
import "./User.scss";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();

  const userStories = () => {
    navigate(`mystories/${user._id}`);
  };

  return (
    <div onClick={userStories}>
      <Card className="hover-effect" style={{ margin: "1rem" }}>
        <li className="user">
          <div className="user_content">
            <img className="user_img" src={user.image} alt={user.name}></img>
            <div className="user_info">
              <h4>{user.name}</h4>
              <p>{user.role}</p>
              <h5>
                {user.stories.length === 0
                  ? "No Stories Found"
                  : user.stories.length === 1
                  ? "1 Story"
                  : `${user.stories.length} Stories`}
              </h5>
            </div>
          </div>
        </li>
      </Card>
    </div>
  );
};

export default User;
