import Axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { ServerResponse } from 'http';
import * as DateUtils from '../../utilities/date/dateutils';
import * as TokenUtils from '../../utilities/token/tokenutils';

import * as DashboardService from '../../service/dashboard/DashboardService';
import Dashboard from './Dashboard';

export default function ChildDashboard({firstname}) {
    
    const [name, setName] = useState("Andrew");
    const [memberSince, setMemberSince] = useState();
    const [latestEntryTitle, setLatestEntryTitle] = useState();
    const [latestEntryDate, setLatestEntryDate] = useState();
    const [token, setToken] = useState(TokenUtils.getToken());
    const [userId, setUserId] = useState(TokenUtils.getUserIdFromToken());

    const retrieveUserCreationDate = async (userId, token) => {
        let createdOnDate = await DashboardService.retrieveUserCreationDate(userId, token);
        createdOnDate = DateUtils.formatDate(createdOnDate);
        console.log("created on date is: " + createdOnDate)
        setMemberSince(createdOnDate);
    }

    const retrieveLastEntryDate = async (userId, token) => {
        let serverResponse = await DashboardService.retrieveLastEntry(userId, token);
        var latestEntryDate = serverResponse.date;
        latestEntryDate = DateUtils.formatDate(latestEntryDate);
        var latestEntryTitle = serverResponse.title;
        setLatestEntryDate(latestEntryDate);
        setLatestEntryTitle(latestEntryTitle);
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
