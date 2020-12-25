import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

function PreviousEntries() {

    const [resultOutput, setResultOutput] = useState("");
    const [entryContent, setEntryContent] = useState("");
    const [entryIndex, setEntryIndex] = useState(null);
    const [mockEntries, setMockEntries] = useState();

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    async function retrieveJournalEntries(){

        const retrieveJournalEntriesEndpoint = `http://localhost:1237/journal/api/entries`
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;
    
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

    const updateEntry = (index, entry) => {
        var date = new Date(entry.date).toLocaleDateString();
        var entryOutput = 
            <div>
                <b>Date:</b> {date}
                <br/>
                <b>Title:</b> {entry.title}
                <br/>
                <b>feeling:</b> {entry.feeling}
                <br/>
                <b>entry:</b>
                <br/>
                {entry.content}
            </div>
        setEntryContent(entryOutput);
    }
    
    useEffect(() => {
        let mounted = true;
        var entries = "";
        if (mounted) {
            const fetchData = async () => {
                entries = await retrieveJournalEntries();
                console.log(entries);
                setMockEntries(entries);
                // do I need to iterate through the mockEntries now?
                printMock(entries);
            }
            fetchData();
        }
        
        return () => mounted = false;
    }, []);

    const printMock = async (entries) => {

        // iterate through entries
        var journalEntries = entries;
        var output = "";
        output = await Promise.all(journalEntries.map((entry, index) => {
            var title = entry.title;
            var content = entry.content;
            var date = new Date(entry.date).toLocaleDateString();
            return (
                <div key={ index }>
                    <div className="row border pt-2 pb-2 pl-2" onClick={() => updateEntry(index, entry)}>
                        <center><b>{date}</b></center>
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
                    <div className="col-3 pt-1 border justify-content-center">
                        <h5>Previous Entries</h5>
                    </div>
                    <div className="col-9 pt-1 border justify-content-center">
                        <h5>Journal Entry</h5>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        {resultOutput}

                    </div>

                    <div className="col-9">
                        {entryContent}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PreviousEntries