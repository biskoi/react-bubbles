import React, {useState} from "react";
import axios from "axios";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', data)
    .then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.payload));
      window.location.href = '/bubble';
    })
    .catch(err => console.log(err));

  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit = {onSubmit}>
        <label name = 'username'>Username</label>
        <input htmlFor = 'username' name = 'username' value = {data.username} onChange = {onChange}/>
        <label name = 'password'>Password</label>
        <input htmlFor = 'password' name = 'password' value = {data.password} onChange = {onChange}/>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
