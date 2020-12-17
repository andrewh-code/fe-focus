import React, { Fragment, useState } from 'react'
import axios from 'axios';

function Register({setAuth}) {

    // define state variables here
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [errorMsg, setErrorMsg] = useState("");

    const endpoint = "http://localhost:1234/api/auth/register"

    const { firstname, lastname, email, password } = inputs;
    
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault(); // prevent the the refresh

        let user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };

        axios({
            method: 'post',
            url: endpoint,
            data: user,
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
                // setErrorMsg("Error: " + err.response.data.result);
            });
    }

    return (
        <Fragment>
            <h1 className="text-center my-3">Register User</h1>    
            <form onSubmit={onSubmitForm}>
                <div className="form-group col-6 offset-3 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="form-group row">
                        <label htmlFor="">First Name</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            className="form-control"
                            value={firstname}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="">Last Name</label>
                        <input 
                            type="text" 
                            name="lastname" 
                            className="form-control"
                            value={lastname}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
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
                            type="text"
                            name="password"
                            placeholder="********"
                            className="form-control"
                            value={password}
                            onChange={e => onChange(e)}>
                        </input>
                    </div>
                    <div className="form-group row">
                        <button className="btn btn-primary btn-block">Register</button>
                    </div>
                    <div>
                        <p id="errorMsg">{errorMsg}</p>
                    </div>
                </div>
            </form>

        </Fragment>
    )
}

export default Register
