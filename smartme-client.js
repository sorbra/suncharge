const axios = require('axios');
require('dotenv').config();

const username = process.env.SMARTME_USERNAME
const password = process.env.SMARTME_PASSWORD

async function getActivePower(username,password) {
    return axios.get('https://smart-me.com/api/Devices', {
        auth: {
            username: username,
            password: password
        }
    })
    .then(response => {
        return response.data[0].ActivePower;
    })
    .catch(function(error){
        throw(error);
    });
}

getActivePower(username,password)
.then( activePower => console.log(activePower) )
.catch( error => { console.log("OOPS: " + error.message);  } );
