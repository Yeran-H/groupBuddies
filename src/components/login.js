import { Grid, Paper, TextField } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../actions/auth";
import { Typography } from "@material-ui/core";
import logo from "../media/groupbuddies-logo.png"
import { Button } from "@material-ui/core";
import AlertMessage from "./AltertMessage";

const paperStyling = { padding: 40, height: '50h ', width: 420, margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const btnstyle = { margin: '40px 0', borderRadius: 10, }
const typ1 = { fontWeight: 600, fontFamily: "Arial" }

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const [status, setStatusBase] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(login(username, password))
      .then(() => {
        props.history.push("/account/" + username);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
        setStatusBase({ msg: "Incorrect login credentials please try again", key: Math.random() });
      });
     
  };
  

  if (isLoggedIn) {
    return <Redirect to={"/account/" + username}/>;
  }

  return (
    <Grid>
      <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling} >
        <Grid align='center' >
          <img src={logo} id="groupbuddieslogo" height="100" alt="" />
          <Typography variant='h4' fontFamily='BlinkMacSystemFont' style={typ1}> Group Buddies </Typography>
          <Typography variant='subtitle2'> To begin, enter your UTS account details</Typography>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField label='Username' placeholder="enter username" fullWidth required onChange={onChangeUsername} />
          <TextField label='Password' type="password" placeholder="enter password" fullWidth required onChange={onChangePassword} />
          <Button type='submit' color="primary" variant="contained" style={btnstyle} fullWidth>Sign in</Button>
        </form>
      </Paper>
      {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
    </Grid >
  )

}
export default Login;
