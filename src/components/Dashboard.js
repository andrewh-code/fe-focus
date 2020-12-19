import React, { Fragment } from 'react'
import Sidebar from './Sidebar';
import "../index.css";
import "../App.css";
import "../css/Sidebar.css";
import "../css/Dashboard.css";

import GlobalHeader from './GlobalHeader';

import pic from '../assets/images/473_mamoswine.png';

function Dashboard({setAuth}) {
    
    // test profile pic
    
    const logout = e => {
        console.log(e);
        e.preventDefault();
        localStorage.removeItem("token");   
        setAuth(false);
    };

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
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Other</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">This is my home tab</div>
                        
                        {/* put this into component? */}
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <img id="profile-pic" src={pic}></img>
                                </div>
                                <div className="row justify-content-center">
                                    Profile Picture
                                </div>
                                <div className="row justify-content-start">
                                    Personal Details
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-3 justify-content-center">
                                        First Name
                                    </div>
                                    <div className="col-3 justify-content-center">
                                        Last Name
                                    </div>
                                    <div className="col-3 justify-content-center">
                                        Date of Birth
                                    </div>
                                    <div className="col-3justify-content-center">
                                        Address
                                    </div>
                                </div>
                                <div className="row justify-content-start">
                                    Contact Information
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-3 justify-content-center">
                                        Email
                                    </div>
                                    <div className="col-3justify-content-center">
                                        Phone Number
                                    </div>
                                </div>
                            </div>

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
