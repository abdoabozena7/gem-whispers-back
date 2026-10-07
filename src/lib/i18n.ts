export type Lang = "en" | "ar" | "fr";
export type Age = "child" | "teen" | "adult";

export const LANGS: { id: Lang; native: string; ai: string }[] = [
  { id: "en", native: "English", ai: "English" },
  { id: "ar", native: "العربية", ai: "Arabic (simple Modern Standard / Egyptian-friendly)" },
  { id: "fr", native: "Français", ai: "French" },
];

const dict = {
  translationNeeded: { en: "TRANSLATION NEEDED", ar: "الترجمة مطلوبة", fr: "TRADUCTION REQUISE" },
  lockedTitle: { en: "Egypt has forgotten how to live.", ar: "نسيت مصر كيف تعيش.", fr: "L’Égypte a oublié comment vivre." },
  lockedBody: { en: "Find the stone that speaks two tongues.", ar: "ابحث عن الحجر الذي يتكلم لغتين.", fr: "Trouvez la pierre qui parle deux langues." },
  scan: { en: "SCAN", ar: "امسح", fr: "SCANNER" },
  begin: { en: "BEGIN", ar: "ابدأ", fr: "COMMENCER" },
  continue: { en: "CONTINUE JOURNEY", ar: "أكمل الرحلة", fr: "REPRENDRE" },
  welcomeBack: { en: "Welcome back. Your Egypt waited for you.", ar: "مرحبًا بعودتك. مصر كانت في انتظارك.", fr: "Bon retour. Votre Égypte vous attendait." },
  yourCiv: { en: "YOUR CIVILIZATION", ar: "حضارتك", fr: "VOTRE CIVILISATION" },
  living: { en: "Living Egypt", ar: "مصر الحيّة", fr: "Égypte vivante" },
  restored: { en: "RESTORED", ar: "مستعاد", fr: "RESTAURÉ" },
  problem: { en: "A PROBLEM IN YOUR CITY", ar: "مشكلة في مدينتك", fr: "UN PROBLÈME DANS VOTRE VILLE" },
  discover: { en: "DISCOVER", ar: "اكتشف", fr: "DÉCOUVRIR" },
  discovery: { en: "DISCOVERY", ar: "اكتشاف", fr: "DÉCOUVERTE" },
  frame: { en: "FRAME AN ARTIFACT", ar: "وجّه الكاميرا نحو قطعة أثرية", fr: "CADREZ UN ARTEFACT" },
  reading: { en: "READING ARTIFACT", ar: "قراءة القطعة", fr: "LECTURE DE L’ARTEFACT" },
  simulate: { en: "SIMULATE ARTIFACT SCAN", ar: "محاكاة المسح", fr: "SIMULER LE SCAN" },
  museumHolds: { en: "The museum holds what your civilization has forgotten.", ar: "المتحف يحمل ما نسيته حضارتك.", fr: "Le musée garde ce que votre civilisation a oublié." },
  found: { en: "ARTIFACT DISCOVERED", ar: "تم اكتشاف قطعة أثرية", fr: "ARTEFACT DÉCOUVERT" },
  knowledge: { en: "KNOWLEDGE", ar: "المعرفة", fr: "SAVOIR" },
  restore: { en: "RESTORE", ar: "استعِد", fr: "RESTAURER" },
  seeChange: { en: "SEE WHAT CHANGED", ar: "شاهد ما تغيّر", fr: "VOIR LE CHANGEMENT" },
  peopleSay: { en: "YOUR PEOPLE SAY", ar: "شعبك يقول", fr: "VOTRE PEUPLE DIT" },
  whatSolves: { en: "What did the ancient Egyptians know that solves this?", ar: "ما الذي عرفه المصريون القدماء ليحلّوا هذا؟", fr: "Qu’est-ce que les anciens Égyptiens savaient pour résoudre cela ?" },
  hint: { en: "GIVE ME A HINT", ar: "أعطني تلميحًا", fr: "UN INDICE" },
  hintN: { en: "HINT", ar: "تلميح", fr: "INDICE" },
  startDiscovery: { en: "SEARCH THE MUSEUM", ar: "ابحث في المتحف", fr: "CHERCHER AU MUSÉE" },
  thinking: { en: "Listening to your people…", ar: "نستمع إلى شعبك…", fr: "Écoute de votre peuple…" },
  myEgypt: { en: "MY EGYPT", ar: "مصري", fr: "MON ÉGYPTE" },
  knowledgeRestored: { en: "KNOWLEDGE RESTORED", ar: "المعرفة المستعادة", fr: "SAVOIR RESTAURÉ" },
  artifacts: { en: "Artifacts", ar: "قطع", fr: "Artefacts" },
  areas: { en: "Knowledge", ar: "معارف", fr: "Savoirs" },
  structures: { en: "Structures", ar: "مبانٍ", fr: "Édifices" },
  identity: { en: "CIVILIZATION IDENTITY", ar: "هوية الحضارة", fr: "IDENTITÉ" },
  shaped: { en: "Your Egypt is shaped by what you rediscover.", ar: "مصرك تتشكّل بما تعيد اكتشافه.", fr: "Votre Égypte se façonne par vos découvertes." },
  restart: { en: "Start a new journey", ar: "ابدأ رحلة جديدة", fr: "Nouveau voyage" },
  chooseTongue: { en: "Choose your tongue", ar: "اختر لغتك", fr: "Choisissez votre langue" },
  chooseAge: { en: "How old are you?", ar: "كم عمرك؟", fr: "Quel âge avez-vous ?" },
  child: { en: "Under 12", ar: "أقل من ١٢", fr: "Moins de 12" },
  teen: { en: "12 – 17", ar: "١٢ – ١٧", fr: "12 – 17" },
  adult: { en: "18+", ar: "+١٨", fr: "18+" },
  decoded: { en: "THE LANGUAGE RETURNS", ar: "عادت اللغة", fr: "LA LANGUE REVIENT" },
  rosetta: { en: "Rosetta Stone", ar: "حجر رشيد", fr: "Pierre de Rosette" },
  rosettaDetail: { en: "One decree in three scripts — the key that let us read the ancient Egyptians again.", ar: "مرسوم واحد بثلاث كتابات — المفتاح الذي جعلنا نقرأ المصريين القدماء من جديد.", fr: "Un décret en trois écritures — la clé pour relire les anciens Égyptiens." },
  temple: { en: "Temple", ar: "المعبد", fr: "Temple" },
  templeDone: { en: "Temple Restored", ar: "المعبد استُعيد", fr: "Temple restauré" },
  findNeed: { en: "FIND WHAT WE NEED", ar: "ابحث عمّا نحتاجه", fr: "TROUVER CE QU’IL FAUT" },
  inAction: { en: "KNOWLEDGE IN ACTION", ar: "المعرفة تعمل", fr: "LE SAVOIR AGIT" },
  before: { en: "BEFORE", ar: "قبل", fr: "AVANT" },
  after: { en: "AFTER", ar: "بعد", fr: "APRÈS" },
} satisfies Record<string, Record<Lang, string>>;

export type Key = keyof typeof dict;
export const tr = (k: Key, lang: Lang) => dict[k][lang];

/** Deterministic hieroglyph rendering of any text, keeping spaces so layout breathes. */
export function toGlyphs(text: string) {
  let out = "";
  for (const ch of text) {
    if (/\s/.test(ch)) { out += ch; continue; }
    if (/[.,!?…—–:;’'"()+\-\d]/.test(ch)) continue;
    const code = ch.codePointAt(0) ?? 0;
    out += String.fromCodePoint(0x13000 + ((code * 37) % 1070));
  }
  return out || "𓂀";
}

export type Knowledge = "Agriculture" | "Religion" | "Architecture" | "Writing" | "Trade" | "Medicine" | "Government" | "Military";

export const knowledgeName: Record<Knowledge, Record<Lang, string>> = {
  Agriculture: { en: "Agriculture", ar: "الزراعة", fr: "Agriculture" },
  Religion: { en: "Religion", ar: "الدين", fr: "Religion" },
  Architecture: { en: "Architecture", ar: "العمارة", fr: "Architecture" },
  Writing: { en: "Writing", ar: "الكتابة", fr: "Écriture" },
  Trade: { en: "Trade", ar: "التجارة", fr: "Commerce" },
  Medicine: { en: "Medicine", ar: "الطب", fr: "Médecine" },
  Government: { en: "Government", ar: "الحكم", fr: "Gouvernement" },
  Military: { en: "Military", ar: "الدفاع", fr: "Défense" },
};

export const artifactText: Record<Knowledge, { name: Record<Lang, string>; detail: Record<Lang, string>; reaction: Record<Lang, string> }> = {
  Agriculture: { name: { en: "Ancient Irrigation Tool", ar: "أداة ري قديمة", fr: "Outil d’irrigation" }, detail: { en: "Egyptians controlled water and made the land grow.", ar: "تحكّم المصريون في الماء وجعلوا الأرض تُنبت.", fr: "Les Égyptiens maîtrisaient l’eau et faisaient pousser la terre." }, reaction: { en: "Dry cracked earth turns green. Water flows. Farmers return.", ar: "الأرض المتشققة تخضرّ. الماء يجري. الفلاحون يعودون.", fr: "La terre craquelée verdit. L’eau coule." } },
  Religion: { name: { en: "Temple Relief", ar: "نقش معبد", fr: "Relief de temple" }, detail: { en: "Belief gave purpose to places and communities.", ar: "الإيمان أعطى للأماكن والناس معنى.", fr: "La croyance donnait un sens aux lieux." }, reaction: { en: "A sacred outline glows in the sand, waiting to be built.", ar: "شكل مقدّس يتوهج في الرمال ينتظر البناء.", fr: "Un tracé sacré brille dans le sable." } },
  Architecture: { name: { en: "Stone Column Fragment", ar: "جزء من عمود حجري", fr: "Fragment de colonne" }, detail: { en: "Stone became structures built to outlast generations.", ar: "صار الحجر مبانيَ تعيش لأجيال.", fr: "La pierre devint des édifices durables." }, reaction: { en: "Columns rise — but the temple stands unfinished.", ar: "الأعمدة ترتفع — لكن المعبد لم يكتمل.", fr: "Les colonnes s’élèvent — temple inachevé." } },
  Writing: { name: { en: "Papyrus Fragment", ar: "قطعة بردية", fr: "Fragment de papyrus" }, detail: { en: "Knowledge could be recorded and preserved.", ar: "صار ممكنًا تسجيل المعرفة وحفظها.", fr: "Le savoir pouvait être conservé." }, reaction: { en: "Scribes arrive. Golden inscriptions complete the temple.", ar: "الكتبة يصلون. نقوش ذهبية تكمل المعبد.", fr: "Les scribes arrivent. Le temple est achevé." } },
  Government: { name: { en: "Royal Seal", ar: "ختم ملكي", fr: "Sceau royal" }, detail: { en: "Authority organized people, work and decisions.", ar: "السلطة نظّمت الناس والعمل والقرارات.", fr: "L’autorité organisait le travail." }, reaction: { en: "A palace rises. The growing city finds order.", ar: "قصر يرتفع. المدينة تجد النظام.", fr: "Un palais s’élève. La ville s’organise." } },
  Trade: { name: { en: "Trading Vessel", ar: "مركب تجاري", fr: "Navire marchand" }, detail: { en: "Goods and ideas moved along the Nile.", ar: "انتقلت البضائع والأفكار عبر النيل.", fr: "Biens et idées voyageaient sur le Nil." }, reaction: { en: "Boats sail. A market fills with color.", ar: "المراكب تبحر. السوق يمتلئ بالألوان.", fr: "Les bateaux naviguent. Le marché s’anime." } },
  Medicine: { name: { en: "Medical Papyrus", ar: "بردية طبية", fr: "Papyrus médical" }, detail: { en: "Healing knowledge protected a growing population.", ar: "معرفة الشفاء حمت شعبًا يكبر.", fr: "La médecine protégeait la population." }, reaction: { en: "A house of healing opens its doors.", ar: "بيت للشفاء يفتح أبوابه.", fr: "Une maison de soins ouvre." } },
  Military: { name: { en: "Ancient Weapon", ar: "سلاح قديم", fr: "Arme ancienne" }, detail: { en: "Defenses protected settlements and their knowledge.", ar: "الدفاعات حمت المدن ومعرفتها.", fr: "Les défenses protégeaient la cité." }, reaction: { en: "Walls rise around everything you restored.", ar: "أسوار ترتفع حول كل ما استعدته.", fr: "Des murs entourent votre savoir." } },
};

export const fallbackProblem: Record<Knowledge, Record<Lang, string>> = {
  Agriculture: { en: "The river is right there, yet our fields crack under the sun and our children go hungry. How do we bring the water to the land?", ar: "النهر بجوارنا، لكن حقولنا تتشقق تحت الشمس وأطفالنا جائعون. كيف نوصل الماء إلى الأرض؟", fr: "Le fleuve est là, mais nos champs se fendent et nos enfants ont faim. Comment amener l’eau à la terre ?" },
  Religion: { en: "We have food, but no place where we gather, celebrate or ask the sky for hope. What gave the ancients a shared heart?", ar: "لدينا طعام، لكن لا مكان نجتمع فيه ونحتفل ونرجو السماء. ما الذي جمع قلوب القدماء؟", fr: "Nous avons à manger, mais aucun lieu pour nous rassembler. Qu’est-ce qui unissait les anciens ?" },
  Architecture: { en: "We dream of a sacred house, but mud walls melt in the rain. How did the ancients make buildings that last thousands of years?", ar: "نحلم ببيت مقدّس، لكن جدران الطين تذوب. كيف بنى القدماء ما يعيش آلاف السنين؟", fr: "Nos murs de boue fondent. Comment les anciens bâtissaient-ils pour des millénaires ?" },
  Writing: { en: "Our wisest elder is old, and when she is gone, everything she knows will vanish. How can memory outlive a person?", ar: "أحكم شيوخنا كبرت، وحين ترحل ستضيع كل معرفتها. كيف تعيش الذاكرة بعد صاحبها؟", fr: "Notre sage vieillit, et son savoir disparaîtra avec elle. Comment la mémoire survit-elle ?" },
  Government: { en: "So many people now live here that everyone argues about who builds, who farms and who decides. Who keeps a city together?", ar: "صار الناس كثيرين، والكل يتجادل: من يبني، ومن يزرع، ومن يقرّر؟ من يحفظ المدينة متماسكة؟", fr: "Tant de gens vivent ici que tout le monde se dispute. Qui tient une ville ensemble ?" },
  Trade: { en: "Our granaries overflow while other villages lack what we have — and have what we lack. How did the ancients share across the river?", ar: "مخازننا ممتلئة، وقرى أخرى عندها ما ينقصنا. كيف تبادل القدماء الخيرات عبر النهر؟", fr: "Nos greniers débordent, d’autres villages ont ce qui nous manque. Comment échanger ?" },
  Medicine: { en: "A fever spreads through the houses and no one knows what to do. Did the ancients know how to heal?", ar: "حمّى تنتشر في البيوت ولا أحد يعرف ماذا يفعل. هل عرف القدماء كيف يشفون؟", fr: "Une fièvre se répand. Les anciens savaient-ils guérir ?" },
  Military: { en: "Strangers watch our rich city from the desert at night. How did the ancients protect what they built?", ar: "غرباء يراقبون مدينتنا من الصحراء ليلًا. كيف حمى القدماء ما بنوه؟", fr: "Des étrangers observent notre cité la nuit. Comment les anciens se protégeaient-ils ?" },
};
