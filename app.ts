import Schedule = require('./src/schedule');

Schedule.getScheduleDataAsync().then(data=>{
  console.log(data);
})