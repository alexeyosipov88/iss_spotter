const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
// const {fetchCoordsByIP} = require('./iss');
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchISSFlyOverTimes(coordinates, (error, flyover) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      } nextISSTimesForMyLocation(flyover, (error, nextpasses) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        } printPassTimes(nextpasses);
      });
    });
  });


});

