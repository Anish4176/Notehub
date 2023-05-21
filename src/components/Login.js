import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const host = 'http://localhost:5000';
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: '', password: '' })

    //Handling the login
    const handlelogin = async (e) => {
        try {
            e.preventDefault();   //to prevent reloading the page

            // fetching the user from the db if available
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc
                body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
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
                props.showAlert("Logged in successfully", "success");
            }
            else {
                props.showAlert('Invalid credentials', "danger");
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
        <div style={{ "marginTop": "8rem" }} className='space-div'>
            <h2 className='text-center'>Notehub- <span style={{ fontSize: "2rem" }}>Your Notes on the Cloud</span> </h2>
            <hr className='w-50 m-auto' />
            <h5 className='text-center ' style={{ margin: "2rem" }}>Login to continue using Notehub!</h5>
            <form onSubmit={handlelogin} className=' mx-auto login-form'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" style={{ fontSize: "1.2rem" }} className="form-label ">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name="email" aria-describedby="emailHelp" autoComplete='Username' value={credentials.email} placeholder='name@example.com' required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" style={{ fontSize: "1.2rem" }} className="form-label " >Password</label>
                    <input type="pasword" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1" autoComplete="current-password" required />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-secondary ">Login Me</button>
                </div>
            </form>
        </div>
    )
}

export default Login