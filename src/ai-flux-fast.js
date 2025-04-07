import axios from "axios";

function queryFunction(prmpt) {
    return typeof prmpt === "string" && prmpt.trim().length > 0;
}

async function fluxGenerate(prmpt) {
    if (!queryFunction(prmpt)) {
        throw new Error("Prompt tidak valid.");
    }

    const payload = {
        prompt: prmpt
    };

    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; FluxAI-Client/1.0)",
        "Accept": "application/json"
    };

    try {
        const { data } = await axios.post("https://fluxai.pro/api/tools/fast", payload, {
            headers
        });
        return data;
    } catch (err) {
        console.error("Gagal melakukan permintaan:", err.message);
        return null;
    }
}

fluxGenerate("girl").then(console.log);
