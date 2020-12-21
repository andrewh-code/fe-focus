import React, { Fragment, useState} from 'react'
import '../../css/Journal.css';
import '../../App.css';
import GlobalHeader from '../GlobalHeader';
import Entry from './Entry';
import PreviousEntries from './PreviousEntries';

export default function Journal() {

    return (
        <Fragment>
            <GlobalHeader/>
            <div className="container border shadow p-3 mb-5 bg-white rounded">
            <center><h1>Journal</h1></center>
                <ul class="nav nav-pills nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Write Entry</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">View Previous Entries</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <Entry />
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <PreviousEntries />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
