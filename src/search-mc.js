import axios from "axios";

async function search(q) {
    const { data: { result } } = await axios.get(
        `https://net-secondary.web.minecraft-services.net/api/v1.0/en-us/search?query=${encodeURIComponent(q)}&pageSize=24&category=None`,
        {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site"
            }
        }
    );
    return result;
}

search("spiring blue").then(console.log);
