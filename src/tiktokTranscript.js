import axios from "axios";
import getNewProxy from "./proxyList.js";

async function tiktokTranscript(url) {
  const { ip, port } = await getNewProxy();
  
  try {
    const { data } = await axios.get(
      `https://scriptadmin.tokbackup.com/v1/tiktok/fetchTikTokData?video=${url}&get_transcript=true&ip=${ip}`,
      {
        headers: {
          "X-Api-Key": "Toktools2024@!NowMust",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          "Referer": "https://script.tokaudit.io/",
          "Origin": "https://script.tokaudit.io",
          "Sec-Ch-Ua": '"Not A(Brand)";v="8", "Chromium";v="132"',
          "Sec-Ch-Ua-Mobile": "?1",
          "Sec-Ch-Ua-Platform": "Android",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site"
        }
      }
    );
    
    return data;
  } catch (error) {
    console.error("Error fetching TikTok transcript:", error);
    throw error;
  }
}

// Usage example
tiktokTranscript("https://vt.tiktok.com/ZSrhuYX3u/")
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

/* Result
{
  data: {
    id: '7483180924138523909',
    desc: 'akash dilawan😎 #saudade #saudadediviu #akash #aca #bun #NgeViuBurit #jkt48 #abunsungkar #calistaarum #fyp #foryoupagе ',
    createTime: '1742313837',
    scheduleTime: 0,
    video: {
      id: '7483180924138523909',
      height: 768,
      width: 576,
      duration: 95,
      ratio: '540p',
      cover: 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/o8WLE4i2j1k2cxAZgABAIx76IJzomAvCtMi6fd?lk3s=81f88b70&x-expires=1743757200&x-signature=hoTGx%2Fq310r1LIjhNGZACP9Bp40%3D&shp=81f88b70&shcp=-',
      originCover: 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/og0jEeZERJrfXjrwmQAZHQ82QATn00DhHtXBFB?lk3s=81f88b70&x-expires=1743757200&x-signature=rdtg7Ds0xoXzdONeF8cQuB0g3RA%3D&shp=81f88b70&shcp=-',
      dynamicCover: 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/oUXCg72krIAMxxK1LPmxZfAE4oi6JABTzI6IBi?lk3s=81f88b70&x-expires=1743757200&x-signature=p7Tj9cv0ckyBbPwnwbCrd8%2BlvtE%3D&shp=81f88b70&shcp=-',
      playAddr: 'https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c001/o0bSInLsgHojAgoxPXReXeLkIvCzSzeMCHAgGq/?a=1988&bti=ODszNWYuMDE6&ch=0&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C&cv=1&br=1012&bt=506&cs=0&ds=6&ft=4fUEKMPK8Zmo0I-6Lb4jVhOyrpWrKsd.&mime_type=video_mp4&qs=0&rc=NTU1OThoZDZlZmYzNjdmaEBpM2s7d3Q5cnVzeTMzNzczM0BgYjQtMTRjXjUxYzYxYDBfYSNwa2MxMmRjZWBgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1743759188&l=202504021731334119DAAEFAC7F20B5A78&ply_type=2&policy=2&signature=501ce123c30e0cdcf43c4963ff77cb38&tk=tt_chain_token',
      downloadAddr: 'https://v16-webapp-prime.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/oUAgQYxZuJzEfA9H6rBMLI2yk7mIixioYs6C41/?a=1988&bti=ODszNWYuMDE6&ch=0&cr=3&dr=0&lr=all&cd=0%7C0%7C0%7C&cv=1&br=1264&bt=632&cs=0&ds=3&ft=4fUEKMPK8Zmo0I-6Lb4jVhOyrpWrKsd.&mime_type=video_mp4&qs=0&rc=Mzs1OmkzZTNmPGlkZWhkN0BpM2s7d3Q5cnVzeTMzNzczM0AwYDNeYzJfNjQxYF9fXzZgYSNwa2MxMmRjZWBgLS1kMTZzcw%3D%3D&btag=e00090000&expire=1743759188&l=202504021731334119DAAEFAC7F20B5A78&ply_type=2&policy=2&signature=76f323c4c7112591922268520a3b742b&tk=tt_chain_token',
      shareCover: [Array],
      reflowCover: '',                                                                        bitrate: 519154,
      encodedType: 'normal',
      format: 'mp4',
      videoQuality: 'normal',
      encodeUserTag: '',
      codecType: 'h264',
      definition: '540p',
      subtitleInfos: [Array],
      zoomCover: [Object],
      volumeInfo: [Object],
      bitrateInfo: [Array],
      size: '6205191',
      VQScore: '61.36',
      claInfo: [Object],
      videoID: 'v09044g40000cvcphrfog65q4tf8nhs0'
    },
    author: {
      id: '7180163004675359771',
      shortId: '',
      uniqueId: 'shicomarvin',
      nickname: 'ｲのズﾘの',
      avatarLarger: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3ebf230965b7915ad4af6a90bac52930~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=c31fb6e3&x-expires=1743757200&x-signature=aQsV3S49me3EWaK5vSkqBNuW3H0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      avatarMedium: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3ebf230965b7915ad4af6a90bac52930~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=e97315a4&x-expires=1743757200&x-signature=gQ%2B4mbU2f7nBfcQAsNsTkH4X8Vg%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      avatarThumb: 'https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3ebf230965b7915ad4af6a90bac52930~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=1d9ec73f&x-expires=1743757200&x-signature=70GNAPHNCFN%2BW9WfgDD0jjB%2FSw8%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      signature: 'pokonamah jangan spam like\n𝙨𝙪𝙥𝙥𝙤𝙧𝙩\n↓',
      createTime: 1671762146,
      verified: false,
      secUid: 'MS4wLjABAAAAGj7PG6pS3yF5pQcNNhroMl2oRKau1X_iP5RDul8ci1HaS-CECzFEAqR87Qbobusm',
      ftc: false,
      relation: 0,
      openFavorite: false,
      commentSetting: 0,
      duetSetting: 0,
      stitchSetting: 0,
      privateAccount: false,
      secret: false,
      isADVirtual: false,
      roomId: '',
      uniqueIdModifyTime: 0,
      ttSeller: false,
      downloadSetting: 0,
      recommendReason: '',
      nowInvitationCardUrl: '',
      nickNameModifyTime: 0,
      isEmbedBanned: false,
      canExpPlaylist: false,
      suggestAccountBind: false
    },
    music: {
      id: '7350362734460013354',
      title: 'kīnġs and qūēēns',
      playUrl: 'https://v58.tiktokcdn.com/video/tos/maliva/tos-maliva-v-27dcd7c799-us/oUBJMFIufgGAmhAif8AdLjDOe7IAAYIQdfIxHo/?a=1233&bti=ODszNWYuMDE6&ch=0&cr=0&dr=0&er=0&lr=default&cd=0%7C0%7C0%7C0&br=250&bt=125&ds=5&ft=.NpOcInz7ThKra5OXq8Zmo&mime_type=audio_mpeg&qs=13&rc=M2t4ang5cnh1cjMzZzU8NEBpM2t4ang5cnh1cjMzZzU8NEAwcWNzMmQ0ay1gLS1kMS9zYSMwcWNzMmQ0ay1gLS1kMS9zcw%3D%3D&vvpl=1&l=202504021731334119DAAEFAC7F20B5A78&VExpiration=1743672823&VSignature=h6pECpKwDJsI0oc4zoEIcg&btag=e00050000&cc=14',
      coverLarge: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f08f0d656ad4c92003d4e7e0506800a6~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=3148fb5f&x-expires=1743757200&x-signature=c0S2giErelr3AxmVxFVhy6vu8ls%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      coverMedium: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f08f0d656ad4c92003d4e7e0506800a6~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=faa466d2&x-expires=1743757200&x-signature=SyYNjgKDIXDd1a%2BzQ48J9kXGhp0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      coverThumb: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f08f0d656ad4c92003d4e7e0506800a6~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=f6f8dccf&x-expires=1743757200&x-signature=OYMqrm7jMUXzpH6pDHG%2BqAj8Rac%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=maliva',
      authorName: 'long audios 👉🏼',
      original: true,
      private: false,
      duration: 130,
      scheduleSearchTime: 0,
      collected: false,
      preciseDuration: [Object],
      isCopyrighted: false,
      tt2dsp: [Object]
    },
    challenges: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    stats: {
      diggCount: 33500,
      shareCount: 94,
      commentCount: 108,
      playCount: 596700,
      collectCount: '1448'
    },
    statsV2: {
      diggCount: '33500',
      shareCount: '94',
      commentCount: '108',
      playCount: '596700',
      collectCount: '1448',
      repostCount: '0'
    },
    warnInfo: [],
    originalItem: false,
    officalItem: false,
    textExtra: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    secret: false,
    forFriend: false,
    digged: false,
    itemCommentStatus: 0,
    takeDown: 0,
    effectStickers: [],
    authorStats: {
      followerCount: 82300,
      followingCount: 68,
      heart: 4800000,
      heartCount: 4800000,
      videoCount: 653,
      diggCount: 7950,
      friendCount: 0
    },
    privateItem: false,
    duetEnabled: true,
    stitchEnabled: true,
    stickersOnItem: [],
    isAd: false,
    shareEnabled: true,
    comments: [],
    duetDisplay: 0,
    stitchDisplay: 0,
    indexEnabled: true,
    diversificationLabels: [ 'Movies & TV works', 'Entertainment Culture', 'Entertainment' ],
    locationCreated: 'ID',
    suggestedWords: [],
    contents: [ [Object] ],
    diversificationId: 10045,
    collected: false,
    channelTags: [],
    item_control: { can_repost: true },
    IsAigc: false,
    AIGCDescription: '',
    backendSourceEventTracking: '',
    CategoryType: 101,
    textLanguage: 'hi',
    textTranslatable: true
  },
  subtitles: 'WEBVTT\n' +
    '\n' +
    '00:00:00 --> 00:00:02\n' +
    "That's a real wound. \n" +
    '\n' +
    '00:00:03 --> 00:00:05\n' +
    "You can't wear anything when you play. \n" +
    '\n' +
    '00:00:05 --> 00:00:07\n' +
    'It made me cheat. \n' +
    '\n' +
    '00:00:07 --> 00:00:09\n' +
    "I'll do my best. \n" +
    '\n' +
    '00:00:09 --> 00:00:10\n' +
    'Take it easy. \n' +
    '\n' +
    '00:00:12 --> 00:00:13\n' +
    'Yes, in my opinion, \n' +
    '\n' +
    '00:00:13 --> 00:00:14\n' +
    'if you want to retreat, \n' +
    '\n' +
    '00:00:14 --> 00:00:15\n' +
    "it's better to retreat now. \n" +
    '\n' +
    '00:00:15 --> 00:00:16\n' +
    "Yes, it's fine. \n" +
    '\n' +
    '00:00:16 --> 00:00:17\n' +
    "Don't. \n" +
    '\n' +
    '00:00:17 --> 00:00:20\n' +
    "Then people will think you're not worth fighting for. \n" +
    '\n' +
    '00:00:32 --> 00:00:33\n' +
    'Okay? \n' +
    '\n' +
    '00:00:34 --> 00:00:36\n' +
    'Thirty seconds from ikaki \n' +
    '\n' +
    '00:00:57 --> 00:00:58\n' +
    'wow wow wow crazy. \n' +
    '\n' +
    '00:00:59 --> 00:01:01\n' +
    'Twenty 5seconds guys accent time faster than love. \n' +
    '\n' +
    '00:01:01 --> 00:01:02\n' +
    'Means the winning akas \n' +
    '\n' +
    '00:01:15 --> 00:01:17\n' +
    'and the winner is \n' +
    '\n' +
    '00:01:26 --> 00:01:27\n' +
    'thank you. \n' +
    '\n' +
    '00:01:29 --> 00:01:31\n' +
    "Don't forget our deal.\n" +
    '\n'
}
 */