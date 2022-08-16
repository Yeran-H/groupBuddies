import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div style={{textAlign: "center", fontFamily: "Times New Roman"}}>
        <h3 style={{color: "light grey"}}><i>Welcome to Group Buddies!</i></h3>
        <br/>
        <br/>
        <p> very brief description TBC ... </p>
        <h3>{content}</h3>
    </div>
  );
};

export default Home;