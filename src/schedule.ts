import client = require('cheerio-httpcli');

export const url:string = 'https://schedule.hololive.tv';

// export async function getScheduleDataAsync () {
//   let datas = [];

//   await client.fetch(url)
//   .then(result=>{

//     console.log(result.$('div#hololive').children('.container').html());
    
    
//     result.$('div#hololive')
//     .children('.container')
//     .children('.row')
//     .children()
//     .children('.row')
//     .children('div')
//     .children('a.thumbnail') // ここで各ライブ情報
//     .children('.container')
//     .children('.row')
//     .children('div')
//     .children('.row')
//     .children('.datetime')
//     .each((id,elm)=>{
//       datas[id] = {
//         date: elm.childNodes[2].data.trim(),
//         name: undefined
//       }
//     })
//     .parent()
//     .children('.text-right')
//     .each((index, element)=>{
//       datas[index].name = element.childNodes[0].data.trim();
//     })
//   })
//   return datas;
// }

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