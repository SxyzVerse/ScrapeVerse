import axios from "axios";
import * as cheerio from "cheerio";
import FormData from "form-data";

async function generateImageStyleLukisan(prmpt) {
    let d = new FormData();
    d.append("qq", prmpt);
    let headers = {
        headers: {
            ...d.getHeaders()
        }
    };
    let { data: ress } = await axios.post("https://1010clipart.com/", d, headers);
    let $ = cheerio.load(ress);
    
    let images = [];
    $('#image-container img').each((i, el) => {
        let src = $(el).attr('src');
        if (src) images.push({ img: src });
    });
    return images;
}

