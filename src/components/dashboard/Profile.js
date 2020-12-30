import React, { useState, useEffect } from 'react'

import '../../App.css';

function Profile({profileInfo}) {

    const [inputs, setInputs ] = useState({
        firstname: profileInfo.firstname,
        lastname: "sup",
        email: "",
        address: "",
        phoneNumber: "",
        dob: "",
        country: "",
        postalCode: "",
        city: "",
        provinceState: ""
        // firstname: profileInfo.firstname,
        // lastname: profileInfo.lastname,
        // email: profileInfo.email,
        // address: profileInfo.address,
        // phoneNumber: profileInfo.phoneNumber,
        // dob: profileInfo.dob,
        // country: profileInfo.country,
        // postalCode: profileInfo.postalCode,
        // city: profileInfo.city,
        // provinceState: profileInfo.provinceState
    });
    
    const { firstname, lastname, email, address, phoneNumber, dob, country, postalCode, city, provinceState} = inputs;

    const [isEditDisabled, setIsEditDisabled] = useState(true);

    const makeEditable = (e) => {
        console.log(profileInfo);
        console.log(inputs);
        setIsEditDisabled(!isEditDisabled);
    };

    const changeValue = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        setInputs({
            firstname: profileInfo.firstname,
            lastname: profileInfo.lastname,
            email: profileInfo.email,
            address: profileInfo.address,
            phoneNumber: profileInfo.phoneNumber,
            dob: profileInfo.dob,
            country: profileInfo.country,
            postalCode: profileInfo.postalCode,
            city: profileInfo.city,
            provinceState: profileInfo.provinceState
        })
    }, []);

    return (
        <div className="container border shadow p-3">
            <div className="row pl-3 pt-3 justify-content-start">
                <p id="bold">Personal Details</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-3 text-center">
                    <b>First Name</b>
                    <br />
                    <input type="text"
                        disabled={isEditDisabled}
                        value={firstname}
                        name="firstname"
                        onChange={changeValue}
                    />
                </div>
                <div className="col-3 text-center">
                    <b>Last Name</b>
                    <br />
                    {lastname}
                </div>
                <div className="col-3 text-center">
                    <b>Date of Birth</b>
                    <br />
                    {dob}
                </div>
                <div className="col-3 text-center">
                    <b>Address</b>
                    <br />
                    {address}
                </div>
            </div>

            <div className="row pl-3 pt-3 justify-content-center">
                <div className="col-3 text-center">
                    <b>City</b>
                    <br />
                    {city}
                </div>
                <div className="col-3 text-center">
                    <b>Province/State</b>
                    <br />
                    {provinceState}
                </div>
                <div className="col-3 text-center">
                    <b>Postal Code</b>
                    <br />
                    {postalCode}
                </div>
                <div className="col-3 text-center">
                    <b>Country</b>
                    <br />
                    {country}
                </div>
            </div>
            
            <button id="as-link" onClick={makeEditable}>Edit Info</button>
        </div>
    )
}

export default Profile
