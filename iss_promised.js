const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};
const fetchISSFlyOverTimes = (body) => {
  let {latitude, longitude} =  JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
module.exports = { nextISSTimesForMyLocation , printPassTimes};
