import React from "react";
import "./SideDrawer.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../REDUX/actions/userActions";

const SideDrawer = ({ show }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.loginUser);

  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <aside className={show ? "side-drawer open" : "side-drawer"}>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/post">
          <li>Post a Story</li>
        </NavLink>
        <NavLink to="/mystories">
          <li>My Stories</li>
        </NavLink>
        {userInfo ? (
          <NavLink to="/">
            <li onClick={logOutHandler}>Log Out</li>
          </NavLink>
        ) : (
          <NavLink to="login">
            <li>Login</li>
          </NavLink>
        )}
      </ul>
    </aside>
  );
};

export default SideDrawer;
