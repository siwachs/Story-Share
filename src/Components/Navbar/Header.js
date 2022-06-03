import React from "react";
import Toggle from "../Utils/Toggle/Toggle";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../REDUX/actions/userActions";

const Header = ({ drawerHandler }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.loginUser);

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <header className="header">
      <nav className="header_nav">
        <div className="toggle_btn">
          {/* Button */}
          <Toggle toggleBtn={drawerHandler}></Toggle>
        </div>
        <div className="header_nav_logo">
          <NavLink to="/">Tell Stories</NavLink>
        </div>
        <div className="header_nav_spacer"></div>
        <div className="header_nav_links">
          {/* Nav Links */}

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
        </div>
      </nav>
    </header>
  );
};

export default Header;
