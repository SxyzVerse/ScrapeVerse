import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

const base = {
    _token: "https://snapvn.com/id",
    _dl: "https://snapvn.com/fetch"
}

class Threads {
    static async getToken() {
        const res = await axios.get(base._token, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

        const cookies = res.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') || "";
        const $ = cheerio.load(res.data);
        const token = $("input[name='_token']").val();

        return { token, cookies };
    }

    static async download(url) {
        const { token, cookies } = await this.getToken();

        const form = new FormData();
        form.append("_token", token);
        form.append("url", url);

        const headers = {
            ...form.getHeaders(),
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Cookie": cookies,
            "Referer": base._token
        };

        const { data } = await axios.post(base._dl, form, { headers });
        let $ = cheerio.load(data.data)

        let username = $('.d-flex.align-items-center strong').text().trim()
        let like = $('.d-flex.align-items-center small').text().replace('Like:', '').trim()
        let caption = $('.col-md-12 .markdown').text().trim()
        let thumbnail = $('.card-img-top').attr('data-src')
        
        let downloadList = []
        $('select[name="url"] option').each((i, el) => {
          downloadList.push($(el).val())
        })
        
        return { username, like, caption, thumbnail, downloadList }
    }
}

Threads.download("https://www.threads.net/@jh0yc3llynn3/post/DIX5IH3T1jG?xmt=AQGzYWGbVhn94k6Y6Gq9q07ID4tO5-c3UDb63-LpeDkxnA")
    .then(console.log)
    .catch(console.error);
