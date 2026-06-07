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
    designTalk: "姜燕並不是定義上的笨，她各項指標正常、包含智商，但意外地她對各種事情都無法做到正常的理解，需要他人重新為她做更簡單詳細的說明。\n雖然乍看之下她有些愚笨到不可思議的狀態，但是她相當會察言觀色、能夠在各種場合憑直覺感覺到自己該不該說話。\n此外，她是個很明顯地貶低奉獻型人格，但基本上只針對瑪莉亞和戴莉，她將兩人視為最重要的人物以及關係對象，但卻將自己的地位壓到非常卑微的地方，雖然此狀態非常隱密到平時不會被發現。\n姜燕是個天生的樂觀主義者，也有可能是因為她將會難過的因素給隱藏起來，所以幾乎不會看見她難過的樣子。\n她的反應通常都相當戲劇化，幾乎是大收大放的程度，上秒愁眉苦臉、下秒又生機蓬勃幾乎是她的日常。\n姜燕的外表特意設計成狡猾陰險的樣貌，初次與她見面的人通常都會對她抱有一定的懷疑和緊戒心，但又很快隨著交流發現她其實就像一隻大狗一樣，樂天又毫無戒備心，總是以熱情且親近的態度對待他人。\n在姜燕自己也不知道的地方，她對待瑪莉亞和戴莉相當小心翼翼，害怕哪天兩人離開她、也害怕她們討厭自己，這份情感沉重到有些不知不覺地影響到其他兩人。\n-\n姜燕是個極端的生活白癡，她擅長一切身體活動，有這極高的身體素質，但卻沒有辦法照顧自己，就像一個不到10歲的孩子一樣。\n她只能勉強做到最基本的自主生活功能(例如上廁所、吃飯等)，其他幾乎都需要兩人幫忙，也使得她們養成了不自覺照顧姜燕的壞習慣。",
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
    designTalk: "本來是想創造一個和洛潔莉雅互搭的王子型妹妹角色，但是畫完之後又覺得能喜歡洛潔莉雅的大概也不是正常人、而且又要有反差感嘛，所以最後形成了一個14歲/170cm的蘿莉控。\n與外表那副對蘿莉垂涎欲滴的形象不同，克萊兒有著正直到戴莉感覺已經不存在的良心會幻痛的正義感和責任感，也因此是超能力覺醒後積極認錯的主因。\n中性的裝扮是個人興趣，雖然讀波拉里斯前她也只是個喜歡穿蓬蓬裙的小女孩，但自從入學穿上褲子後她發現褲子才是行動方便的服裝，自此便偏愛褲裝。\n她覺醒超能力的主因在當時希望對方能「住手」，因此覺醒了束縛類的超能力，她可以透過特殊合金緞帶對敵人進行綑綁、阻止、傷害等技術，同時她身為財團千金的學習能力非常強大，因此不管給她看什麼綑綁技術她都能馬上學會。\n順帶一提，克萊兒的顏值設定是「忽視年齡的話會覺得是美男子」的程度。\n但碰到蘿莉的話就會像變態一樣。",
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
    designTalk: "戴莉是個被灌滿悲劇色彩的角色，我將所有的不幸都送給她，並稱之為愛。\n她的父母非常相愛，但隨著她的出生引起母親的大出血去世後，她並沒有得到父親的愛，而是自3歲起就有數不完的家庭暴力與壓迫在等著她。\n7歲時她被綁架，綁到德國邊境附近的法國地區，該擄人集團除了透過綁架小孩詐領補助金外還派被擄兒童上街偷竊乞討等行為，直到戴莉覺醒了超能力才將一切迎來終結。\n戴莉的超能力是不能用在自己身上的精神系超能力，雖然多少能增加一點實力，但實際上還是多作用於改變他人眼裡自己的形象(只能在多人面前變更為單一形象)，因此她也習得了更直接的易容術。\n戴莉相當",
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
    description: "武器：占星球/魔法\n生日：12/28\n喜歡:動腦筋、下午茶\n討厭:笨蛋(姜燕除外)、醫療(器具和行為都討厭)\n----------------------------------------------------------------------------------------------------------------\n5歲前無紀錄，推測為被誘拐\n5歲時賣給米歇爾前總長作為人體實驗對象\n8歲人工覺醒超能力以及掌握使用■■■■的能力\n10歲時因無法忍受實驗因此使用超能力以及■■■■對研究所成員實施虐殺、縱火\n多日後被特工救出，全身骨折、多處衰竭、失血\n13歲為止接受治療和機構基礎教育\n13歲童年進入波拉里斯學園接受教育\n14歲以次席的優秀成績畢業\n15歲已經作為正式的傭兵特工【狡兔小隊】的成員而有亮眼的成績\n----------------------------------------------------------------------------------------------------------------\n頭腦超群的智者，個性溫和\n友善且獨立，不太會表達負面情感\n很明顯覺得姜燕就是笨蛋，雖然不至於的生氣的地步\n但總是覺得要介紹這個那個很麻煩\n負責聽取作戰後解釋給姜燕聽，有點逆來順受的性格\n波拉里斯學園的12屆的次席畢業生\n重視狡兔同期的兩位成員",
    designTalk: "瑪莉亞有個相當悲慘的過去，被關在德國地下研究所進行人體實驗，她無法相信不認識的人，也討厭一切會感到痛的事情，非常不喜歡看醫生，但她卻是會為了重視的人們犧牲的類型。\n瑪莉亞的照顧癖好不是先天的，發現姜燕沒有人照顧會把自己變得一團糟之後她被迫和戴莉一樣加入照顧姜燕的行列，但後面卻變成慣性、無法放下姜燕，大概是在這之中感受到了羈絆，所以她也同樣無法放著戴莉自暴自棄。\n瑪莉亞後期逐漸變成照顧姜燕癖，她可以盯著其他人要他們自己獨立，但面對姜燕確實自然而然就把自己放上了老媽的位置，像是照顧孩童一樣過去照顧她，任何事情都無法讓她忽略需要被照顧的姜燕，就算是偶爾發燒也要爬起來看姜燕有沒有踢被子、好好吃飯，對姜燕像是對自己的孩子一樣。\n-\n瑪莉亞同樣是自卑情結的一人，當初為了逃離研究所她以幾乎自毀的方式引發全身的超能力，最後的結果就是她反覆經過實驗和痛苦的身體變得極其脆弱，如果不是超能力拖著她的健康，她可能甚至活不過當晚。\n但後遺症就是，她生命只剩下5年，將止於20歲的時候。\n她總是以為自已在團隊中是不太重要的人，如果哪天提早死了、那大概只會被弔念一陣子。\n直到後來她才發現自己是無法放下姜燕和戴莉的，隨著這份重視的情感加深、她也遲遲找不到時機將這個秘密脫口。\n-\n可能是因為姜燕的原因，瑪莉亞學會喜歡上世界上的一切，在此之前她認為世界上充滿冷漠和冰涼，但自從和姜燕組隊後、她知曉了世界上充滿了各式各樣的人，是有著各種熱情的事物的，而姜燕是她第一個接觸到的陽光。\n不知道什麼原因，瑪莉亞總是覺得戴莉很難相處，所以兩人時有爭執、但又在姜燕的阻攔下很快就歸於平靜。她並沒有覺得戴莉很難搞，只是感覺到她貌似想推開身邊的人，但又小心翼翼地嘗試靠近。\n瑪莉亞不是很喜歡這種感覺，所以她時常會因戴莉尖銳的態度而引發不滿進而爭執。\n不過在觸碰到她的真心後，又覺得:「只是一個沒有被愛過的小朋友在鬧脾氣而已。」\n這麼一想，看戴莉也覺得可愛了起來。",
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
    designTalk: "洛潔莉雅一開始就確定好武器了，既然武器是娃娃的話，就會想到蘿莉塔，所以形象就這麼出來了。\n有點後知後覺的是我才發現自己當時應該是有參考到薔薇少女的真紅吧，外觀形象都有些類似。\n洛潔莉雅的個性不像她妝扮一樣乖巧，她做事有自己的標準、不會輕易被哄騙和動搖，雖然個子嬌小但卻總能展現出前輩的餘裕。",
    tags: [
      "合法蘿莉",
      "方言腔調",
      "蘿莉塔",
      "前輩"
    ]
  }
};

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
let designTalkText = document.getElementById("designTalkText");

function createDesignTalkPanel() {
  if (designTalkText || !tagList) return;

  const tagPanel = tagList.closest(".subpanel");
  const analysisGrid = tagPanel?.parentElement;

  if (!tagPanel || !analysisGrid) return;

  const designPanel = document.createElement("div");
  designPanel.className = "subpanel";

  const designHead = document.createElement("div");
  designHead.className = "subhead";
  designHead.textContent = "角色雜談設計";

  designTalkText = document.createElement("p");
  designTalkText.className = "body-text";
  designTalkText.id = "designTalkText";
  designTalkText.textContent = "---";

  designPanel.appendChild(designHead);
  designPanel.appendChild(designTalkText);

  analysisGrid.insertBefore(designPanel, tagPanel);
}

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

createDesignTalkPanel();

if (designTalkText) {
  designTalkText.textContent = data.designTalk || "暫無角色雜談設計紀錄。";
}

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
