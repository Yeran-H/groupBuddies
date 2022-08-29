import React, {useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Account = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showStudent, setShowStudent] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      setShowStudent(currentUser.roles.includes("ROLE_STUDENT"));
    }
  }, [currentUser]);

  useEffect(() => {
    if (firstLogin) {
      setFirstLogin(!currentUser.hasOwnProperty("course"));
    }
  }, [firstLogin]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (!currentUser.hasOwnProperty("course")){
    return <Redirect to={"/profile/" + currentUser?.username}/>
  }

  return (
    <div className="container" style={{fontFamily: "Times New Roman"}}>
      {/* {firstLogin && (
        <div>First Login</div>
      )}

      {showStudent && (
        <div>Student</div>
      )}
     */}
     
      {currentUser && (
        <>
          <header className="jumbotron" style={{ textAlign: "center" }}>
          <h3><strong>{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}'s</strong> Account</h3>
          </header><p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p><p>
            <strong>Id:</strong> {currentUser.id}
          </p><p>
            <strong>Email:</strong> {currentUser.email}
          </p><strong>Authorities:</strong><ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};

export default Account;