import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

async function getCookieAndToken() {
    const res = await axios.get("https://kol.id/download-video/youtube", {
        headers: { "User-Agent": "Mozilla/5.0" }
    });

    const cookies = res.headers["set-cookie"].map(cookie => cookie.split(";")[0]).join("; ");
    const $ = cheerio.load(res.data);
    const token = $("input[name='_token']").val();

    return { cookies, token };
}

async function ytdl(url) {
    const { cookies, token } = await getCookieAndToken();
    const form = new FormData();
    
    form.append("url", url);
    form.append("_token", token);

    const headers = {
        "Cookie": cookies,
        ...form.getHeaders()
    };

    const { data } = await axios.post("https://kol.id/download-video/youtube", form, { headers });
    const $ = cheerio.load(data.html);

    const title = $(".small-title h2").text().trim();
    const channelInfo = $(".channel-info").text().trim();
    const channel = channelInfo.split(":")[1].trim().split(" ")[0];
    const thumbnail = $(".channel-info img").attr("src");
    const subscribers = $(".subscriber-info").text().replace(/[()]/g, "").trim();
    const duration = $(".time-details span").filter((_, el) => $(el).text().includes("Duration:")).text().replace("Duration: ", "").trim();

    const downloadLinks = [];
    $(".btn-contain a").each((_, el) => {
        const quality = $(el).text().trim();
        const qlty = quality.replace("Download ", "");
        const link = $(el).attr("href");
        if (link) downloadLinks.push({ qlty, link });
    });

    $(".dropdown-item").each((_, el) => {
        const quality = $(el).text().trim();
        const link = $(el).attr("href");
        if (link) downloadLinks.push({ quality, link });
    });

    return {
        title,
        channel,
        thumbnail,
        subscribers,
        duration,
        downloadLinks
    };
}

ytdl("https://youtube.com/watch?v=B7xai5u_tnk").then(console.log);