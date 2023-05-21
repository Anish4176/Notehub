import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const host = 'http://localhost:5000';
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  //Handling the Signup
  const handlesignup = async (e) => {
    try {
      e.preventDefault();   //to prevent reloading the page
      const { name, email, password, cpassword } = credentials;
      console.log(name, email, password, cpassword);
      //checking password and confirm password
      if (password !== cpassword) {
        props.showAlert('Password and Confirm Password is not matching', "danger");
        return;
      }

      // Adding the user into into database
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc
        body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        }
      });
      const json = await response.json();
      console.log(json);

      // if json contains success:true it means the user is genuine 
      if (json.success === true) {
        //save token in localstorage and redirect user to home page
        localStorage.setItem("token", json.token);
        navigate('/');  // for redirecting to home page ,earlier it was called history now it is navigate
        props.showAlert('Account created successfully', 'success')
      }
      else {
        props.showAlert('Email id already exist', 'danger');
      }
    }
    catch (err) {
      console.log('there is an error')
      console.log(err);
      console.log(err.messege);
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container" style={{ "marginTop": "6rem" }}>
      <h2 className='text-center'>Notehub- <span style={{ fontSize: "2rem" }}>Your Notes on the Cloud</span> </h2>
      <hr className='w-50 m-auto' />
      <h5 className='text-center ' style={{ margin: "2rem" }}>New to Notehub?  Create a new account here!</h5>
      <form onSubmit={handlesignup} className=' mx-auto signup-form' >
        <div className="mb-3">
          <label htmlFor="text" style={{ fontSize: "1.2rem" }}   className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} value={credentials.name} name='name' required />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" style={{ fontSize: "1.2rem" }} className="form-label">Email address</label>
          <input type="email" className="form-control" autoComplete="username" onChange={onChange} value={credentials.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='name@example.com' required />

          <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" style={{ fontSize: "1.2rem" }} className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="exampleInputPassword1" autoComplete="current-password" name='password' required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" style={{ fontSize: "1.2rem" }} className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} autoComplete="current-password" value={credentials.cpassword} id="exampleInputCPassword1" name='cpassword' required />
        </div>

        <div className='text-center'>

          <button type="submit" className="btn btn-secondary my-2 ">SignUp</button>
        </div>
      </form>
    </div>

  )
}

export default SignUp