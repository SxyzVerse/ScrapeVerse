import axios from "axios";
import fs from "fs";

async function ghibli(buffer) {
  try {
    const base64 = buffer.toString("base64");
    const payload = { imageUrl: `data:image/jpeg;base64,${base64}` };

    const response = await axios.post(
      "https://ghibliai-worker.ahmadjandal.workers.dev/generate",
      payload,
      { responseType: "json" }
    );

    const result = response.data.result;
    const base64Data = result.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    fs.writeFileSync("ghibli-result.png", imageBuffer);
    return "Gambar berhasil disimpan sebagai ghibli-result.png";

  } catch (error) {
    console.error("Error:", error);
    return "Gagal memproses gambar";
  }
}

const imageBuffer = fs.readFileSync("./test.jpg");
ghibli(imageBuffer).then(console.log);