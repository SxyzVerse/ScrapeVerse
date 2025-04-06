import axios from "axios";

const base = {
  submitDownload: "https://api.grabtheclip.com/submit-download",
  getDownload: "https://api.grabtheclip.com/get-download/",
  submitInfo: "https://api.grabtheclip.com/submit-info"
};

const grabTheClip = {
  getInfo: async (url) => {
    const payload = { url };
    const { data: { task_id } } = await axios.post(base.submitInfo, payload);
    let data;
    do {
      const response = await axios.get(`https://api.grabtheclip.com/get-info/${task_id}`);
      data = response.data;
      if (data.status !== "Success") {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (data.status !== "Success");
    return data.result;
  },
  download: async (url) => {
    const payload = {
      height: 1440,
      media_type: "video",
      url: url
    };
    const { data: { task_id } } = await axios.post(base.submitDownload, payload);
    let d;
    do {
      const ress = await axios.get(base.getDownload + task_id);
      d = ress.data;
      if (d.status !== "Success") {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (d.status !== "Success");
    return d.result;
  }
};

grabTheClip.getInfo("https://youtube.com/watch?v=B7xai5u_tnk").then(console.log);
grabTheClip.download("https://youtube.com/watch?v=B7xai5u_tnk").then(console.log)