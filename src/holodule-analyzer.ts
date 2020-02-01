import * as client from 'cheerio-httpcli'

import * as LiveData from './live-data'
import * as Schedule from './schedule'

export function analyzeAndGetLiveData(domData:Cheerio) {
  let datas:LiveData.LiveData[] = [];
  domData.each((i,e)=>{
    datas.push({
      member: {
        name: e.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[0].data.trim(),
        icon: e.childNodes[1].childNodes[1].childNodes[5].childNodes[1].childNodes[1].childNodes[1].attribs['src']
      },
      streaming: {
        datetime: getDateFromTimeString(e.childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[2].data.trim()),
        url: e.attribs['href'],
        thumbnail: e.childNodes[1].childNodes[1].childNodes[3].childNodes[1].attribs['src'],
        now: (e.attribs['style'].indexOf('red')!=-1),
      },
    })
  })

  // TODO: 日付の処理を適切に
  // datas = datas.map((v,i,a)=>{
  //   v.streaming.datetime.setUTCDate(v.streaming.datetime.getUTCDate()-1)
  //   return v
  // })

  // datas = datas.map((v,i,a)=>{
  //   if(i+1===a.length) return v
  //   return v;
  // })

  return new Promise((resolve:(r:LiveData.LiveData[])=>void,_)=>{
    resolve(datas);
  });
}

function getDateFromTimeString(expr:string):Date {
  const hour = expr.split(':').map(x=>Number(x))[0];
  const minute = expr.split(':').map(x=>Number(x))[1];
  let res = new Date();
  res.setUTCHours(hour-9, minute, 0);
  return res;
}

Schedule.getScheduleDataAsync()
.then(analyzeAndGetLiveData)
.then(data=>{
  data.forEach((v,i,a)=>{
    if(v.streaming.now){
      console.log(v.streaming.datetime.toLocaleDateString('ja'));
    }
  })
})