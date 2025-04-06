import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

const b = {
   prefixUrl: "https://tiktokio.com/id/pengunduh-douyin/",
   apiUrl: "https://tiktokio.com/api/v1/tk-htmx"
};

const headers = {
   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
   "Accept-Encoding": "gzip, deflate, br",
   "Accept-Language": "en-US,en;q=0.9",
   "Cache-Control": "max-age=0",
   "Connection": "keep-alive",
   "Host": "tiktokio.com",
   "Referer": "https://tiktokio.com/",
   "Sec-Fetch-Dest": "document",
   "Sec-Fetch-Mode": "navigate",
   "Sec-Fetch-Site": "same-origin",
   "Upgrade-Insecure-Requests": "1",
   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};

const tiktokio = {
   async getPrefix() {
      let { data } = await axios.get(b.prefixUrl, { headers, timeout: 10000 });
      let $ = cheerio.load(data);
      return $('input[name="prefix"]').val();
   },

   async dl(videoUrl) {
      let prefix = await this.getPrefix();
      let form = new FormData();
      form.append("prefix", prefix);
      form.append("vid", videoUrl);

      let postHeaders = {
         ...headers,
         ...form.getHeaders()
      };

      let { data } = await axios.post(b.apiUrl, form, { headers: postHeaders, timeout: 10000 });

      let $ = cheerio.load(data);
      let title = $("#tk-search-h2").text().trim();
      let thumbnail = $("img").attr("src");

      let download = {};
      $(".tk-down-link a").each((_, el) => {
         let text = $(el).text().trim().toLowerCase();
         let href = $(el).attr("href");
         if (text.includes("without watermark hd")) download["hd"] = href;
         else if (text.includes("without watermark")) download["no_watermark"] = href;
         else if (text.includes("watermark")) download["with_watermark"] = href;
         else if (text.includes("mp3")) download["mp3"] = href;
      });

      return { title, thumbnail, download };
   }
};

tiktokio.dl("https://v.douyin.com/QW8IOEM_QbU/")
   .then(console.log)
   .catch(console.error);