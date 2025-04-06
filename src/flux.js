import axios from "axios";

const session_hash = Math.random().toString(36).slice(2);
const base = "https://rooc-flux-fast.hf.space";

const endpoints = {
  join: `${base}/gradio_api/queue/join`,
  dataStream: `${base}/gradio_api/queue/data?session_hash=${session_hash}`
};

async function fluxImage(prmpt) {
  let payload = {
    data: [prmpt],
    event_data: null,
    fn_index: 0,
    session_hash,
    trigger_id: 10
  };

  let { data } = await axios.post(endpoints.join, payload);
  let event_id = data.event_id;
  let result = null;

  const responseStream = await axios.get(endpoints.dataStream, {
    responseType: "stream"
  });

  for await (const chunk of responseStream.data) {
    let lines = chunk
      .toString()
      .split("\n")
      .filter(line => line.startsWith("data: "));
      
    for (let line of lines) {
      let parsed = JSON.parse(line.replace("data: ", ""));
      if (parsed.msg === "process_completed" && parsed.event_id === event_id) {
        result = { urlResult: `${parsed.output.data[0].url}` };
        break;
      }
    }
    if (result) break;
  }

  return result;
}

fluxImage("Cat").then(console.log)