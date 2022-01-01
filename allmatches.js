let request=require("request");
let cheerio=require("cheerio");
const { object } = require("assert-plus");
let obj=require("./eachscorecard");

function allmatch(url)
{
    request(url,cb);
}



function cb(error,header,html)
{
   let cheerioselector=cheerio.load(html);
   let allblocks=cheerioselector(".btn.btn-sm.btn-outline-dark.match-cta");
   for(let i=2;i<allblocks.length;i=i+4)
   {
      let eachscorecardlink=cheerioselector(allblocks[i]).attr("href");
      let fulllink="https://www.espncricinfo.com"+eachscorecardlink;
      obj.wrapper(fulllink);
   }
}

module.exports={
    wrapper:allmatch
}