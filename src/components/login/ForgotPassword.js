import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    
    const[email, setEmail] = useState("");
    const errorMsg = "";
    const onChange = (e) => {
        setEmail(e.target.value);
    }
    
    const onSubmitForm = async(e) => {
        console.log(e);
    }

    return (
        <Fragment>
            <h1 className="text-center my-3">Register User</h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-group col-6 offset-3 rounded">
                    <label htmlFor="">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="email@address.com"
                        className="form-control"
                        value={email}
                        onChange={e => onChange(e)}>
                    </input>
                    <div className="form-group row">
                        <button className="btn btn-primary btn-block">Register</button>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-4">
                        <center><Link to="/login">&#60; Go Back to Login</Link></center>
                    </div>
                </div>
                <div>
                    <p id="errorMsg">{errorMsg}</p>
                </div>
            </form>
        </Fragment>
    )
}

export default ForgotPassword
