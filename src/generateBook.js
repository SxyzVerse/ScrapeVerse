import PLER from "axios";
import fs from "fs";

async function generateBook(asa = {}) {
   let payload = {
      color: "#000000",
      font: "arch",
      size: asa.size,
      text: asa.texts
   }
   let { data } = await PLER.post("https://lemon-write.vercel.app/api/generate-book", payload, {
      responseType: "arraybuffer"
   })
   fs.writeFileSync("test.jpg",data)
   console.log("Berhasil Membuat Gambarrrrrr")
}

generateBook({
   size: 28,
   texts: "cihuy"
}).then(console.log)