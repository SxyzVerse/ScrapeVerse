import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

const ssyoutube = {
  dl: async (u) => {
    let d = new FormData();
    d.append("videoURL", u);
    
    let headers = {
      ...d.getHeaders(),
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "DNT": "1",
      "Host": "ssyoutube.online",
      "Origin": "https://ssyoutube.online",
      "Pragma": "no-cache",
      "Referer": "https://ssyoutube.online/",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    };

    let { data } = await axios.post(
      "https://ssyoutube.online/yt-video-detail/",
      d,
      { headers }
    );
    
    let $ = cheerio.load(data);
    
    const videoInfo = {
      title: $('.videoTitle').text().trim(),
      duration: $('.duration label').text().replace('Duration: ', '').trim(),
      views: $('.view label').text().trim(),
      likes: $('.like label').text().trim(),
      comments: $('.comment label').text().trim(),
      thumbnail: $('.thumbnail').attr('src')
    };
    
    const downloadOptions = [];
    
    $('.format-section tr').each((i, el) => {
      const row = $(el);
      const quality = row.find('td:first-child').text().trim();
      const size = row.eq(1).text().trim();
      const url = row.find('button').attr('data-url');
      
      if (quality && url) {
        downloadOptions.push({
          quality: quality.replace(/\s+/g, ' '),
          size,
          url,
          hasAudio: row.find('button').attr('data-has-audio') === 'true',
          type: quality.includes('M4A') ? 'audio' : 'video'
        });
      }
    });
    
    return {
      videoInfo,
      downloadOptions
    };
  }
};

// Example usage
ssyoutube.dl("https://youtube.com/watch?v=B7xai5u_tnk")
  .then(console.log);
