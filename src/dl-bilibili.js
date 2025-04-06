import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

class CapCut {
    async getToken() {
        const { data: html } = await axios.get("https://snapfrom.com/id/pengunduh-video-capcut/");
        const $ = cheerio.load(html);
        return $("#token").val();
    }

    async download(url) {
        if (!url) throw new Error("Masukkan URL CapCut.");

        try {
            const token = await this.getToken();
            const formData = new FormData();
            formData.append("url", url);
            formData.append("token", token);

            const { data } = await axios.post(
                "https://snapfrom.com/wp-json/aio-dl/video-data/",
                formData,
                { headers: { ...formData.getHeaders() } }
            );

            return data;
        } catch (error) {
            console.error(`Terjadi kesalahan: ${error.message}`);
        }
    }
}

// Usage
(async () => {
    const capcut = new CapCut();
    await capcut.download("https://www.capcut.com/templates/7445547192938450229")
        .then(dataDl => {
            console.log(dataDl);
        });
})();