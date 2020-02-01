import client = require('cheerio-httpcli');

const url:string = 'https://schedule.hololive.tv';

export async function getScheduleDataAsync () {
  let datas = [];

  await client.fetch(url)
  .then(result=>{
    result.$('div#hololive')
    .children('.container')
    .children('.row')
    .children()
    .children('.row')
    .children('div')
    .children('a.thumbnail')
    .children('.container')
    .children('.row')
    .children('div')
    .children('.row')
    .children('.datetime')
    .each((id,elm)=>{
      datas[id] = {
        date: elm.childNodes[2].data.trim(),
        name: undefined
      }
    })
    .parent()
    .children('.text-right')
    .each((index, element)=>{
      datas[index].name = element.childNodes[0].data.trim();
    })
  })
  return datas;
}