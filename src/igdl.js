import axios from "axios";
import FormData from "form-data";
import * as cheerio from "cheerio";

class InstagramDownloader {
  static async getCookieAndToken() {
    try {
      const response = await axios.get("https://kol.id/download-video/instagram", {
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const cookies = response.headers["set-cookie"]
        .map(cookie => cookie.split(";")[0])
        .join("; ");
      
      const $ = cheerio.load(response.data);
      const token = $("input[name='_token']").val();

      return { cookies, token };
    } catch (error) {
      throw new Error(`Failed to get cookies and token: ${error.message}`);
    }
  }

  static async download(url) {
    try {
      const { cookies, token } = await this.getCookieAndToken();
      
      const formData = new FormData();
      formData.append("url", url);
      formData.append("_token", token);

      const headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": cookies,
        ...formData.getHeaders()
      };

      const { data } = await axios.post(
        "https://kol.id/download-video/instagram",
        formData,
        { headers }
      );

      return this.parseResponse(data.html);
    } catch (error) {
      throw new Error(`Failed to download content: ${error.message}`);
    }
  }

  static parseResponse(html) {
    const $ = cheerio.load(html);
    const result = {
      title: $("#title-content-here h2").text().trim(),
      media: {}
    };

    const videoUrl = $(".btn-instagram.btn-primary").attr("href");
    if (videoUrl) {
      result.media = {
        type: "video",
        url: videoUrl
      };
    } else {
      const images = [];
      $(".dropdown-menu .dropdown-item").each((i, el) => {
        const imgUrl = $(el).attr("href");
        if (imgUrl) images.push(imgUrl);
      });

      result.media = images.length > 0 
        ? { type: "image", urls: images } 
        : { type: "unknown", urls: [] };
    }

    return result;
  }
}

// Usage example
(async () => {
  try {
    const result = await InstagramDownloader.download(
      "https://www.instagram.com/p/DHTsQa9TpCa/?igsh=ZDdza3J1N2tjZTRs"
    );
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();