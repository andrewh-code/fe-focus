import axios from 'axios';


export const retrieveUserCreationDate = async (userId, token) => {
    
    const retrieveCreationDateEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/created`;
    try {

        const serverResponse = await axios.get(retrieveCreationDateEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        return serverResponse.data.result.createdOnDate;
    } catch (err) {
        console.log(err);
        console.log("error: " + err.response);
        return null;
    }
}

export const retrieveLastEntry = async (userId, token) => {
    const retrieveLatestEntryEndpoint = `http://localhost:1237/journal/api/users/${userId}/entries/latest`;

    try {
        const serverResponse = await axios.get(retrieveLatestEntryEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })

        return serverResponse.data;

    } catch (err) {
        console.log(err)
        console.log("error: " + err.response);
        return null;
    }

}


export const retrieveProfileInfo = async (userId, token) => {

    const userProfileEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/profile`;
    try {
        const serverResponse = await axios.get(userProfileEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })

        return serverResponse.data.result;

    } catch (err) {
        console.log(err);
        console.log("error: " + err.response);
        return null;
    }

}