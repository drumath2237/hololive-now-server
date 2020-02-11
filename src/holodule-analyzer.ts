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

  // // 日付の処理
  let date_offset = -1;
  datas[0].streaming.datetime.setUTCDate(datas[0].streaming.datetime.getUTCDate()+date_offset);
  for(let i:number=1; i<datas.length; i++){
    if (getJapanHourFromDate(datas[i].streaming.datetime) < getJapanHourFromDate(datas[i-1].streaming.datetime)){
      date_offset++;
    }
    datas[i].streaming.datetime.setUTCDate(datas[i].streaming.datetime.getUTCDate()+date_offset);
  }

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

function getJapanHourFromDate(d:Date):number {
  return Number(d.toLocaleTimeString('ja').split(':')[0]);
}
