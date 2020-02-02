import Schedule = require('./src/schedule');
import Analyzer = require('./src/holodule-analyzer')
import LiveData = require('./src/live-data')

import http = require('http')

let server = http.createServer();
server.on('request', (req,res:http.ServerResponse)=>{
  console.log(req.url)
  if(req.url=='/api/schedule') {
    res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'})
    Schedule.getScheduleDataAsync()
    .then(Analyzer.analyzeAndGetLiveData)
    .then(datas=>{
      res.write(unescape(JSON.stringify(datas)));
      res.end();
    })
  }else if(req.url=='/api/schedule/now') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    Schedule.getScheduleDataAsync()
      .then(Analyzer.analyzeAndGetLiveData)
      .then(datas => {
        res.write(unescape(JSON.stringify(datas.filter(x=>x.streaming.now))));
        res.end();
      })
  }
})

server.listen(3000);
console.log("listen on 3000");