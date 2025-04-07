import axios from "axios";

const base = {
    api: "https://aifreebox.com/api/image-generator"
}

async function generateImage(option = {}) {
    try {
        let payload = {
            aspectRatio: option.ratio,
            slug: "ai-photo-generator",
            userPrompt: option.prompt
        }
        let { data: ahayy } = await axios.post(base.api, payload)
        if (!ahayy.status == "400") {
            return "Content Nsfw Berhasil Di Deteksi"
        }
        return ahayy
    } catch (error) {
        console.error(error.message)
        return null
    }
}

generateImage({
    ratio: "9:16",
    prompt: "a man in the shadow"
}).then(console.log)
