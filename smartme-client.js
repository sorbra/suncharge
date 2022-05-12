const axios = require('axios');
const dayjs = require('dayjs');
require('dotenv').config();

function timeStringNow()
{
    var now = dayjs();
    return now.format("YYYY-MM-DD h:mm:ss");
}

function getActivePower(username, password, interval_milliseconds) {
    return axios.get(
        process.env.SMARTME_DEVICES_URL, {
        auth: {
            username: username,
            password: password
        },
        timeout: process.env.TIMEOUT_SECONDS*1000
    })
    .then(response => console.log(timeStringNow() + ": " + response.data[0].ActivePower + " kwh"))
    .catch(error => console.log(timeStringNow() + ": ERROR: " + error.message))
    .finally(() => setTimeout(getActivePower, interval_milliseconds, username, password, interval_milliseconds));
}

getActivePower(
    process.env.SMARTME_USERNAME,
    process.env.SMARTME_PASSWORD,
    1000 * 60 * process.env.INTERVAL_MINUTES
);
