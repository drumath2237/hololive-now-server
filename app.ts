import Schedule = require('./src/schedule');
import Analyzer = require('./src/holodule-analyzer')
import LiveData = require('./src/live-data')

import http = require('http')

let server = http.createServer();

let last_request = new Date();
let liver_data:LiveData.LiveData[];
Schedule.getScheduleDataAsync()
  .then(Analyzer.analyzeAndGetLiveData)
  .then(datas => liver_data = datas)
  .catch(err=>{console.log("error in app.ts at init: ", err);
  });

function getJapanMinuteFromDate(d: Date): number {
  return Number(d.toLocaleTimeString('ja').split(':')[1])
}
function getJapanHourFromDate(d: Date): number {
  return Number(d.toLocaleTimeString('ja').split(':')[0])
}

server.on('request', (req,res:http.ServerResponse)=>{
  if(Math.floor(getJapanMinuteFromDate(new Date())/15) != Math.floor(getJapanMinuteFromDate(last_request)/15)){
      console.log('get from holodule');
      Schedule.getScheduleDataAsync()
        .then(Analyzer.analyzeAndGetLiveData)
        .then(datas => {
          liver_data = datas
          if (req.url == '/api/schedule') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
            res.write(JSON.stringify(liver_data))
            res.end();
          } else if (req.url == '/api/schedule/now') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
            res.write(JSON.stringify(liver_data.filter(x => x.streaming.now)));
            res.end();
          }

        })
        .catch(err =>{
          console.log("error in app.ts: ", err);
          
        });
  } else if (getJapanHourFromDate(new Date()) != getJapanHourFromDate(last_request)) {
      console.log('get from holodule');
      Schedule.getScheduleDataAsync()
        .then(Analyzer.analyzeAndGetLiveData)
        .then(datas => {
          liver_data = datas
          if (req.url == '/api/schedule') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
            res.write(JSON.stringify(liver_data))
            res.end();
          } else if (req.url == '/api/schedule/now') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
            res.write(JSON.stringify(liver_data.filter(x => x.streaming.now)));
            res.end();
          }

        })
        .catch(err =>{
          console.log("error in app.ts: ", err);
          
        });

  }else{
    if (req.url == '/api/schedule') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
      res.write(JSON.stringify(liver_data))
      res.end();
    } else if (req.url == '/api/schedule/now') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' })
      res.write(JSON.stringify(liver_data.filter(x => x.streaming.now)));
      res.end();
    }
  }

  last_request = new Date()

})

server.listen(process.env.PORT||3000);
console.log("listen on 3000");