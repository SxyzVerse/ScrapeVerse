import axios from "axios";
import * as cheerio from "cheerio";

const base = {
  latest: "https://nontonanime.live/",
  orderAnime: "https://nontonanime.live/anime/?status&type&order",
  search: "https://nontonanime.live/?s="
};

const nontonAnime = {
  latest: async () => {
    try {
      const { data } = await axios.get(base.latest);
      const $ = cheerio.load(data);
      const animeList = [];

      $(".listupd.normal .bsx a").each((_, element) => {
        animeList.push({
          title: $(element).attr("title"),
          url: $(element).attr("href"),
          episode: $(element).find(".bt .epx").text().trim(),
          type: $(element).find(".limit .typez").text().trim(),
          thumbnail: $(element).find(".lazyload").attr("data-src") || $(element).find("img").attr("src"),
        });
      });

      return animeList;
    } catch (error) {
      console.error("Error fetching latest anime:", error);
      return [];
    }
  },

  upcoming: async () => {
    try {
      const { data } = await axios.get(base.orderAnime);
      const $ = cheerio.load(data);
      const upcomingList = [];

      $(".listupd .bsx a").each((_, element) => {
        const episode = $(element).find(".bt .epx").text().trim();

        if (episode.toLowerCase() === "upcoming") {
          upcomingList.push({
            title: $(element).attr("title"),
            url: $(element).attr("href"),
            episode,
            type: $(element).find(".limit .typez").text().trim(),
            thumbnail: $(element).find(".lazyload").attr("data-src") || $(element).find("img").attr("src"),
          });
        }
      });

      return upcomingList;
    } catch (error) {
      console.error("Error fetching upcoming anime:", error);
      return [];
    }
  },

  search: async (q) => {
    try {
      const { data } = await axios.get(base.search + encodeURIComponent(q));
      const $ = cheerio.load(data);
      const searchResults = [];

      $(".bsx a").each((_, element) => {
        searchResults.push({
          title: $(element).attr("title"),
          url: $(element).attr("href"),
          episode: $(element).find(".bt .epx").text().trim(),
          type: $(element).find(".limit .typez").text().trim(),
          thumbnail: $(element).find(".lazyload").attr("data-src") || $(element).find("img").attr("src"),
        });
      });

      return searchResults;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  },

  details: async (url) => {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $("h1.entry-title").text().trim();
      const thumbnail = $(".bigcover .lazyload").attr("data-src") || $(".bigcover img").attr("src");
      const synopsis = $(".entry-content p").text().trim();
      const status = $(".info-content .spe span:contains('Status')").text().replace("Status:", "").trim();
      const studio = $(".info-content .spe span:contains('Studio') a").text().trim();
      const season = $(".info-content .spe span:contains('Season') a").text().trim();
      const type = $(".info-content .spe span:contains('Type')").text().replace("Type:", "").trim();
      
      const genres = $(".genxed a")
        .map((_, el) => $(el).text().trim())
        .get();
      
      const characters = $(".cvlist .cvitem").map((_, el) => {
        const charName = $(el).find(".cvchar .charname").text().trim();
        const voiceActor = $(el).find(".cvactor .charname a").text().trim();
        return { charName, voiceActor };
      }).get();
      
      const episodes = $(".eplister ul li").map((_, el) => {
        const episodeKe = $(el).find(".epl-num").text().trim();
        const title = $(el).find(".epl-title").text().trim();
        const dateOfRelease = $(el).find(".epl-date").text().trim();
        const link = $(el).find("a").attr("href");
        return { episodeKe, title, dateOfRelease, link };
      }).get();

      return { 
        title, 
        thumbnail, 
        synopsis, 
        status, 
        studio, 
        season, 
        type, 
        genres, 
        characters, 
        episodes 
      };
    } catch (error) {
      console.error("Error fetching anime details:", error);
      return null;
    }
  },

  download: async (urlEpisodes) => {
    try {
      const { data } = await axios.get(urlEpisodes);
      const $ = cheerio.load(data);
      const downloadLinks = [];

      $(".mirror option").each((_, element) => {
        const encodedValue = $(element).attr("value");
        if (encodedValue) {
          const buffer = Buffer.from(encodedValue, "base64");
          const decodedLink = buffer.toString("utf-8");

          downloadLinks.push({
            server: $(element).text().trim(),
            link: decodedLink.includes("<iframe") 
              ? cheerio.load(decodedLink)("iframe").attr("src") 
              : decodedLink
          });
        }
      });

      return downloadLinks;
    } catch (error) {
      console.error("Error fetching download links:", error);
      return [];
    }
  }
};

// Example usage
nontonAnime.download("https://nontonanime.live/izure-saikyou-no-renkinjutsushi-episode-1-sub-indo/")
  .then(console.log);