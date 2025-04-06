import axios from "axios";
import * as cheerio from "cheerio";
import FormData from "form-data";

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const gpt = {
    getNonce: async () => {
        try {
            const { data } = await axios.get("https://chatgpt4o.one/", {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                    "Upgrade-Insecure-Requests": "1",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1"
                }
            });
            const $ = cheerio.load(data);
            return $("div.wpaicg-chat-shortcode").attr("data-nonce") || null;
        } catch (error) {
            console.error("Error fetching nonce:", error.message);
            return null;
        }
    },

    chat: async (msg) => {
        try {
            const nonce = await gpt.getNonce();
            if (!nonce) throw new Error("Failed to get nonce.");

            const clientId = generateRandomString(10);
            const formData = new FormData();
            formData.append("_wpnonce", nonce);
            formData.append("post_id", 11);
            formData.append("url", "https://chatgpt4o.one/");
            formData.append("action", "wpaicg_chat_shortcode_message");
            formData.append("message", msg);
            formData.append("bot_id", 0);
            formData.append("chatbot_identity", "shortcode");
            formData.append("wpaicg_chat_history", JSON.stringify([]));
            formData.append("wpaicg_chat_client_id", clientId);

            const { data } = await axios.post(
                "https://chatgpt4o.one/wp-admin/admin-ajax.php",
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Accept": "application/json, text/javascript, */*; q=0.01",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-US,en;q=0.9",
                        "Origin": "https://chatgpt4o.one",
                        "Referer": "https://chatgpt4o.one/",
                        "X-Requested-With": "XMLHttpRequest",
                        "Connection": "keep-alive"
                    }
                }
            );
            return data;
        } catch (error) {
            console.error("Error sending message:", error.message);
            return null;
        }
    }
};

export default gpt;

gpt.chat("hai").then(console.log)