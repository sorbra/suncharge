const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

const username = process.env.SMARTME_USERNAME;
const password = process.env.SMARTME_PASSWORD;
const interval_minutes = process.env.INTERVAL_MINUTES;

async function getActivePower(username, password) {
    return axios.get('https://smart-me.com/api/Devices', {
        auth: {
            username: username,
            password: password
        }
    })
    .then(response => {
        var activePower = response.data[0].ActivePower;
        var now = dayjs();
        console.log(now.format("YYYY-MM-DD h:mm:ss") + ": " + activePower + "kwh")
    })
    .catch(function (error) {
        var now = dayjs();
        console.log(now.format("YYYY-MM-DD h:mm:ss") + ": " + error.message); 
    });
}

getActivePower(username, password);
setInterval(getActivePower, 1000 * 60 * interval_minutes, username, password);
