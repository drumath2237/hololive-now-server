import client = require('cheerio-httpcli');

export const url:string = 'https://schedule.hololive.tv';

export async function getScheduleDataAsync() {
  return new Promise((resolve:(num:Cheerio)=>void, reject)=>{
    client.fetch(url).then(result=>{
      resolve(
        result.$('div#hololive')
        .children('div.container')
        .children('.row')
        .children()
        .children('.row')
        .children('div')
        .children('a.thumbnail')
      );
    })
    .catch(error=>{
      console.log('error' + error);
    })
  })
}