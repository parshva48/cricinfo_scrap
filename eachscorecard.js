let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
const { createInflate } = require("zlib");
//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-royal-challengers-bangalore-55th-match-1216505/full-scorecard";
function eachscorecard(url)
{
    request(url,cb);
}


function cb(error,header,html)
{
   let cheerioselector=cheerio.load(html);
   let twoteamstable=cheerioselector(".Collapsible");
   let extrainfo=cheerioselector("div .description")[0];
   extrainfo=cheerioselector(extrainfo).text().trim();
   console.log(extrainfo);
   for(let i=0;i<twoteamstable.length;i++)
   {
       let teamname=cheerioselector(twoteamstable[i]).find(".header-title.label").text().split("INNINGS")[0].trim();
       let oppteamname="";
       if(i==0)
       {
            oppteamname=cheerioselector(twoteamstable[1]).find(".header-title.label").text().split("INNINGS")[0].trim();
       }
       else{
                oppteamname=cheerioselector(twoteamstable[0]).find(".header-title.label").text().split("INNINGS")[0].trim();
       }
       MakeDir(teamname);
       let folderpath=path.join("F:\\Webdev\\WebScrapping\\cricinfo",teamname);
       let batsmentable=cheerioselector(twoteamstable[i]).find(".table.batsman");
       let rows=cheerioselector(batsmentable).find("tr");
       for(let i=0;i<rows.length;i++)
       {
           let cols=cheerioselector(rows[i]).find("td");
           if(cols.length>=5)
           {
               
               let run=cheerioselector(cols[2]).text().trim();
               let ball=cheerioselector(cols[3]).text().trim();
               let fou=cheerioselector(cols[5]).text().trim();
               let six=cheerioselector(cols[6]).text().trim();
               let srrate=cheerioselector(cols[7]).text().trim();
               let playername=cheerioselector(cols[0]).text().trim();
               playername=Corrected(playername);
               let obj={
                runs:run,
                balls:ball,
                fours:fou,
                sixes:six,
                strikerate:srrate,
                info_about_match:extrainfo,
                opponent:oppteamname
            };
               createfile(path.join(folderpath,playername+".json"),obj);
            
              
           }
       }

   }
}
function createfile(pth,object)
{
    if(fs.existsSync(pth)==false)
    {
        fs.openSync(pth,"w");
        let arr=[];
        arr.push(object);
        let contentinjson=JSON.stringify(arr);
              fs.writeFileSync(pth,contentinjson);

    }
    else{
           let contentinjson=fs.readFileSync(pth);
           let arr=JSON.parse(contentinjson);
           arr.push(object);
           contentinjson=JSON.stringify(arr);
           fs.writeFileSync(pth,contentinjson);
    }

}
function Corrected(name)
{
    let res="";
    for(let i=0;i<name.length;i++)
    {
        let ch=name.charAt(i);
        if(ch>='a' && ch<='z' || ch>='A' && ch<='Z' || ch==' ')
        {
            res+=ch;
        }
        else
        break;
    }
    return res;
}
function MakeDir(dirname)
{
    let pth=path.join("F:\\Webdev\\WebScrapping\\cricinfo",dirname);
    
    if(fs.existsSync(pth)==false)
    {
       
        fs.mkdirSync(pth);
    }
    
}
module.exports={
    wrapper:eachscorecard
}