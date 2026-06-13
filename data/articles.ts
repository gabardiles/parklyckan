/**
 * Blog / "Nyheter" content — full articles hosted on our own platform.
 * Text and imagery are copied from the original parklyckan.com features;
 * nothing links back out. Images live under /public/images.
 */

const IMG = "/images";

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "h2"; text: string };

export type Article = {
  slug: string;
  category: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  cover: string; // card thumbnail
  hero: string; // article header image
  gallery: string[];
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "centralen-padel",
    category: "I området",
    eyebrow: "Bara ett bollslag bort",
    title: "Centralen Padel",
    excerpt:
      "Specialbyggda banor, gym, konferens och restaurang – en mötesplats för padelälskare bara ett stenkast från Parklyckan.",
    cover: `${IMG}/start_artikelblock_cep.original.jpg`,
    hero: `${IMG}/artikel_cep_hero.original.jpg`,
    gallery: [
      `${IMG}/artikel_cep_1.original.jpg`,
      `${IMG}/artikel_cep_2.original.jpg`,
      `${IMG}/artikel_cep_3.original.jpg`,
      `${IMG}/artikel_cep_4.original.jpg`,
    ],
    body: [
      {
        type: "lead",
        text: "Från en av grannbyggnaderna till Parklyckan strömmar det peppade gäng i träningskläder, strålande av endorfiner. På de nybyggda spelplanerna flyger bollarna mellan glasen och spelare följer dem intensivt med blicken. Centralen Padel är ett nytt träningscenter som erbjuder ett flertal aktiviteter främst för de padelintresserade, men man har absolut något för alla.",
      },
      {
        type: "p",
        text: "2017 drog Magnus Jönsson igång med projektet som skulle bli en av Båstads största och mest välutrustade träningsanläggningar. Med en tydlig vision såg han till att Centralen Padel blev en anläggning för att hjälpa spelare utvecklas och trivas. De lapisblåa mattorna är noggrant limmade mot golvet för att ge bollen rätt studs under spelet och enorma takfläktar ser till att det cirkulerar bra luft i hallen.",
      },
      {
        type: "quote",
        text: "Folk med andnings- och hälsobesvär har berättat för oss att de kunnat spela på våra banor utan problem. Fläktarna var något jag visste från början att vi skulle ha och man märker verkligen att det gör skillnad!",
      },
      {
        type: "p",
        text: "I anslutning till padelanläggningen hittar vi även ett Nordic Wellness gym med en mängd maskiner och redskap, stora konferenslokaler och en restaurang som drivs i samarbete med en av västkustens mest etablerade krögare. Där serveras det alla möjliga nyttigheter för att snabbt fylla på med energi efter en intensiv padelmatch, ett svettigt träningspass eller för de som helt enkelt bara är ute efter en god hälsosam lunch.",
      },
      {
        type: "p",
        text: "I hallen arrangeras event av olika slag både av privatpersoner men också av anläggningen. Varje fredag hålls det AW padel där folk kan ladda om inför helgen och svettas ut det sista innan helgens aktiviteter. Du kan även delta i en tidig omgång frukostpadel som avslutas på övervåningen i det köksutrustade konferensrummet innan du tar dig vidare till jobbet.",
      },
      {
        type: "p",
        text: "Det är en träningsanläggning anpassad för både lyx och nöje utöver träning, dit fantaster och elitspelare dras för att kunna träna under optimala förutsättningar. I respektive omklädningsrum finns bastu med spegelglas ut mot spelplanerna där man kan varva ner i värmen under tiden man underhålls av de andra spelarnas padelmatcher.",
      },
      {
        type: "p",
        text: "I bättre väder kan du även njuta av anläggningens två utomhusbanor och kanske varva ner efteråt med en promenad ner till den vackra sandstranden och ta ett dopp i havet. På bara tio minuter kan du ta dig från de livliga banorna ner till lugnet vid det svalkande havet. I kvarteret Tuvelyckan har man allt man behöver för att inte enbart gå upp i varv utan även varva ner och slappna av.",
      },
    ],
  },
  {
    slug: "bread-on-wine",
    category: "I området",
    eyebrow: "Från tidig morgon till sen kväll",
    title: "Bread on Wine",
    excerpt:
      "Bageri, café och vinbar i grannhuset – nybakat surdegsbröd på morgonen, lunch och tapas med ett glas vin när dagen går mot kväll.",
    cover: `${IMG}/start_artikelblock_bow.original.jpg`,
    hero: `${IMG}/artikel_bow_hero.original.jpg`,
    gallery: [
      `${IMG}/artikel_bow_1.original.jpg`,
      `${IMG}/artikel_bow_2.original.jpg`,
      `${IMG}/artikel_bow_3.original.jpg`,
      `${IMG}/artikel_bow_4.original.jpg`,
      `${IMG}/artikel_bow_5.original.jpg`,
    ],
    body: [
      {
        type: "lead",
        text: "I grannbyggnaden ligger Bread on Wine, ett bageri, café och kvarterets dunkla vinbar. Den tidiga morgonmänniskan som promenerar förbi lägger märke till den uppiggande doften av nybakat surdegsbröd direkt från ugnen.",
      },
      {
        type: "p",
        text: "När frukosthandeln är förbi förvandlas bageriet till ett mysigt lunchställe som varierar mellan utsökta kvalitetsrätter som exempelvis vegetarisk lasagne, getostgratinerad squash eller varför inte goshujanggriljerad kotlettrad med kimchi och potatissallad? Bread on Wine funkar utmärkt som lunchställe oavsett hur hungrig man är med sitt breda utbud av alla delikatesser från smörgåsar och bakverk till varmrätter och utvalda viner.",
      },
      {
        type: "quote",
        text: "Bread on Wine är en mötesplats för hela dagen. Hit kan man komma för att koppla av från morgon till kväll.",
      },
      {
        type: "p",
        text: "Ägaren Niclas beskriver stället som ett minibageri där gäster kan sitta med en kaffe och frukostfralla i väntan på sitt tåg eller buss. Den lugna atmosfären som omsveper lokalen under morgonen är det perfekta uppvaknandet innan en arbetsdag eller händelsefull dag av aktiviteter. Under eftermiddagen ser vi stället fyllas upp och i butiken ser vi mannen som ska köpa bröd med sig hem efter jobbet, vännerna som längtar efter handgjorda bakverk till sitt kaffe, och paret som planerar att sitta ute med ett gott glas vin och fantastiska tilltugg.",
      },
      {
        type: "p",
        text: "Namnet ”Bread on Wine” refererar till det klassiska ursprunget av tapas, som kommer från det spanska verbet ”tapar” som betyder ”att täcka för”. För att hålla fruktflugor borta från vinet brukade man lägga en bit bröd över glaset. På senare tid uppkom trenden att dekorera brödet med smarriga tilltugg och så uppkom den moderna tolkningen av tapas som även den finns tillgänglig i detta läckra bageri.",
      },
      {
        type: "p",
        text: "Bread on Wine kan idag upplevas i Båstad och på den sydsvenska ön Ven där bageriet grundades 2018. Ägaren och grundaren Niclas Robertsson har en lång erfarenhet i restaurangvärlden och har tidigare drivit den hyllade Pio Countryclub utanför Halmstad. Idag driver han två fantastiska bageribarer med sin fru Anneli, och hoppas expandera med fler och större bagerier i framtiden.",
      },
      {
        type: "h2",
        text: "Vad skulle du rekommendera för den som vill varva ner efter jobbet på hemvägen?",
      },
      {
        type: "quote",
        text: "Jag skulle rekommendera ett glas av Bread on Wines egna Nebbiolo med lite tapas och mindre tilltugg till. Att luta sig tillbaka och bara spana ut över tåg och bilar där de kör förbi och ta in lugnet.",
      },
    ],
  },
  {
    slug: "bjarehalvons-chark-delikatesser",
    category: "I området",
    eyebrow: "Närproducerade delikatesser i mängder",
    title: "Bjärehalvöns Chark & Delikatesser",
    excerpt:
      "Familjens charkuteritradition sedan 1932, tio minuters promenad från Parklyckan – delikatesser och råvaror av kvalitet från svenska gårdar.",
    cover: `${IMG}/start_artikelblock_bcd.original.jpg`,
    hero: `${IMG}/artikel_bcd_hero.original.jpg`,
    gallery: [
      `${IMG}/artikel_bcd_1.original.jpg`,
      `${IMG}/artikel_bcd_2.original.jpg`,
      `${IMG}/artikel_bcd_3.original.jpg`,
      `${IMG}/artikel_bcd_4.original.jpg`,
      `${IMG}/artikel_bcd_5.original.jpg`,
    ],
    body: [
      {
        type: "lead",
        text: "Låt dig läskas av det enorma urvalet av delikatesser, där du över disken möts av en strålande personal med varm service. På Bjärehalvöns Chark & Delikatesser finner du råvaror av kvalitet med kött från svenska gårdar. Här – med gångavstånd från Parklyckans lägenheter – kan du få tag på de mest utsökta munsbitarna till en smakrik lyxkväll.",
      },
      {
        type: "p",
        text: "Lina Heberlein och mamma Marie som driver Bjärehalvöns Chark & Delikatesser är båda uppvuxna i charkvärlden med ett arv som gått i flera generationer, ända sedan Maries farfar Hilmer Heberlein kom till Förslöv för att ta över sin slakteriverksamhet 1932. Fem år senare öppnades butiken som stått grund för familjen Heberleins etablerade charkuteri.",
      },
      {
        type: "quote",
        text: "Jag har alltid varit intresserad av mat. Mina föräldrar jobbade väldigt mycket när jag var liten så jag fick lära mig laga middag själv med råvaror från charken.",
      },
      {
        type: "p",
        text: "Lina Heberlein började sin karriär som elvaåring då hon jobbade med familjen på Heberleins med att göra matpajer två dagar i veckan. Hon såg hur mycket hennes föräldrar jobbade och trodde då inte att hon skulle följa i familjens spår. Men hon har aldrig varit rädd för att ta i så efter att ha hunnit jobba i USA och plugga i Spanien kom hon tillbaka 2005 med längtan att få jobba med familjeföretaget. 2013 slutade Lina på Heberleins för att med hjälp av mamma Marie ta hand om Bjärehalvöns Chark & Delikatesser.",
      },
      {
        type: "p",
        text: "Bjärehalvöns Chark & Delikatesser ligger i samma hus som Willys precis utanför kassalinjen, tio minuters promenadavstånd från Parklyckans lägenheter. Belöna dig själv med en lunchlåda gjord från grunden på både kött och mjölkprodukter från svenska gårdar eller grillsåser och äppelmust att avnjuta till det enorma utbudet av delikatesser för grillkvällen.",
      },
      {
        type: "p",
        text: "När högtiderna närmar sig hittar du här rader av godsaker för både julbord, påskbord och midsommarbuffén. Den som besöker butiken inför helgdagarna möts av rad efter rad av läskande råvaror för de mest smakrika festerna. Inför nyår kan man även beställa en lyxig trerätters middag och avsluta året med ett pang.",
      },
      {
        type: "h2",
        text: "Vad skulle du rekommendera för en lyxig myskväll hemma?",
      },
      {
        type: "quote",
        text: "Jag skulle absolut föreslå vårt erbjudande med förplock för två där man får med ost, chark, inläggningar med mera för bara 150 kr. Är man fler kan man ju även beställa catering och färdiga rätter och njuta av en middag på fantastiska råvaror.",
      },
    ],
  },
];

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);
