import React, { Fragment, useState, useEffect } from 'react'
import * as DateUtils from '../../utilities/date/dateutils';
import * as TokenUtils from '../../utilities/token/tokenutils';

import * as DashboardService from '../../service/dashboard/DashboardService';

export default function ChildDashboard({firstname}) {
    
    const [name, setName] = useState("");
    const [memberSince, setMemberSince] = useState();
    const [latestEntryTitle, setLatestEntryTitle] = useState();
    const [latestEntryDate, setLatestEntryDate] = useState();
    const [token, setToken] = useState(TokenUtils.getToken());
    const [userId, setUserId] = useState(TokenUtils.getUserIdFromToken());

    const retrieveUserCreationDate = async (userId, token) => {
        let createdOnDate = await DashboardService.retrieveUserCreationDate(userId, token);
        if (!createdOnDate){
            setMemberSince("");
        } else {
            createdOnDate = DateUtils.formatDate(createdOnDate);
            setMemberSince(createdOnDate);
        }
        
    }

    const retrieveLastEntryDate = async (userId, token) => {
        let serverResponse = await DashboardService.retrieveLastEntry(userId, token);
        if (!serverResponse){
            setLatestEntryTitle("");
            setLatestEntryDate("");
        } else {
            var latestEntryDate = serverResponse.date;
            latestEntryDate = DateUtils.formatDate(latestEntryDate);
            var latestEntryTitle = serverResponse.title;
            setLatestEntryDate(latestEntryDate);
            setLatestEntryTitle(latestEntryTitle);
        }
    }

    useEffect(() => {
        retrieveUserCreationDate(userId, token);
        retrieveLastEntryDate(userId, token);
    });

    return (
        <Fragment>
        <div className="container pt-3">

        </div>
        <div className="container pt-2 shadow p-3 mb-5 bg-white rounded">
            <h3>Welcome {firstname}</h3>

            <p id="bold">Member since:</p> <p> {memberSince}</p> 
            <p id="bold">Last Journal Entry: </p>
            <p id="bold">Date: </p><p>{latestEntryDate}</p>
            <p id="bold">Title: </p><p>{latestEntryTitle}</p>

        </div>
        </Fragment>
    )
}
