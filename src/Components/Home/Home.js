import React, { useEffect } from "react";
import Card from "../Utils/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import User from "./User/User";
import { getAllUsers } from "../../REDUX/actions/userActions";
import Loader from "../Utils/Loader/Loader";
import Message from "../Utils/Message/Message";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { loading, users, error } = useSelector((state) => state.usersList);

  if (loading) return <Loader></Loader>;

  if (error) return <Message variant="danger">{error}</Message>;

  if (users.length === 0) {
    return (
      <Card style={{ margin: "1rem" }}>
        <h1 className="center">No Users Found!</h1>
      </Card>
    );
  } else {
    return (
      <>
        <h1>All Users</h1>
        <ul className="user-list">
          {users.map((user) => (
            <User key={user._id} user={user}></User>
          ))}
        </ul>
      </>
    );
  }
};

export default Home;
