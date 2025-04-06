import axios from "axios";
import FormData from "form-data";

async function upscalePics(urlImage, options = {}) {
    let { data } = await axios.get(urlImage, {
        responseType: "arraybuffer"
    });
    
    if (!options.width || !options.height) return {
        msg: "Woilah Mana Options Width Atau Height Nya, Biar Ga Gepeng",
        error: true
    }

    let d = new FormData();
    d.append("desiredHeight", options.width);
    d.append("desiredWidth", options.height);
    d.append("anime", "false");
    d.append("outputFormat", "png");
    d.append("colorMode", "RGB");
    d.append("compressionLevel", "High");
    d.append("image_file", data, { filename: "image.jpg", contentType: "image/jpeg" });

    let headers = {
        headers: {
            ...d.getHeaders(),
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            "Origin": "https://upscalepics.com",
            "Referer": "https://upscalepics.com/"
        }
    };

    let { data: response } = await axios.post("https://api.upscalepics.com/upscale-free", d, headers);
    return response;
}

upscalePics("https://files.catbox.moe/slcgl1.jpg", {
    width: "3172",
    height: "4096"
}).then(console.log).catch(console.error);