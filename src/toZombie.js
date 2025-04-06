import axios from "axios";
import FormData from "form-data";

async function toZombie(imageUrl) {
  let { data } = await axios.get(imageUrl, { responseType: "arraybuffer" });
  let formData = new FormData();
  formData.append("photofile", data, { filename: "text.jpg"});
  formData.append("action", "upload");

  let { data: uploadResponse } = await axios.post("https://makemezombie.com/response.php", formData, {
    headers: { ...formData.getHeaders() },
  });

  let key = uploadResponse.key;
  console.log(`Key Dari Image: ${key}`)
  let result;

  while (true) {
    let checkData = new FormData();
    checkData.append("action", "check");
    checkData.append("image_id", key);

    let { data: response } = await axios.post("https://makemezombie.com/response.php", checkData);
    if (response.ready == "1") {
      result = response;
      break;
    }
  }

  return result;
}

toZombie("https://files.catbox.moe/2ui7z0.jpeg").then(console.log).catch(console.error);
