import axios from "axios";
import * as cheerio from "cheerio";

async function gifsSearch(q) {
    try {
        const searchUrl = `https://tenor.com/search/${q}-gifs`;
        const { data } = await axios.get(searchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
        });
        
        const $ = cheerio.load(data);
        const results = [];

        $("figure.UniversalGifListItem").each((i, el) => {
            const $el = $(el);
            const img = $el.find("img");  
            const gifUrl = img.attr("src");
            const alt = img.attr("alt") || "No description";
            const detailPath = $el.find("a").first().attr("href"); 
            
            if (gifUrl && gifUrl.endsWith('.gif') && detailPath) {
                results.push({
                    gif: gifUrl,
                    alt,
                    link: "https://tenor.com" + detailPath
                });
            }
        });

        return results;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return [];
    }
}

gifsSearch("pocoyo").then(console.log).catch(console.error);