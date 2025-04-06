import axios from "axios";

const accountTypeList = ["Creator", "Personal", "Business", "Non-Profit"];
const hashtagList = [3, 5, 10];
const toneList = [
  "Friendly",
  "Professional",
  "Casual",
  "Inspirational",
  "Educational",
  "Persuasive",
  "Humorous",
  "Formal"
];
const categoryList = [
  "Travel",
  "Fashion",
  "Food",
  "Tech",
  "Lifestyle",
  "Art",
  "Music",
  "Fitness"
];

function generateBio(options = {}) {
  if (
    options.accountType >= accountTypeList.length ||
    options.tone >= toneList.length ||
    options.category >= categoryList.length ||
    options.hashtags >= hashtagList.length
  ) {
    return Promise.reject(new Error("Input tidak valid."));
  }

  const payload = {
    accountType: accountTypeList[options.accountType],
    bioDescription: options.bioDesc,
    category: categoryList[options.category],
    hashtagsCount: hashtagList[options.hashtags],
    includeEmojis: options.useEmoji,
    wordCount: "50",
    writingTone: toneList[options.tone]
  };

  return axios.post("https://socialfollowers.io/generate_instagram_bio.php", payload).then(res => res.data);
}

generateBio({
  accountType: 0,
  bioDesc: "Penyanyi indie yang menciptakan lagu dengan lirik penuh makna, suara khas, dan pesan mendalam.",
  category: 6,
  hashtags: 2,
  useEmoji: true,
  tone: 3
})
  .then(bio => console.log("Bio Instagram:", bio))
  .catch(error => console.error("Terjadi kesalahan:", error.message));