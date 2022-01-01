let request=require("request");
let cheerio=require("cheerio");
let obj=require("./allmatches");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request(url,cb);

function cb(error,header,html)
{
   let cheerioselector=cheerio.load(html);
   let viewallresult=cheerioselector(".label.blue-text.blue-on-hover")[0];
    let link=cheerioselector(viewallresult).attr("href");
    let fulllink="https://www.espncricinfo.com"+link;
    obj.wrapper(fulllink);
}