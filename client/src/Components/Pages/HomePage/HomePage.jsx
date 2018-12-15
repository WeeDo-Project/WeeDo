import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class HomePage extends Component {



  render() {
    return (

      <div>
        <Link to={"/signup"}><p>SignUp</p></Link>
        <Link to={"/login"}><p>LogIn</p></Link>
        <Link to={"/newplan"}><p>New Plan</p></Link>
        <Link to={"/chat"}><p>Chat</p></Link>
        <Link to={"/profile"}><p>View Profile</p></Link>
        <Link to={"/plans"}><p>View Plans</p></Link>
        <Link to={"/friends"}><p>View Friends</p></Link>

      </div>
    )
  }
}
