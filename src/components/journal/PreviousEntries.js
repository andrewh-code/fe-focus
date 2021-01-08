import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import * as DateUtils from '../../utilities/date';

function PreviousEntries() {
    const LIMIT = 10;
    const [resultOutput, setResultOutput] = useState("");
    const [entryContent, setEntryContent] = useState("");
    const [entryIndex, setEntryIndex] = useState(null);
    const [mockEntries, setMockEntries] = useState();
    const [entryOffset, setEntryOffset] = useState(0);

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    async function retrieveJournalEntries(entryOffset){

        var offset = entryOffset;
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;
        var retrieveJournalEntriesEndpoint = `http://localhost:1237/journal/api/users/${userId}/entries?limit=${LIMIT}`;
        if (offset > 0) {
            retrieveJournalEntriesEndpoint += `&offset=${offset}`;
        }
    
        var serverResponse = null;
        try {
            serverResponse = await axios({
                method: 'get',
                url: retrieveJournalEntriesEndpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            });
            console.log("axios entries: " + serverResponse.data);           
        } catch (err){
            console.log(err.error);
        }

        return serverResponse.data;
    }
    
    const retrieveNextSetOfEntries = () => {
        var offset = entryOffset + LIMIT;
        setEntryOffset(offset);
    }
    const retrievePrevSetOfEntries = () => {
        var offset = entryOffset - LIMIT;
        setEntryOffset(offset);
    }

    useEffect(() => {
        let mounted = true;
        var entries = "";
        if (mounted) {
            const fetchData = async () => {
                entries = await retrieveJournalEntries(entryOffset);
                console.log(entries);
                setMockEntries(entries);
                // do I need to iterate through the mockEntries now?
                printMock(entries);
            }
            fetchData();
        }
        
        return () => mounted = false;
    }, [entryOffset]);

    const updateEntry = (index, entry) => {
        
        var date = DateUtils.formatDate(entry.date);
        var entryOutput = 
            <div>
                <b>Date:</b> {date}
                <br/><br/>
                <b>Title:</b> {entry.title}
                <br/><br/>
                <b>feeling:</b> {entry.feeling}
                <br/><br/>
                <hr/>
                <b>entry:</b>
                <br/>
                {entry.content}
            </div>
        setEntryContent(entryOutput);
    }

    const printMock = async (entries) => {

        // iterate through entries
        var journalEntries = entries;
        var output = "";
        output = await Promise.all(journalEntries.map((entry, index) => {
            var title = entry.title;
            var content = entry.content;
            var date = DateUtils.formatDate(entry.date);
            
            
            return (
                <div key={ index }>
                    <div id="previous-entry-list" className="row pt-3 pb-3 pl-2 border-bottom" onClick={() => updateEntry(index, entry)}>
                        <b>Date:</b> {date}
                    </div>
                </div>
            );
        }));
        
        setResultOutput(output);
    };

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-3 pt-1 justify-content-center">
                        <center><h5>Previous Entries</h5></center>
                    </div>
                    <div className="col-9 pt-1 justify-content-center">
                        <center><h5>Journal Entry</h5></center>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        {resultOutput}

                    </div>
                    <div className="col-1">

                    </div>
                    <div className="col-8 border-left">
                        {entryContent}
                    </div>
                </div>
                <div className="row">
                    <button id="as-link" onClick={retrievePrevSetOfEntries}>&lt;&lt;</button>
                    <button id="as-link" onClick={retrieveNextSetOfEntries}>&gt;&gt;</button>
                </div>
            </div>
        </Fragment>
    )
}

export default PreviousEntries