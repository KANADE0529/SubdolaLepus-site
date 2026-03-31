if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

const DEFAULT_PORTRAIT = {
  portraitFit: "cover",
  portraitScale: 100,
  portraitX: 50,
  portraitY: 50
};

const characters = {
  tsubame: {
    title: "姜燕",
    entry: "Team Subdola Lepus/001",
    job: "傭兵特工/坦克",
    camp: "UN聯合/波拉里斯傭兵培育學園",
    summary: "無論是身體能力還是戰鬥天賦都非常拔群，但除此之外什麼都做不好偏科型特工。",
    status: "存活",
    danger: "無",
    record: "TSL-001",
    symbolColor: "#f45cff",
    image: "images/tsubame_01.png",
    portraitFit: "cover",
    portraitScale: 150,
    portraitX: 34,
    portraitY: 5,
    fullName: "姜燕",
    age: "18",
    height: "167 cm",
    identity: "傭兵特工／狡兔小隊成員",
    description: "職業：雙刃劍/物理\n生日：09/21\n喜歡:狡兔的成員、活動身體\n討厭:讀書、很難懂的東西\n----------------------------------------------------------------------------------------------------------------\n7歲之前無紀錄，本人也表達無記憶\n7歲時意外接觸留聲機，意識被縱慾王帶走接受洗禮成為了Union淺略帶過的紀錄中的【縱慾王之女】\n12歲時因不知名原因脫離洗禮並醒來(沒有死也是很奇蹟)，失去了與縱慾王相關的記憶並流落街頭\n15歲時因使用超能力搶劫其未來的養母姜美英而被扭送至波拉里斯學園就讀、隨後被領養更名為姜燕\n17歲因故留級1年才畢業，12屆首席畢業生\n18歲已經作為正式的傭兵特工【狡兔小隊】的成員而有亮眼的成績\n----------------------------------------------------------------------------------------------------------------\n體力與運動神經超群的戰鬥者，同時也是笨蛋\n雖然腦袋很笨理解的知識大概就是國中生範圍\n但是第六感非常強，總能誤打誤撞選到對的方向\n\n波拉里斯第12屆首席畢業生←但怎麼以首席畢業的不知道\n有話直說的類型，想要就是想要、喜歡就是喜歡，\n這類型的情感分的很明顯，基本上就是陽光笨蛋類型\n對同期的戴莉和瑪莉亞用情很深(各方面上)，\n如果可以想一輩子待在一起的那種\n\n出身於波拉里斯學院所在的首爾同時是一名孤兒，\n使用超能力實施搶劫的時候因搶劫對象是\n時任教師將美英因此被教訓後強制入學並被其領養",
    tags: [
      "笨蛋",
      "大狗",
      "直覺EX",
      "幸運EX",
      "重女",
      "精力旺盛",
      "外表狡詐精明",
      "內裡黃金獵犬",
      "過於相信周圍人"
    ]
  },
  claire: {
    title: "伍德．克萊爾馮司沃克．布蘭德三世 / Wood Claire von Swalk Brand III",
    entry: "Team Subdola Lepus/005",
    job: "傭兵特工/妨礙",
    camp: "UN聯合/波拉里斯傭兵培育學園",
    summary: "身為妨礙役資質優秀且富有上進心，但偏偏喜歡小女孩和束縛技的獨角獸蘿莉控菜鳥特工。",
    status: "存活",
    danger: "無",
    record: "TSL-005",
    symbolColor: "#fde3a5",
    image: "images/claire-hover.png",
    portraitFit: "cover",
    portraitScale: 201,
    portraitX: 43,
    portraitY: 0,
    fullName: "白金克萊兒",
    age: "14",
    height: "170 cm",
    identity: "傭兵特工／狡兔小隊成員",
    description: "名字：伍德．克萊爾馮司沃克．布蘭德三世(特工使用名)/白金克萊兒(本名)\n職業：(束縛)緞帶/魔法\n年齡：14\n身高：170cm\n體重：52kg\n生日：4/18\n喜歡:翻花繩、綑綁、可愛的人事物、瑪莉亞學姊(偶像崇拜)、百合(是的這個人是個女同)\n討厭:男性、死結、汗臭味\n----------------------------------------------------------------------------------------------------------------\n13歲之前皆作為日本製造商【白金集團】掌上明珠的普通人生活\n13歲時在一般交通運輸上遭受癡漢騷擾而覺醒超能力，造成加害者當場死亡\n13歲因超能力者管理條例進入波拉里斯傭兵培育學園(又稱青少年超能力犯罪更生學校)就讀、培養\n14歲以13屆首席畢業，並加入前輩所在的【狡兔小隊】\n----------------------------------------------------------------------------------------------------------------\n新制度波拉里斯學院第13屆的優秀首席畢業生。\n\n和次席跟末席合不來轉而申請加入狡兔小隊\n入學原因是上學時遭到癡漢騷擾一不小心覺醒超能力把對方給炸了(剩2.5)\n認錯態度良好因此轉交於已經藉由狡兔小隊交出良好成績的波拉里斯學院\n\n個性颯爽且負責任，年紀超小但身高與戴莉差不多為特點\n而且特別成熟，是個姊姊類型的妹妹\n但對可愛的東西，尤其是嬌小的女性特別沒轍\n和癡漢沒關係，單純喜歡蘿莉，還有點獨角獸\n(不能接受蘿莉有男朋友、有老公、已婚等等)\n出身家庭比較嚴厲且富有的緣故，在各種地方都有點沒路用(至少沒有姜燕那麼沒用)\n擅長包紮也擅長綑綁，只要讓她看參考圖就能馬上還原出來",
    tags: [
      "超有錢",
      "14歲的超中學級蘿莉控",
      "獨角獸",
      "喜歡綑綁/束縛",
      "小瑪莉亞前輩❤️❤️❤️❤️❤️",
      "小瑪莉亞前輩全肯定廚"
    ]
  },
  dailey: {
    title: "戴莉 / Dailey",
    entry: "Team Subdola Lepus/003",
    job: "傭兵特工/前鋒&妨礙",
    camp: "UN聯合/波拉里斯傭兵培育學園",
    summary: "資質平庸、脾氣暴躁、行為粗俗暴力、說話無禮且狡猾又小聰明於一身，表面上看似漠不關心，實際上比誰都關心成員的暴嬌特工。",
    status: "存活",
    danger: "中低|需監視",
    record: "TSL-003",
    symbolColor: "#b862fe",
    image: "images/dailey_01.png",
    portraitFit: "cover",
    portraitScale: 146,
    portraitX: 48,
    portraitY: 13,
    fullName: "戴莉",
    age: "17",
    height: "172",
    identity: "傭兵特工／狡兔小隊成員",
    description: "武器：西洋長劍&塔羅牌/混合\n生日：05/18\n喜歡的事物：刺激感、錢、有很多錢\n討厭的東西：被試探、無力感\n興趣喜好：賺錢、花錢、騙人\n----------------------------------------------------------------------------------------------------------------\n7歲為止生活在法國南部\n7歲被誘拐綁架，被移動至法國與與德國的鄰近處小鎮\n9歲覺醒能夠變換容貌的超能力，並使用超能力打倒誘拐泛\n9歲成立詐騙集團\n13歲成為歐洲知名詐騙集團首腦\n15歲被黑道仇家賣給波拉里斯學園\n16歲以12屆末席畢業\n17歲已經作為正式的傭兵特工【狡兔小隊】的成員而有亮眼的成績\n----------------------------------------------------------------------------------------------------------------\n話術超群的妨礙者，喜好捉弄他人。\n進入波拉里斯前為詐騙團夥的首腦，因為招惹到黑幫而被賣到波拉里斯，\n靠著復仇心和強大的學習能力順利畢業。\n\n沒有使用塔羅牌進行占卜的能力，以前進行的詐騙活動都是靠她自身的話術和同夥的幫助進行，\n現在對她來說塔羅牌只是方便使用超能力的媒介。\n透過自身超能力進行謊言占卜和在傭兵教育中磨練出的刀法結合，\n讓她不管在近遠距離都能有不錯的表現。\n現在用的名字是假名，她也不清楚自己的最開始的名字叫什麼，\n只是每換一個身份就改一次名，從上一個身份繼承下來的只有仇人、超能力和塔羅牌而已。\n平時總是帶著笑臉，話語中偶爾會夾雜一些諷刺，只要不招惹她都可以正常相處，\n一旦試圖動她的財產或者窺探她的隱私，她就會馬上失去笑意並且變得暴躁易怒。",
    tags: [
      "暴力傲嬌(バイオレンスツンデレ 簡稱バイオデレ）)",
      "詐騙犯",
      "愛錢",
      "護短",
      "粗暴",
      "吐槽役",
      "主要照顧姜燕者"
    ]
  },
  mary: {
    title: "瑪莉亞．薩圖恩 / Mary Sattan",
    entry: "Team Subdola Lepus/001",
    job: "傭兵特工/指揮&輔助",
    camp: "UN聯合/波拉里斯傭兵培育學園",
    summary: "在隊伍中擔當智囊、智商超群高達135，但身體脆弱、只有隻眼能見，有時候會露出幼稚一面的小隊隊長。",
    status: "存活",
    danger: "高度|需定期檢查",
    record: "TSL-002",
    symbolColor: "#c6c4ea",
    image: "images/marry_01.png",
    portraitFit: "cover",
    portraitScale: 159,
    portraitX: 52,
    portraitY: 5,
    fullName: "瑪莉亞．薩圖恩",
    age: "15",
    height: "140",
    identity: "傭兵特工／狡兔小隊成員/曉拂星光與獵者之夜的代行者",
    description: "武器：占星球/魔法\n生日：12/28\n喜歡:動腦筋、下午茶\n討厭:笨蛋(姜燕除外)、醫療(器具和行為都討厭)\n----------------------------------------------------------------------------------------------------------------\n5歲前無紀錄，推測為被誘拐\n5歲時賣給米歇爾前總長作為人體實驗對象\n8歲人工覺醒超能力以及掌握使用■■■■的能力\n10歲時因無法忍受實驗因此使用超能力以及■■■■對研究所成員實施虐殺、縱火\n多日後被特工救出，全身骨折、多處衰竭、失血\n13歲為止接受治療和機構基礎教育\n13歲童年進入波拉里斯學園接受教育\n14歲以次席的優秀成績畢業\n15歲已經作為正式的傭兵特工【狡兔小隊】的成員而有亮眼的成績\n----------------------------------------------------------------------------------------------------------------\n頭腦超群的智者，個性溫和\n友善且獨立，不太會表達負面情感\n很明顯覺得姜燕就是笨蛋，雖然不至於的生氣的地步\n但總是覺得要介紹這個那個很麻煩\n負責聽取作戰後解釋給姜燕聽，有點逆來順受的性格\n波拉里斯學園的12屆的次席畢業生\n重視狡同期的兩位成員",
    tags: [
      "天才",
      "人工超能力者",
      "蘿莉",
      "獨眼",
      "隊長",
      "主要照顧姜燕者",
      "害怕醫療"
    ]
  },
  rozelia: {
    title: "洛潔莉雅．米莉雅姆 / Rozelia．Miriam",
    entry: "Team Subdola Lepus/001",
    job: "假釋契約特工/戰士",
    camp: "UN聯合/舊式波拉里斯傭兵培育學園",
    summary: "波拉里斯學園的第10屆畢業生，同時也是舊式波拉里斯最後一屆的畢業生。5年前因故背叛了UN從而導致被收監觀察，至今仍不明白為何會發生這種事情，被姜美英假釋出來後致力尋找原因。",
    status: "存活",
    danger: "中低|需監視",
    record: "TSL-004",
    symbolColor: "#359247",
    image: "images/rozelia-01.png",
    portraitFit: "cover",
    portraitScale: 220,
    portraitX: 46,
    portraitY: 15,
    fullName: "洛潔莉雅．米莉雅姆",
    age: "24",
    height: "138",
    identity: "傭兵特工/狡兔小隊成員/需監視的假釋罪犯",
    description: "名字：洛潔莉雅‧米莉雅姆\n職業：(操控術)玩偶/物理\n年齡：24\n身高：138cm\n體重：40kg\n生日：01/22\n喜歡:時尚、華麗、羅麗塔\n討厭:沒禮貌的人、骯髒的事物\n----------------------------------------------------------------------------------------------------------------\n15歲前在出生地美國生活\n15歲前往韓國首爾就讀舊式波拉里斯學園\n16歲畢業並投入正式工作\n19歲因洗腦背叛UN組織、洩漏一事被判刑坐牢\n24歲因故被姜美英花錢假釋，須配戴監視器方可行動\n----------------------------------------------------------------------------------------------------------------\n舊制度波拉里斯學院第10屆的優秀畢業生。\n\n同時也是5年前波拉里斯畢業生背叛事件的犯罪者，\n如今結束了漫長的關押和檢查以被觀察特工的身分\n重新回到戰場，並加入了狡兔小隊。\n\n曾經也是姜美英的學生，出於各種理由讓她不要\n告知其他三人自己是導致波拉里斯衰敗的元凶。\n想靠著回歸前線追查自己犯罪的真相。\n\n５年前，她作戰時意外碰上火焰王之女在一陣纏鬥後\n隨之遭到洗腦，將許多機密資料交了出去，因此導致重大作戰失利，\n但清醒後完全沒有記憶，覺得自己是冤罪入獄。",
    tags: [
      "合法蘿莉",
      "方言腔調",
      "蘿莉塔",
      "前輩"
    ]
  }
};;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const rawData = characters[id];

if (!rawData) {
  window.location.href = "character-list.html";
}

const data = {
  ...DEFAULT_PORTRAIT,
  ...rawData,
  tags: Array.isArray(rawData.tags) ? rawData.tags : []
};

document.title = `${data.title}｜角色檔案`;

const entryCode = document.getElementById("entryCode");
const characterName = document.getElementById("characterName");
const jobText = document.getElementById("jobText");
const campText = document.getElementById("campText");
const summaryText = document.getElementById("summaryText");
const statusText = document.getElementById("statusText");
const dangerText = document.getElementById("dangerText");
const recordText = document.getElementById("recordText");
const profileName = document.getElementById("profileName");
const profileAge = document.getElementById("profileAge");
const profileHeight = document.getElementById("profileHeight");
const profileIdentity = document.getElementById("profileIdentity");
const descriptionText = document.getElementById("descriptionText");
const portraitImage = document.getElementById("portraitImage");
const symbolSwatch = document.getElementById("symbolSwatch");
const tagList = document.getElementById("tagList");

entryCode.textContent = data.entry;
characterName.textContent = data.title;
jobText.textContent = `職業：${data.job}`;
campText.textContent = `陣營：${data.camp}`;
summaryText.textContent = data.summary;
statusText.textContent = data.status;
dangerText.textContent = data.danger;
recordText.textContent = data.record;
profileName.textContent = data.fullName;
profileAge.textContent = data.age;
profileHeight.textContent = data.height;
profileIdentity.textContent = data.identity;
descriptionText.textContent = data.description;

portraitImage.src = data.image || "";
portraitImage.alt = data.fullName || "角色立繪";
const portraitFrame = portraitImage?.closest(".portrait");
const portraitPlaceholder = document.getElementById("portraitPlaceholder");

function applyPortraitLayout() {
  if (!portraitImage || !portraitFrame || portraitImage.hidden) return;
  if (!portraitImage.naturalWidth || !portraitImage.naturalHeight) return;

  const frameWidth = portraitFrame.clientWidth || 1;
  const frameHeight = portraitFrame.clientHeight || 1;
  const fit = data.portraitFit || "cover";
  const zoom = (Number(data.portraitScale) || 100) / 100;

  const baseScale = fit === "contain"
    ? Math.min(frameWidth / portraitImage.naturalWidth, frameHeight / portraitImage.naturalHeight)
    : Math.max(frameWidth / portraitImage.naturalWidth, frameHeight / portraitImage.naturalHeight);

  const renderWidth = portraitImage.naturalWidth * baseScale * zoom;
  const renderHeight = portraitImage.naturalHeight * baseScale * zoom;
  const xPercent = (Number(data.portraitX) || 0) / 100;
  const yPercent = (Number(data.portraitY) || 0) / 100;
  const overflowX = Math.max(0, renderWidth - frameWidth);
  const overflowY = Math.max(0, renderHeight - frameHeight);

  portraitImage.style.width = `${renderWidth}px`;
  portraitImage.style.height = `${renderHeight}px`;
  portraitImage.style.left = `${-overflowX * xPercent}px`;
  portraitImage.style.top = `${-overflowY * yPercent}px`;
}

if (portraitImage) {
  portraitImage.onerror = () => {
    portraitImage.removeAttribute("src");
    portraitImage.hidden = true;
    if (portraitPlaceholder) portraitPlaceholder.hidden = false;
  };

  portraitImage.onload = () => {
    portraitImage.hidden = false;
    if (portraitPlaceholder) portraitPlaceholder.hidden = true;
    applyPortraitLayout();
  };

  portraitImage.style.position = "absolute";
  portraitImage.style.maxWidth = "none";
  portraitImage.style.maxHeight = "none";
  portraitImage.style.transformOrigin = "center center";

  if (data.image) {
    portraitImage.src = data.image;
    portraitImage.alt = data.fullName || "角色立繪";
  } else {
    portraitImage.hidden = true;
    if (portraitPlaceholder) portraitPlaceholder.hidden = false;
  }
}

window.addEventListener("resize", applyPortraitLayout);
symbolSwatch.style.background =
  `linear-gradient(90deg, rgba(255,255,255,0.08), ${data.symbolColor})`;

tagList.innerHTML = "";

data.tags.forEach((tag) => {
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.textContent = tag;
  tagList.appendChild(chip);
});