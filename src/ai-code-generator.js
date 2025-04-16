import axios from "axios";

async function aiCodeGenerator(opt) {
  let pyld = {
     customInstructions: opt.prompt,
     outputLang: opt.language
  }
  let { data } = await axios.post("https://www.codeconvert.ai/api/generate-code", pyld)
  return {
     code: data
  }
}

aiCodeGenerator({
  prompt: "Functiom Penambahan",
  language: "JavaScript"
}).then(console.log)
