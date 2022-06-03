import React, { useState } from "react";
import Header from "./Components/Navbar/Header";
import SideDrawer from "./Components/Navbar/SideDrawer/SideDrawer";
import BackDrop from "./Components/Utils/Backdrop/BackDrop";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Post from "./Components/Post/Post";
import MyStories from "./Components/MyStories/MyStories";
import ReadStory from "./Components/ReadStory/ReadStory";
import Edit from "./Components/Post/Edit/Edit";

const App = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const drawerToggler = () => {
    setDrawerIsOpen((prevState) => {
      return !prevState;
    });
  };

  const backdropClickHandler = () => {
    setDrawerIsOpen(false);
  };

  const NavbarRender = () => {
    return (
      <>
        <Header drawerHandler={drawerToggler}></Header>
        <SideDrawer show={drawerIsOpen}></SideDrawer>
        {drawerIsOpen && (
          <BackDrop drawerHandler={backdropClickHandler}></BackDrop>
        )}
      </>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <NavbarRender></NavbarRender>
      <main>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/post" element={<Post></Post>}></Route>
          <Route
            exact
            path="/story/:id"
            element={<ReadStory></ReadStory>}
          ></Route>
          <Route
            exact
            path="/mystories"
            element={<MyStories></MyStories>}
          ></Route>
          <Route exact path="/edit/:id" element={<Edit></Edit>}></Route>
          <Route
            exact
            path="/mystories/:id"
            element={<MyStories></MyStories>}
          ></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
