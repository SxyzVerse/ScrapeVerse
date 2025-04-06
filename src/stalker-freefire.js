import axios from "axios";

async function ffStalker(opt = {}) {
  if (!opt.id || !opt.region) {
    throw new Error("ID dan region wajib diisi!");
  }

  const url = `https://wlx-demon-info.vercel.app/profile_info?uid=${opt.id}&region=${opt.region}&key=FFwlx`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    return null;
  }
}

ffStalker({
  id: 12022250,
  region: "ind"
}).then(result => console.log(result));