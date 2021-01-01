import Axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { ServerResponse } from 'http';

export default function ChildDashboard() {
    
    const [name, setName] = useState("Andrew");
    const [memberSince, setMemberSince] = useState();
    const [latestEntryTitle, setLatestEntryTitle] = useState();
    const [latestEntryDate, setLatestEntryDate] = useState();

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    const retrieveUserCreationDate = () => {

        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;
        const retrieveCreationDateEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/created`;

        axios({
            method: 'get',
            url: retrieveCreationDateEndpoint,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(serverResponse => {
            console.log(serverResponse);
            var memberSince = serverResponse.data.result.createdOnDate;
            memberSince = new Date(memberSince).toLocaleDateString();
            setMemberSince(memberSince)
        })
        .catch(err => {
            console.log(err)
            console.log("error: " + err.response);
        });
    }

    const retrieveLastEntryDate = () => {
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;
        const retrieveLatestEntryEndpoint = `http://localhost:1237/journal/api/users/${userId}/entries/latest`;

        axios({
            method: 'get',
            url: retrieveLatestEntryEndpoint,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(serverResponse => {
            console.log(serverResponse);
            var latestEntryDate = serverResponse.data.date;
            latestEntryDate = new Date(latestEntryDate).toLocaleDateString();
            var latestEntryTitle = serverResponse.data.title;

            setLatestEntryDate(latestEntryDate);
            setLatestEntryTitle(latestEntryTitle);
        })
        .catch(err => {
            console.log(err)
            console.log("error: " + err.response);
        });
    }

    
    useEffect(() => {
        retrieveUserCreationDate();
        retrieveLastEntryDate();
    });

    return (
        <Fragment>
        <div className="container pt-3">

        </div>
        <div className="container pt-2 shadow p-3 mb-5 bg-white rounded">
            <h3>Welcome {name}</h3>

            <p id="bold">Member since:</p> <p> {memberSince}</p> 
            <p id="bold">Last Journal Entry: </p>
            <p id="bold">Date: </p><p>{latestEntryDate}</p>
            <p id="bold">Title: </p><p>{latestEntryTitle}</p>

        </div>
        </Fragment>
    )
}
