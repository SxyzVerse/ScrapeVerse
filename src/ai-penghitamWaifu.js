import axios from "axios";
import fs from "fs";

async function penghitamanMassal(options = {}) {
    if (!options.buffer) throw new Error("Buffer tidak boleh kosong!");
    if (!["need", "coklat", "hitam"].includes(options.filter)) return "Pilihan Filter Tidak Valid!";

    let payload = {
        imageData: options.buffer.toString("base64"),
        filter: options.filter
    };

    try {
        const res = await axios.post("https://negro.consulting/api/process-image", payload);

        if (res.data && res.data.status === "success" && res.data.processedImageUrl) {
            const imgRes = await axios.get(res.data.processedImageUrl, { responseType: "arraybuffer" });
            return Buffer.from(imgRes.data;
        } else {
            throw new Error("Gagal memproses gambar.");
        }
    } catch (err) {
        throw err;
    }
}

let t = fs.readFileSync("./t.png") 
penghitamanMassal({
 buffer: t, 
 filter: "hitam"
}).then(console.log)