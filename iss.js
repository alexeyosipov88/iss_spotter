const request = require('request');
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });

};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } const flyover = JSON.parse(body).response;
    callback(null, flyover);
  });
};
const nextISSTimesForMyLocation = function(flyover, callback) {
  callback(null, flyover);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };