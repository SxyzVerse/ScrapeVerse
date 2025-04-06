import axios from "axios";
import * as cheerio from "cheerio";

async function randomQuotesAnimes() {
   let { data } = await axios.get(`https://otakotaku.com/quote/feed`);
   let $ = cheerio.load(data);
   
   let quotes = [];

   $(".kotodama-list").each((i, el) => {
      let character = $(el).find(".char-name").text().trim();
      let anime = $(el).find(".anime-title").text().trim();
      let episode = $(el).find(".meta").text().trim();
      let quote = $(el).find(".quote").text().trim();
      let image = $(el).find(".char-img img").attr("data-src");
      let link = $(el).find("a.kuroi").attr("href");

      quotes.push({
         character,
         anime,
         episode,
         quote,
         image,
         link: `https://otakotaku.com${link}`
      });
   });

   return quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null;
}

randomQuotesAnimes().then(console.log).catch(console.error);