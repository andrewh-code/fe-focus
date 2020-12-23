import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from './Sidebar';
import "../index.css";
import "../App.css";
import "../css/Sidebar.css";
import "../css/Dashboard.css";
import axios from 'axios';

import GlobalHeader from './GlobalHeader';

import pic from '../assets/images/639_terrakion.png';

function Dashboard({setAuth}) {
    
    // test profile pic
    const [profileInfo, setProfileInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phoneNumber: "",
        dob: "",
        country: "",
        postalCode: "",
        city: "",
        provinceState: ""
    });
    
    const { firstname, lastname, email, address, phoneNumber, dob, country, postalCode, city, provinceState } = profileInfo;
    const logout = e => {
        console.log(e);
        e.preventDefault();
        localStorage.removeItem("token");   
        setAuth(false);
    };

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    useEffect(() => {
        let mounted = true;
        
        // retrieve user id from the bearer token
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;

        var endpoint = `http://localhost:1234/api/users/${userId}/profile`
        axios.get(endpoint, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                if (mounted) {
                    console.log(response.data);
                    // format the date                
                    setProfileInfo({
                        firstname: response.data.result.firstname,
                        lastname: response.data.result.lastname,
                        email: response.data.result.lastname,
                        dob: response.data.result.dob,
                        address: response.data.result.streetAddress,
                        phoneNumber: response.data.result.phoneNumber,
                        country: response.data.result.country,
                        provinceState: response.data.result.provinceState,
                        postalCode: response.data.result.postalCode,
                        city: response.data.result.city
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
            return () => mounted = false;
    }, []);

    const retrieveProfileInfo = () => {

        // retrieve user id from the bearer token
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;

        var endpoint = `http://localhost:1234/api/users/${userId}/profile`
        axios.get(endpoint, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                console.log(response.data);
                // format the date                
                setProfileInfo({
                    firstname: response.data.result.firstname,
                    lastname: response.data.result.lastname,
                    email: response.data.result.email,
                    dob: response.data.result.dob,
                    address: response.data.result.streetAddress,
                    phoneNumber: response.data.result.phoneNumber,
                    country: response.data.result.country,
                    provinceState: response.data.result.provinceState,
                    postalCode: response.data.result.postalCode,
                    city: response.data.result.city
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Fragment>
            <div id="dashboard-outer-container">
                <Sidebar setAuth = {setAuth} pageWrapId={'page-wrap'} outerContainerId={'dashboard-outer-container'} />
                <GlobalHeader setAuth={setAuth}/>
                <div id="page-wrap" className="container border">
                    <h1>Your Dashboard</h1>
                    <ul className="nav nav-pills nav-justified" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="Set" aria-selected="false">Settings</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">This is my home tab</div>
                        
                        {/* put this into component? */}
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="container pt-5">
                                <div className="row pt-3 justify-content-center">
                                    <img id="profile-pic" src={pic}></img>
                                </div>
                                <div className="row pt-3 justify-content-center">
                                    Profile Picture
                                </div>
                                <div className="row pt-3 justify-content-start">
                                    Personal Details
                                </div>
                                <div className="row pt-3 justify-content-center">
                                    <div className="col-3 text-center">
                                        <b>First Name</b>
                                        <br/>
                                        {firstname}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Last Name</b>
                                        <br/>
                                        {lastname}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Date of Birth</b>
                                        <br/>
                                        {dob}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Address</b>
                                        <br/>
                                        {address}
                                    </div>
                                </div>
                                <div className="row pt-3 justify-content-center">
                                <div className="col-3 text-center">
                                        <b>City</b>
                                        <br/>
                                        {city}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Province/State</b>
                                        <br/>
                                        {provinceState}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Postal Code</b>
                                        <br/>
                                        {postalCode}
                                    </div>
                                    <div className="col-3 text-center">
                                        <b>Country</b>
                                        <br/>
                                        {country}
                                    </div>
                                </div>
                                <div className="row pt-3 justify-content-start">
                                    Contact Information
                                </div>
                                <div className="row pt-3 justify-content-center">
                                    <div className="col-3 justify-content-center">
                                        <b>Email</b>
                                        <br/>
                                        {email}
                                    </div>
                                    <div className="col-3 justify-content-center">
                                        <b>Phone Number</b>
                                        <br/>
                                        {phoneNumber}
                                    </div>
                                </div>
                            </div>
                            {/* <button onClick = {retrieveProfileInfo}>hit server 2</button> */}
                        </div>

                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">This is my contact tab</div>
                    </div>
                    <button onClick = {e => logout(e)}>Logout</button>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Dashboard
