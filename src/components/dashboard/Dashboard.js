import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../Sidebar';
import "../../index.css";
import "../../App.css";
import "../../css/Sidebar.css";
import "../../css/Dashboard.css";
import axios from 'axios';
import Profile from './Profile';
import GlobalHeader from '../GlobalHeader';
import * as DateUtils from '../../utilities/date/dateutils';
import pic from '../../assets/images/639_terrakion.png';
import ChildDashboard from './ChildDashboard';
import * as DashboardService from '../../service/dashboard/DashboardService';

function Dashboard({setAuth}) {
    
    const [isProfileUpdateSuccess, setIsProfileUpdateSuccess] = useState(false);
    const [isContactUpdateSuccess, setIsContactUpdateSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

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
    const [isProfileEditDisabled, setIsProfileEditDisabled] = useState(true);
    const [isContactEditDisabled, setIsContactEditDisabled] = useState(true);

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    const logout = e => {
        console.log(e);
        e.preventDefault();
        localStorage.removeItem("token");   
        setAuth(false);
    };

    const changeValue = (e) => {
        setProfileInfo({...profileInfo, [e.target.name]: e.target.value});
    }

    const makeProfileEditable = (e) => {
        setIsProfileEditDisabled(!isProfileEditDisabled);
    };
    const makeContactInfoEditable = (e) => {
        setIsContactEditDisabled(!isContactEditDisabled);
    };

    const saveContactAndMakeUneditable = (e) => {
        setIsContactEditDisabled(true);

        const token = localStorage.getItem("token");
        if (token) {
            const decryptedTokenInfo = parseToken(token);
            const userId = decryptedTokenInfo.userId;
            const userContactEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/profile/contact`;

            const data = {
                phoneNumber: phoneNumber
            };

            axios.put(userContactEndpoint, 
                data,
                {
                    headers: {
                        'authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                console.log(response);
                setIsContactUpdateSuccess(true);
                setSuccessMsg("Successfully updated user contact information.");
            }).catch(err => {
                console.log(err);
                setIsContactUpdateSuccess(false);
                setSuccessMsg("Unable to update user contact information. Please try again...");
            });
        } else {
            console.log("bearer token not found...");
            setIsContactUpdateSuccess(false);
            setErrorMsg("Unable to update user contact information. Please try again...");
        }

    };

    const saveProfileUpdateAndMakeUneditable = (e) => {
        setIsProfileEditDisabled(true);

        const token = localStorage.getItem("token");
        if (token) {
            const decryptedTokenInfo = parseToken(token);
            const userId = decryptedTokenInfo.userId;
            const userProfileEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/profile`;

            const data = {
                firstname: firstname,
                lastname: lastname,
                dob: dob,
                streetAddress: address,
                city: city,
                provinceState: provinceState,
                postalCode: postalCode,
                country: country
            };

            axios.put(userProfileEndpoint, 
                data,
                {
                    headers: {
                        'authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                console.log(response);
                setIsProfileUpdateSuccess(true);
                setSuccessMsg("Successfully updated user profile information.");
            }).catch(err => {
                console.log(err);
                setIsProfileUpdateSuccess(false);
                setSuccessMsg("Unable to update user profile information. Please try again...");
            });
        } else {
            console.log("bearer token not found...");
            setIsProfileUpdateSuccess(false);
            setErrorMsg("Unable to update user profile information. Please try again...");
        }
    };

    useEffect(() => {
        let mounted = true;
        
        // retrieve user id from the bearer token
        const token = localStorage.getItem("token");
        if (token) {
            const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;

        
        // const userProfileEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/profile`;
        async function fetchData() {
            const serverResponse = await DashboardService.retrieveProfileInfo(userId, token);
            if (mounted) {
                if (!serverResponse){
                    setProfileInfo("")
                } else {
                    setProfileInfo({
                        firstname: serverResponse.firstname,
                        lastname: serverResponse.lastname,
                        email: serverResponse.lastname,
                        dob: serverResponse.dob,
                        address: serverResponse.streetAddress,
                        phoneNumber: serverResponse.phoneNumber,
                        country: serverResponse.country,
                        provinceState: serverResponse.provinceState,
                        postalCode: serverResponse.postalCode,
                        city: serverResponse.city
                    });
                }
            }
        }
        fetchData();
        }
        return () => mounted = false;
    }, []);

    return (
        <Fragment>
            <div id="dashboard-outer-container">
                <Sidebar setAuth = {setAuth} pageWrapId={'page-wrap'} outerContainerId={'dashboard-outer-container'} />
                <GlobalHeader setAuth={setAuth}/>
                <div id="page-wrap" className="container shadow p-3 mb-5 bg-white rounded">
                    <center><h1>Your Dashboard</h1></center>
                    <ul className="nav nav-pills nav-justified pt-3" id="myTab" role="tablist">
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
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <ChildDashboard firstname={firstname}/>
                        </div>

                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="container pt-5">
                                <div className="row pt-3 justify-content-center">
                                    <img id="profile-pic" src={pic}></img>
                                </div>

                                <div className="row pt-3 justify-content-center">
                                    Profile Picture
                                </div>
                                
                                <div className="row pt-3"></div>

                                {/* <Profile profileInfo={profileInfo}/> */}
                                <div className="container border shadow p-3">
                                    <div className="row pl-3 pt-3 justify-content-start">
                                        <p id="bold">Personal Details</p>
                                    </div>

                                    <div className="row pl pt-3 justify-content-center">
                                        <div className="col-3 justify-content-center">
                                        <b>First Name</b>
                                        <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={firstname}
                                                name="firstname"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Last Name</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={lastname}
                                                name="lastname"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Date of Birth</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={DateUtils.formatDate(dob)}
                                                name="dob"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Address</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={address}
                                                name="address"
                                                onChange={changeValue}
                                            />
                                        </div>
                                    </div>
                                    <div className="row pl-3 pt-3 justify-content-center">
                                        <div className="col-3 justify-content-center">
                                            <b>City</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={city}
                                                name="city"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Province/State</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={provinceState}
                                                name="provinceState"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Postal Code</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={postalCode}
                                                name="postalCode"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Country</b>
                                            <br />
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isProfileEditDisabled}
                                                value={country}
                                                name="country"
                                                onChange={changeValue}
                                            />
                                        </div>
                                    </div>
                                    {!isProfileEditDisabled ?
                                    <div className="row pt-3 justify-content-center">
                                        <button id="as-link" onClick={makeProfileEditable}>Edit Profile Info</button> 
                                        <button id="as-link" onClick={saveProfileUpdateAndMakeUneditable}>Save Profile Info</button>
                                    </div> : 
                                    <div className="row pt-3 justify-content-center">
                                        <button id="as-link" onClick={makeProfileEditable}>Edit Profile Info</button>
                                    </div>}
                                    <div>
                                        { !isProfileUpdateSuccess ? <p id="error">{errorMsg}</p> : <p id="success">{successMsg}</p>}
                                    </div>
                                </div>
                                <div className="row pt-3"></div>
                                <div className="container border shadow p-3">
                                    <div className="row pl-3 pt-3 justify-content-start">
                                        <p id="bold">Contact Information</p>
                                    </div>
                                    <div className="row pl-3 justify-content-center">
                                        <div className="col-3 justify-content-center">
                                            <b>Email</b><br/>
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isContactEditDisabled}
                                                value={email}
                                                name="email"
                                                onChange={changeValue}
                                            />
                                        </div>
                                        <div className="col-3 justify-content-center">
                                            <b>Phone Number</b>
                                            <input type="text"
                                                id="profile-input"
                                                disabled={isContactEditDisabled}
                                                value={phoneNumber}
                                                name="phoneNumber"
                                                onChange={changeValue}
                                            />
                                        </div>
                                    </div>
                                    {!isContactEditDisabled ?
                                    <div className="row pt-3 justify-content-center">
                                        <button id="as-link" onClick={makeContactInfoEditable}>Edit Contact Info</button> 
                                        <button id="as-link" onClick={saveContactAndMakeUneditable}>Save Contact Info</button>
                                    </div> : 
                                    <div className="row pt-3 justify-content-center">
                                        <button id="as-link" onClick={makeContactInfoEditable}>Edit Contact Info</button>
                                    </div>}
                                    <div>
                                        { !isContactUpdateSuccess ? <p id="error">{errorMsg}</p> : <p id="success">{successMsg}</p>}
                                    </div>
                                </div>
                            </div>
                            {/* <button onClick = {retrieveProfileInfo}>hit server 2</button> */}
                        </div>
                        
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">This is my contact tab</div>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Dashboard
