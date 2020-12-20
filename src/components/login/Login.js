import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

// css files
import '../../App.css';

function Login({setAuth}) {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""    
    });

    const [errorMsg, setErrorMsg] = useState("");

    const endpoint = "http://localhost:1234/api/auth/login";

    const {email, password} = inputs;
    
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        let loginBody = {
            email: email,
            password: password
        }
        // axios stuff here
        axios({
            method: 'post',
            url: endpoint,
            data: loginBody,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(serverResponse => {
                var result = serverResponse.data.result;
                var token = result.token;
                
                localStorage.setItem("token", token);
                setAuth(true);
            })
            .catch(err => {
                console.log(err.response);
                var errorMsg = "";
                if (!err.response){
                    errorMsg = "Error: Unable to establish connection to server"
                } else {
                    errorMsg = err.response;
                }
                setErrorMsg(errorMsg);
            });
    }
    return (
        <Fragment>
            <h1 className="text-center my-3">Login</h1>    
            <form onSubmit={onSubmitForm}>
                <div className="form-group col-8 offset-2">
                    <div className="form-group row">
                        <label htmlFor="">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="email@address.com"
                            className="form-control"
                            value={email}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="********"
                            className="form-control"
                            value={password}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-3">
                            <button className="btn btn-primary btn-block">Login</button>
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-4">
                            <center><Link to="/forgot">Forgot Password?</Link></center>
                        </div>
                        <div className="col-4">
                            <center><Link to="/register">Create User</Link></center>
                        </div>
                    </div>
                    <div>
                        <p id="error">{errorMsg}</p>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default Login
