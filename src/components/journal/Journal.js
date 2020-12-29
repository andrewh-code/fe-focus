import React, { Fragment, useState, useEffect} from 'react'
import '../../css/Journal.css';
import '../../App.css';
import GlobalHeader from '../GlobalHeader';
import Entry from './Entry';
import PreviousEntries from './PreviousEntries';
import Sidebar from '../Sidebar';

export default function Journal({setAuth}) {

    // const renderJournalEntryList = () => {
        
    //     var journalEntries = mockEntries.result.journalEntries;
    //     const output = "";
    //     resultOutput = journalEntries.map((entry, index) => {
    //         // var title = entry.title;
    //         // var content = entry.content;
    //         // var date = entry.date;
    //         return (
    //             // <div key={ index }>
    //             //     <div className="row border">
    //             //         <b>Date:</b> {date}
    //             //         <b>Title:</b> {title}
    //             //     </div>
    //             // </div>
    //             <h1>hi</h1>
    //         );
    //     });
    //     setResultOutput(resultOutput);
    // }
    

    return (
        <Fragment>
            <div id="journal-outer-container">
                <Sidebar setAuth = {setAuth} pageWrapId={'page-wrap'} outerContainerId={'journal-outer-container'} />
                <GlobalHeader setAuth={setAuth}/>
                <div id="page-wrap" className="container border shadow p-3">
                    <center><h1>Journal</h1></center>
                    <ul className="nav nav-pills nav-justified pt-3" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Write Entry</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">View Previous Entries</a>
                        </li>
                    </ul>
                    <div className="tab-content pt-3" id="myTabContent">
                        <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <Entry />
                        </div>
                        <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <PreviousEntries />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
