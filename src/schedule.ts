import client = require('cheerio-httpcli');

export const url:string = 'https://schedule.hololive.tv/lives/hololive';

export async function getScheduleDataAsync() {
  return new Promise((resolve:(num:Cheerio)=>void, reject)=>{
    client.fetch(url).then(result=>{      
      resolve(
        result.$('div.holodule')
        .children('div.container')
        .children('.row')
        .children('div')
        .children('div.tab-content')
        .children('div#all')
        .children('div.container')
        .children('.row')
        .children('div')
        .children('div.row')
        .children('div')
        .children('a.thumbnail')
      );
    })
    .catch(error=>{
      console.log('error' + error);
    })
  })
}