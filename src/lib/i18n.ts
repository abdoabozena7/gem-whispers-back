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
  hintUse: { en: "What it does", ar: "بيعمل إيه؟", fr: "Son utilité" },
  hintLook: { en: "What it looks like", ar: "شكله إيه؟", fr: "Son apparence" },
  hintAnswer: { en: "The object to find", ar: "القطعة اللي تدور عليها", fr: "L’objet à trouver" },
  nextHint: { en: "A CLEARER HINT", ar: "تلميح أوضح", fr: "UN INDICE PLUS CLAIR" },
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
  level: { en: "LEVEL", ar: "المستوى", fr: "NIVEAU" },
  levelUp: { en: "YOUR EGYPT EVOLVES", ar: "مصر بتاعتك بتتطور", fr: "L’ÉGYPTE ÉVOLUE" },
  chapter: { en: "DISCOVERY", ar: "الاكتشاف", fr: "DÉCOUVERTE" },
  journey: { en: "YOUR JOURNEY", ar: "رحلتك", fr: "VOTRE PARCOURS" },
  whereLook: { en: "WHERE SHOULD I LOOK?", ar: "أدور فين؟", fr: "OÙ CHERCHER ?" },
  museumHelp: { en: "ASK A GEM GUIDE", ar: "اسأل مرشد المتحف", fr: "DEMANDER À UN GUIDE" },
  locationUnverified: { en: "Demo object: its display location is not verified. Show this name to a GEM guide before searching.", ar: "قطعة في التجربة: مكان عرضها مش مؤكّد. ورّي الاسم ده لمرشد المتحف قبل ما تدور.", fr: "Objet de démonstration : emplacement non vérifié. Montrez ce nom à un guide avant de chercher." },
  childLocation: { en: "Ask a grown-up to show this name to a museum guide. We do not know where this object is displayed.", ar: "خلّي حد كبير يورّي الاسم ده لمرشد المتحف. مش عارفين القطعة معروضة فين.", fr: "Demande à un adulte de montrer ce nom à un guide. On ne sait pas où cet objet est exposé." },
  guideQuestion: { en: "Is this object on display? Where can I find it?", ar: "القطعة دي معروضة؟ أقدر ألاقيها فين؟", fr: "Cet objet est-il exposé ? Où puis-je le trouver ?" },
  nextDiscovery: { en: "NEXT DISCOVERY", ar: "الاكتشاف الجاي", fr: "PROCHAINE DÉCOUVERTE" },
  allRestored: { en: "EGYPT IS ALIVE", ar: "مصر رجعت للحياة", fr: "L’ÉGYPTE REVIT" },
  close: { en: "Close", ar: "إغلاق", fr: "Fermer" },
  journeyMenu: { en: "Journey menu", ar: "قائمة الرحلة", fr: "Menu du voyage" },
  rewards: { en: "EARNED CHAPTERS", ar: "فصول كسبتها", fr: "CHAPITRES GAGNÉS" },
  rewardUnlocked: { en: "STORY CHAPTER UNLOCKED", ar: "فتحت فصل جديد", fr: "CHAPITRE DÉBLOQUÉ" },
  readReward: { en: "Read your chapter", ar: "اقرأ الفصل", fr: "Lire le chapitre" },
  keepJourney: { en: "Keep my journey", ar: "كمّل رحلتي", fr: "Garder mon voyage" },
  restartConfirm: { en: "Begin again?", ar: "تبدأ من جديد؟", fr: "Recommencer ?" },
  restartWarning: { en: "Your discoveries, clues, and earned chapters will be cleared on this device.", ar: "اكتشافاتك وتلميحاتك والفصول اللي كسبتها هتتمسح من الجهاز ده.", fr: "Vos découvertes, indices et chapitres gagnés seront effacés sur cet appareil." },
  museumSource: { en: "Museum source", ar: "مصدر المتحف", fr: "Source du musée" },
  verifiedLocation: { en: "DOCUMENTED DISPLAY LOCATION", ar: "مكان عرض موثّق", fr: "EMPLACEMENT DOCUMENTÉ" },
  rosettaElsewhere: { en: "The Rosetta Stone is at the British Museum in London, not GEM. This scan is simulated.", ar: "حجر رشيد في المتحف البريطاني في لندن، مش في المتحف المصري الكبير. المسح ده محاكاة.", fr: "La pierre de Rosette est au British Museum à Londres, pas au GEM. Ce scan est simulé." },
} satisfies Record<string, Record<Lang, string>>;

export type Key = keyof typeof dict;
export const tr = (k: Key, lang: Lang, age?: Age | null) => (age ? ageLabels[age]?.[k]?.[lang] : undefined) ?? dict[k][lang];

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

/** Three concrete clues: purpose → appearance → exact artifact. */
export const fallbackHints: Record<Knowledge, Record<Lang, [string, string, string]>> = {
  Agriculture: { en: ["Look for something that helps people move river water to thirsty fields.", "Look for a tool used to lift or guide water, not a food container.", "Find the Ancient Irrigation Tool."], ar: ["دور على حاجة يقدروا يوصلوا بيها مية النهر للأرض العطشانة.", "دور على أداة بتساعدهم يرفعوا المية أو يوجّهوها للحقول، مش وعاء أكل.", "دور على أداة ري قديمة؛ هي اللي هتوصل المية للأرض."], fr: ["Cherche un objet qui amène l’eau du fleuve aux champs secs.", "Cherche un outil pour soulever ou guider l’eau, pas un récipient à nourriture.", "Trouve l’outil d’irrigation."] },
  Religion: { en: ["Look for something showing how people gathered to honor their gods.", "Look for a carved stone scene with people and gods, from a sacred building.", "Find the Temple Relief."], ar: ["دور على حاجة بتورّي الناس كانوا بيجتمعوا إزاي علشان يكرّموا آلهتهم.", "دور على مشهد محفور على حجر فيه ناس وآلهة، كان في مكان مقدّس.", "دور على نقش معبد؛ عليه مشاهد من طقوسهم."], fr: ["Cherche un objet montrant comment les gens honoraient leurs dieux.", "Cherche une scène sculptée sur pierre avec des gens et des dieux.", "Trouve le relief de temple."] },
  Architecture: { en: ["Look for something that helps hold up a heavy stone roof.", "Look for a tall round stone support, even if only a broken piece remains.", "Find the Stone Column Fragment."], ar: ["دور على حاجة يقدروا يسندوا بيها سقف حجري تقيل.", "دور على جزء من حجر طويل ومدوّر كان شايل السقف، حتى لو مكسور.", "دور على جزء من عمود حجري."], fr: ["Cherche quelque chose qui soutient un lourd toit en pierre.", "Cherche un support rond en pierre, même s’il est cassé.", "Trouve le fragment de colonne."] },
  Writing: { en: ["Look for something people could keep their ideas on, so they would not forget.", "Look for a thin plant-made sheet with ink marks, not carved stone.", "Find the Papyrus Fragment."], ar: ["دور على حاجة يقدروا يسجّلوا عليها أفكارهم علشان ما ينسوهاش.", "دور على ورقة رفيعة معمولة من نبات، وعليها علامات بالحبر، مش حجر.", "دور على قطعة بردية."], fr: ["Cherche un objet où garder les idées pour ne pas les oublier.", "Cherche une fine feuille végétale avec des marques à l’encre.", "Trouve le fragment de papyrus."] },
  Government: { en: ["Look for something that shows everyone a decision came from their ruler.", "Look for a small object pressed into clay to leave the ruler’s mark.", "Find the Royal Seal."], ar: ["دور على حاجة يقدروا يثبتوا بيها إن القرار جاي من الحاكم.", "دور على قطعة صغيرة بتتضغط في الطين وتسيب علامة الحاكم.", "دور على ختم ملكي."], fr: ["Cherche un objet qui prouve qu’une décision vient du dirigeant.", "Cherche un petit objet pressé dans l’argile pour laisser une marque royale.", "Trouve le sceau royal."] },
  Trade: { en: ["Look for something that carries extra food to another village along the river.", "Look for a boat with room for goods and a sail.", "Find the Trading Vessel."], ar: ["دور على حاجة يقدروا ينقلوا فيها الأكل الزيادة لقرية تانية عبر النهر.", "دور على مركب بشراع وفيه مكان للبضايع.", "دور على مركب تجاري."], fr: ["Cherche un objet qui transporte la nourriture vers un autre village par le fleuve.", "Cherche un bateau à voile avec de la place pour les marchandises.", "Trouve le navire marchand."] },
  Medicine: { en: ["Look for something that tells people what to do when someone is ill.", "Look for a plant-made sheet with remedies recorded in ink.", "Find the Medical Papyrus."], ar: ["دور على حاجة يعرفوا منها يعملوا إيه لما حد يتعب.", "دور على ورقة بردي مكتوب عليها وصفات وعلاجات بالحبر.", "دور على بردية طبية."], fr: ["Cherche un objet qui explique comment soigner un malade.", "Cherche une feuille de papyrus avec des remèdes écrits à l’encre.", "Trouve le papyrus médical."] },
  Military: { en: ["Look for something people could use to protect their homes from danger.", "Look for a pointed or sharp object held by a guard.", "Find the Ancient Weapon."], ar: ["دور على حاجة يقدروا يحموا بيها بيوتهم من الخطر.", "دور على قطعة مدبّبة أو حادّة كان الحارس بيمسكها.", "دور على سلاح قديم."], fr: ["Cherche un objet pour protéger les maisons du danger.", "Cherche un objet pointu ou tranchant tenu par un garde.", "Trouve l’arme ancienne."] },
};

/** A second real artifact per knowledge area — the scanner alternates between the two. */
export const artifactAlt: Record<Knowledge, { name: Record<Lang, string>; detail: Record<Lang, string> }> = {
  Agriculture: { name: { en: "Bronze Sickle", ar: "منجل برونزي", fr: "Faucille en bronze" }, detail: { en: "One sweep of bronze could harvest a whole row of grain.", ar: "ضربة واحدة من البرونز كانت تحصد صفًا كاملًا من القمح.", fr: "Un coup de faucille récoltait tout un rang de grain." } },
  Religion: { name: { en: "Funerary Mask of Tutankhamun", ar: "قناع توت عنخ آمون الجنائزي", fr: "Masque funéraire de Toutânkhamon" }, detail: { en: "Gold and gems guarded a young king's journey to eternity.", ar: "الذهب والأحجار الكريمة حرسوا رحلة ملك شاب نحو الخلود.", fr: "L’or et les gemmes gardaient le voyage d’un jeune roi vers l’éternité." } },
  Architecture: { name: { en: "Builder's Plumb Line", ar: "راسة البناء", fr: "Fil à plomb de constructeur" }, detail: { en: "A weighted cord showed true vertical — walls rose straight for millennia.", ar: "خيط مزنوق يُظهر الاستقامة — فقامت الجدران مستقيمة لآلاف السنين.", fr: "Un fil lesté montrait la verticale — des murs droits pour des millénaires." } },
  Writing: { name: { en: "Scribe's Palette", ar: "لوحة الكاتب", fr: "Palette de scribe" }, detail: { en: "Reeds, ink wells and pigments — the toolbox of memory itself.", ar: "أقلام من القصب وأحواض حبر وأصباغ — صندوق أدوات الذاكرة نفسه.", fr: "Roseaux, encre et pigments — la boîte à outils de la mémoire." } },
  Government: { name: { en: "Decree Stela", ar: "شاهد مرسوم ملكي", fr: "Stèle de décret" }, detail: { en: "A stone announcement every citizen could read in the square.", ar: "إعلان من حجر يستطيع كل مواطن قراءته في الساحة.", fr: "Une annonce de pierre que chaque citoyen pouvait lire." } },
  Trade: { name: { en: "Stone Trade Weights", ar: "أوزان تجارية حجرية", fr: "Poids de commerce en pierre" }, detail: { en: "Granite weights in debens made every exchange fair.", ar: "أوزان من الجرانيت بقياس الدبن جعلت كل مقايضة عادلة.", fr: "Des poids de granite rendaient chaque échange équitable." } },
  Medicine: { name: { en: "Bronze Surgical Tools", ar: "أدوات جراحية برونزية", fr: "Instruments chirurgicaux en bronze" }, detail: { en: "Fine bronze blades and probes — surgery three thousand years ago.", ar: "أشفرات ومسابر برونزية رفيعة — جراحة قبل ثلاثة آلاف سنة.", fr: "Lames et sondes fines — la chirurgie il y a trois mille ans." } },
  Military: { name: { en: "War Chariot", ar: "عربة حربية", fr: "Char de guerre" }, detail: { en: "Six-spoked wheels and a light frame — the desert's fastest defense.", ar: "عجلات بستة أضلاع وهيكل خفيف — أسرع دفاع في الصحراء.", fr: "Roues à six rayons et cadre léger — la défense la plus rapide du désert." } },
};

type Localized = Record<Lang, string>;
const ageLabels: Partial<Record<Age, Partial<Record<Key, Localized>>>> = {
  child: {
    yourCiv: { en: "YOUR EGYPT", ar: "مصر بتاعتك", fr: "TON ÉGYPTE" },
    problem: { en: "CAN YOU HELP?", ar: "تقدر تساعد؟", fr: "TU PEUX AIDER ?" },
    peopleSay: { en: "YOUR NEIGHBORS SAY", ar: "جيرانك بيقولوا", fr: "TES VOISINS DISENT" },
    whatSolves: { en: "Which object could help?", ar: "أنهي قطعة ممكن تساعد؟", fr: "Quel objet peut aider ?" },
    museumHolds: { en: "Find an object to help your town.", ar: "دور على قطعة تساعد مدينتك.", fr: "Trouve un objet pour aider ta ville." },
    simulate: { en: "SCAN AN OBJECT", ar: "امسح قطعة", fr: "SCANNER UN OBJET" },
    frame: { en: "FIND AN OBJECT", ar: "دور على قطعة", fr: "TROUVE UN OBJET" },
    found: { en: "YOU FOUND IT!", ar: "لقيتها!", fr: "TU L’AS TROUVÉ !" },
    restore: { en: "BRING BACK", ar: "رجّع", fr: "FAIRE REVENIR" },
    knowledge: { en: "WHAT IT TEACHES", ar: "بنتعلم منها إيه؟", fr: "CE QU’ON APPREND" },
    inAction: { en: "LOOK WHAT HAPPENED!", ar: "شوف اللي حصل!", fr: "REGARDE !" },
    knowledgeRestored: { en: "YOUR TOWN IS COMING BACK", ar: "مدينتك بترجع للحياة", fr: "TA VILLE REPREND VIE" },
    shaped: { en: "Every object helps your town grow.", ar: "كل قطعة بتساعد مدينتك تكبر.", fr: "Chaque objet aide ta ville à grandir." },
    welcomeBack: { en: "You’re back! Your town is waiting.", ar: "رجعت! مدينتك مستنياك.", fr: "Te revoilà ! Ta ville t’attend." },
    hint: { en: "HELP ME FIND IT", ar: "ساعدني ألاقيها", fr: "AIDE-MOI À TROUVER" },
    hintUse: { en: "What it helps with", ar: "بتساعد في إيه؟", fr: "À quoi ça sert" },
  },
  teen: {
    problem: { en: "YOUR CITY’S CHALLENGE", ar: "تحدّي مدينتك", fr: "LE DÉFI DE TA VILLE" },
    whatSolves: { en: "Which artifact could solve this?", ar: "أنهي قطعة أثرية ممكن تحل المشكلة؟", fr: "Quel objet pourrait résoudre ce problème ?" },
    museumHolds: { en: "The next solution is somewhere in the museum.", ar: "الحل الجاي مستنيك في المتحف.", fr: "La prochaine solution t’attend au musée." },
    simulate: { en: "SCAN AN ARTIFACT", ar: "امسح قطعة أثرية", fr: "SCANNER UN ARTEFACT" },
    frame: { en: "FIND AN ARTIFACT", ar: "دور على قطعة أثرية", fr: "TROUVE UN ARTEFACT" },
    peopleSay: { en: "FROM YOUR CITY", ar: "رسالة من مدينتك", fr: "MESSAGE DE TA VILLE" },
    shaped: { en: "Your discoveries shape what this city becomes.", ar: "اكتشافاتك بتحدد مدينتك هتبقى إيه.", fr: "Tes découvertes façonnent cette ville." },
  },
};

/** Each row is a concrete obstacle, purpose clue, and visual clue. No frightening stakes or metaphors. */
const ageNeeds: Record<Age, Record<Knowledge, Record<Lang, [string, string, string]>>> = {
  child: {
    Agriculture: { en: ["The plants need water. The river is too far away. Can you help?", "Find something that moves water to the plants.", "Look for a tool that lifts water from the river."], ar: ["الزرع محتاج مية. مية النهر مش واصلة له. تقدر تساعد؟", "دور على حاجة يقدروا يوصلوا بيها المية للزرع.", "دور على أداة بترفع المية من النهر."], fr: ["Les plantes ont besoin d’eau. L’eau du fleuve n’arrive pas. Tu peux aider ?", "Cherche un objet pour amener l’eau aux plantes.", "Cherche un outil qui soulève l’eau du fleuve."] },
    Religion: { en: ["Our neighbors want a special place to meet and honor their gods. What could help?", "Find something that shows people honoring their gods.", "Look for pictures of people and gods carved in stone."], ar: ["جيراننا عايزين مكان يجتمعوا فيه ويكرّموا آلهتهم. إيه يساعدهم؟", "دور على حاجة بتورّي الناس وهي بتكرّم آلهتها.", "دور على صور ناس وآلهة محفورة على حجر."], fr: ["Nos voisins veulent un lieu pour se réunir et honorer leurs dieux. Quel objet peut aider ?", "Cherche un objet montrant des gens qui honorent leurs dieux.", "Cherche des gens et des dieux sculptés dans la pierre."] },
    Architecture: { en: ["The stone roof is heavy. There is nothing to hold it up. What could help?", "Find something that holds up a roof.", "Look for a round piece of stone that stood tall."], ar: ["السقف الحجري تقيل. مفيش حاجة تسنده. إيه يساعدنا؟", "دور على حاجة يقدروا يسندوا بيها السقف.", "دور على حتة حجر مدوّرة كانت واقفة بالطول."], fr: ["Le toit en pierre est lourd. Rien ne le soutient. Quel objet peut aider ?", "Cherche quelque chose qui soutient un toit.", "Cherche un morceau de pierre rond qui tenait debout."] },
    Writing: { en: ["We keep forgetting our ideas. How can we keep them for later?", "Find something people can put their ideas on.", "Look for a thin sheet with ink marks."], ar: ["كل شوية بننسى أفكارنا. نحتفظ بيها إزاي؟", "دور على حاجة يقدروا يحطّوا عليها أفكارهم.", "دور على ورقة رفيعة عليها علامات بالحبر."], fr: ["On oublie nos idées. Comment les garder ?", "Cherche un objet où garder les idées.", "Cherche une feuille fine avec des marques à l’encre."] },
    Government: { en: ["Everyone wants to choose the next job. Who gets to decide?", "Find something that shows who made a decision.", "Look for a small object that leaves a mark in clay."], ar: ["كل واحد عايز يختار الشغل الجاي. مين يقرّر؟", "دور على حاجة يقدروا يبيّنوا بيها مين خد القرار.", "دور على قطعة صغيرة بتسيب علامة في الطين."], fr: ["Chacun veut choisir le prochain travail. Qui décide ?", "Cherche un objet qui montre qui a décidé.", "Cherche un petit objet qui laisse une marque dans l’argile."] },
    Trade: { en: ["We have extra food. How can we take it to the next village?", "Find something that carries food on the river.", "Look for a boat with a sail and room for food."], ar: ["عندنا أكل زيادة. نوصلّه للقرية اللي جنبنا إزاي؟", "دور على حاجة يقدروا ينقلوا فيها الأكل على النهر.", "دور على مركب بشراع وفيه مكان للأكل."], fr: ["Nous avons trop de nourriture. Comment l’apporter au village voisin ?", "Cherche un objet qui transporte la nourriture sur le fleuve.", "Cherche un bateau avec une voile et de la place."] },
    Medicine: { en: ["A neighbor feels sick. Where can we find a way to help?", "Find something that tells people how to help a sick person.", "Look for a thin sheet with remedies written in ink."], ar: ["جارنا تعبان. نلاقي طريقة نساعده بيها فين؟", "دور على حاجة يعرفوا منها يساعدوا حد تعبان إزاي.", "دور على ورقة رفيعة عليها وصفات بالحبر."], fr: ["Un voisin est malade. Où trouver une façon de l’aider ?", "Cherche un objet qui explique comment aider un malade.", "Cherche une feuille fine avec des remèdes à l’encre."] },
    Military: { en: ["Our town needs guards to keep homes safe. What could help them?", "Find something a guard uses to keep people safe.", "Look for a long or pointed object a guard could hold."], ar: ["مدينتنا محتاجة حُرّاس يحافظوا على البيوت. إيه يساعدهم؟", "دور على حاجة يقدروا يحموا بيها الناس.", "دور على قطعة طويلة أو مدبّبة يمسكها الحارس."], fr: ["Notre ville a besoin de gardes. Quel objet peut les aider ?", "Cherche un objet qu’un garde utilise pour protéger les gens.", "Cherche un objet long ou pointu qu’un garde peut tenir."] },
  },
  teen: {
    Agriculture: { en: ["The Nile is nearby, but its water cannot reach the dry fields. How could we redirect it?", "Look for something that moves river water to the fields.", "Look for a water-lifting tool, rather than a storage jar."], ar: ["النيل قريب، بس المية مش واصلة للأرض الناشفة. نغيّر مسارها إزاي؟", "دور على حاجة يقدروا ينقلوا بيها مية النهر للأرض.", "دور على أداة بترفع المية، مش جرّة لتخزينها."], fr: ["Le Nil est proche, mais l’eau n’atteint pas les champs secs. Comment la détourner ?", "Cherche un objet qui amène l’eau du fleuve aux champs.", "Cherche un outil pour soulever l’eau, pas une jarre."] },
    Religion: { en: ["The city has grown, but people have no shared place to honor their gods. What could bring them together?", "Look for evidence of people gathering to honor their gods.", "Look for a carved stone scene showing people and gods."], ar: ["المدينة كبرت، بس الناس معندهاش مكان يجتمعوا فيه لتكريم آلهتهم. إيه يجمعهم؟", "دور على حاجة بتورّي الناس وهي مجتمعة لتكريم آلهتها.", "دور على مشهد محفور على حجر فيه ناس وآلهة."], fr: ["La ville grandit, mais aucun lieu ne réunit les gens pour honorer leurs dieux. Qu’est-ce qui les rassemblerait ?", "Cherche une trace de rassemblements pour honorer les dieux.", "Cherche une scène sculptée dans la pierre avec des gens et des dieux."] },
    Architecture: { en: ["The builders have a heavy stone roof, but no supports underneath. What could carry its weight?", "Look for something that supports a heavy roof.", "Look for a broken section of a tall, round stone support."], ar: ["البنّائين عندهم سقف حجري تقيل، بس مفيش دعامات تحته. إيه يشيل وزنه؟", "دور على حاجة يقدروا يسندوا بيها سقف تقيل.", "دور على جزء مكسور من دعامة حجرية طويلة ومدوّرة."], fr: ["Les bâtisseurs ont un lourd toit en pierre, sans supports. Qu’est-ce qui porterait son poids ?", "Cherche un objet qui soutient un toit lourd.", "Cherche un morceau cassé d’un support rond en pierre."] },
    Writing: { en: ["People share useful ideas, but later forget them. How could those ideas last?", "Look for something that keeps a lasting record of ideas.", "Look for a thin plant-made sheet with ink marks."], ar: ["الناس بتشارك أفكار مفيدة، بس بتنسيها بعدين. نحتفظ بيها إزاي؟", "دور على حاجة يقدروا يسجّلوا عليها أفكارهم.", "دور على ورقة رفيعة معمولة من نبات وعليها حبر."], fr: ["Les gens partagent des idées utiles, puis les oublient. Comment les conserver ?", "Cherche un objet qui garde une trace des idées.", "Cherche une fine feuille végétale portant de l’encre."] },
    Government: { en: ["The city is busier, and people disagree about who assigns the work. How could a decision become official?", "Look for something that confirms a ruler’s decision.", "Look for a small object that stamps a royal mark into clay."], ar: ["المدينة بقت أكبر، والناس مختلفة على مين يوزّع الشغل. القرار يبقى رسمي إزاي؟", "دور على حاجة يقدروا يأكّدوا بيها قرار الحاكم.", "دور على قطعة صغيرة بتطبع علامة ملكية في الطين."], fr: ["La ville s’agrandit et les gens discutent de qui répartit le travail. Comment officialiser une décision ?", "Cherche un objet qui confirme la décision du dirigeant.", "Cherche un petit objet imprimant une marque royale dans l’argile."] },
    Trade: { en: ["We have extra grain, while a nearby village has goods we need. How could we exchange them across the Nile?", "Look for something that carries goods between villages.", "Look for a sailing boat with space for cargo."], ar: ["عندنا حبوب زيادة، وقرية قريبة عندها حاجات ناقصانا. نتبادلها عبر النيل إزاي؟", "دور على حاجة يقدروا ينقلوا فيها البضايع بين القرى.", "دور على مركب بشراع ومساحة للبضايع."], fr: ["Nous avons du grain en trop ; le village voisin a ce qui nous manque. Comment échanger sur le Nil ?", "Cherche un objet qui transporte des biens entre villages.", "Cherche un bateau à voile avec de la place pour les marchandises."] },
    Medicine: { en: ["A neighbor is unwell, but no one remembers the right remedy. Where could they look it up?", "Look for something that records ways to treat illness.", "Look for a plant-made sheet with remedies written in ink."], ar: ["جارنا تعبان، ومحدش فاكر الوصفة المناسبة. يلاقوها فين؟", "دور على حاجة مسجّل عليها طرق علاج المرض.", "دور على ورقة من نبات عليها وصفات علاج بالحبر."], fr: ["Un voisin est malade, mais personne ne se rappelle le remède. Où le retrouver ?", "Cherche un objet qui conserve des remèdes.", "Cherche une feuille végétale avec des remèdes à l’encre."] },
    Military: { en: ["The settlement needs guards to protect its homes. What equipment could help them?", "Look for something guards used to protect a settlement.", "Look for a pointed or sharp object held by a guard."], ar: ["المدينة محتاجة حُرّاس يحموا بيوتها. إيه المعدات اللي تساعدهم؟", "دور على حاجة كان الحُرّاس بيستخدموها لحماية المدينة.", "دور على قطعة مدبّبة أو حادّة يمسكها الحارس."], fr: ["La ville a besoin de gardes pour protéger les maisons. Quel équipement pourrait aider ?", "Cherche un objet utilisé par les gardes pour protéger la ville.", "Cherche un objet pointu ou tranchant tenu par un garde."] },
  },
  adult: {
    Agriculture: { en: ["The Nile flows beside us, but its water cannot reach the dry fields. How could we channel it?", ...fallbackHints.Agriculture.en.slice(0, 2) as [string, string]], ar: ["النيل بجوارنا، لكن مياهه لا تصل إلى الحقول الجافة. كيف نوجّهها إلى الأرض؟", ...fallbackHints.Agriculture.ar.slice(0, 2) as [string, string]], fr: ["Le Nil coule près de nous, mais l’eau n’atteint pas les champs secs. Comment l’acheminer ?", ...fallbackHints.Agriculture.fr.slice(0, 2) as [string, string]] },
    Religion: { en: ["The settlement lacks a shared sacred gathering place. What could reveal how the Egyptians created one?", ...fallbackHints.Religion.en.slice(0, 2) as [string, string]], ar: ["تفتقر المدينة إلى مكان مقدّس يجتمع فيه الناس. ما الذي يوضّح كيف أنشأه المصريون القدماء؟", ...fallbackHints.Religion.ar.slice(0, 2) as [string, string]], fr: ["La cité manque d’un lieu sacré commun. Quel objet montrerait comment les Égyptiens en créaient un ?", ...fallbackHints.Religion.fr.slice(0, 2) as [string, string]] },
    Architecture: { en: ["A heavy stone roof has no supports beneath it. What could distribute its weight safely?", ...fallbackHints.Architecture.en.slice(0, 2) as [string, string]], ar: ["السقف الحجري الثقيل لا توجد دعامات تحته. ما الذي يحمل وزنه بأمان؟", ...fallbackHints.Architecture.ar.slice(0, 2) as [string, string]], fr: ["Un lourd toit en pierre n’a aucun support. Qu’est-ce qui répartirait son poids ?", ...fallbackHints.Architecture.fr.slice(0, 2) as [string, string]] },
    Writing: { en: ["Useful knowledge is shared aloud, then forgotten. How could it become a lasting record?", ...fallbackHints.Writing.en.slice(0, 2) as [string, string]], ar: ["نتبادل المعرفة بالكلام ثم ننساها. كيف نحتفظ بسجلّ دائم لها؟", ...fallbackHints.Writing.ar.slice(0, 2) as [string, string]], fr: ["Le savoir est transmis oralement, puis oublié. Comment en garder une trace durable ?", ...fallbackHints.Writing.fr.slice(0, 2) as [string, string]] },
    Government: { en: ["As the city grows, people disagree over who assigns work. How could a ruler’s decision be recognized?", ...fallbackHints.Government.en.slice(0, 2) as [string, string]], ar: ["مع نمو المدينة يختلف الناس على من يوزّع العمل. كيف يثبتون أن القرار صادر عن الحاكم؟", ...fallbackHints.Government.ar.slice(0, 2) as [string, string]], fr: ["La cité grandit et les habitants discutent de qui répartit le travail. Comment reconnaître une décision du dirigeant ?", ...fallbackHints.Government.fr.slice(0, 2) as [string, string]] },
    Trade: { en: ["Our surplus grain cannot reach neighboring villages. What could carry goods along the Nile?", ...fallbackHints.Trade.en.slice(0, 2) as [string, string]], ar: ["الحبوب الزائدة لا تصل إلى القرى المجاورة. ما الذي ينقل البضائع عبر النيل؟", ...fallbackHints.Trade.ar.slice(0, 2) as [string, string]], fr: ["Notre surplus de grain n’atteint pas les villages voisins. Qu’est-ce qui transporterait les biens sur le Nil ?", ...fallbackHints.Trade.fr.slice(0, 2) as [string, string]] },
    Medicine: { en: ["A sick neighbor needs a remedy, but nobody remembers the instructions. Where could that knowledge be preserved?", ...fallbackHints.Medicine.en.slice(0, 2) as [string, string]], ar: ["جار مريض يحتاج إلى علاج، لكن لا أحد يتذكر الوصفة. أين يمكن حفظ هذه المعرفة؟", ...fallbackHints.Medicine.ar.slice(0, 2) as [string, string]], fr: ["Un voisin malade a besoin d’un remède dont personne ne se rappelle. Où conserver ce savoir ?", ...fallbackHints.Medicine.fr.slice(0, 2) as [string, string]] },
    Military: { en: ["The growing settlement needs protection for its homes. What could equip its guards?", ...fallbackHints.Military.en.slice(0, 2) as [string, string]], ar: ["المدينة المتنامية تحتاج إلى حماية بيوتها. ما الذي يجهّز حُرّاسها؟", ...fallbackHints.Military.ar.slice(0, 2) as [string, string]], fr: ["La cité en expansion doit protéger ses maisons. Quel objet équiperait ses gardes ?", ...fallbackHints.Military.fr.slice(0, 2) as [string, string]] },
  },
};

export const problemForAge = (k: Knowledge, lang: Lang, age: Age) => ageNeeds[age][k][lang][0];
export const hintsForAge = (k: Knowledge, lang: Lang, age: Age): [string, string, string] => [ageNeeds[age][k][lang][1], ageNeeds[age][k][lang][2], fallbackHints[k][lang][2]];

const childDetails: Record<Knowledge, Localized> = {
  Agriculture: { en: "This tool brings water to plants so they can grow.", ar: "الأداة دي بتوصل المية للزرع علشان يكبر.", fr: "Cet outil apporte de l’eau aux plantes pour les faire pousser." },
  Religion: { en: "These stone pictures show people honoring their gods.", ar: "الصور دي على الحجر بتورّي الناس وهي بتكرّم آلهتها.", fr: "Ces images en pierre montrent les gens honorant leurs dieux." },
  Architecture: { en: "A stone column holds up a heavy roof.", ar: "العمود الحجري بيسند السقف التقيل.", fr: "Une colonne en pierre soutient un toit lourd." },
  Writing: { en: "People put ink on this sheet to keep their ideas.", ar: "الناس حطّت حبر على الورقة دي علشان تحتفظ بأفكارها.", fr: "Les gens mettaient de l’encre sur cette feuille pour garder leurs idées." },
  Government: { en: "This little seal leaves a mark that means the ruler agreed.", ar: "الختم الصغير ده بيسيب علامة معناها إن الحاكم وافق.", fr: "Ce petit sceau laisse une marque qui veut dire que le dirigeant a accepté." },
  Trade: { en: "This boat carries food and other things between villages.", ar: "المركب ده بينقل الأكل والحاجات بين القرى.", fr: "Ce bateau transporte de la nourriture et des objets entre les villages." },
  Medicine: { en: "This sheet keeps instructions for helping sick people.", ar: "الورقة دي عليها وصفات تساعد الناس التعبانة.", fr: "Cette feuille garde des recettes pour aider les malades." },
  Military: { en: "Guards used this to keep homes safe.", ar: "الحُرّاس استخدموا دي علشان يحموا البيوت.", fr: "Les gardes utilisaient cet objet pour protéger les maisons." },
};
const simpleAlt: Record<Knowledge, Localized> = {
  Agriculture: { en: "This curved tool cuts grain when it is ready.", ar: "الأداة المنحنية دي بتقطع القمح لما يكبر.", fr: "Cet outil courbé coupe le grain quand il est mûr." },
  Religion: { en: "This gold mask shows the face of a young king. It was made to honor him after he died.", ar: "القناع الذهبي ده بيورّي وش ملك شاب. اتعمل لتكريمه بعد موته.", fr: "Ce masque en or montre un jeune roi. Il a été fait pour l’honorer après sa mort." },
  Architecture: { en: "A weight on a string helps builders make straight walls.", ar: "وزن مربوط في خيط بيساعد البنّائين يعملوا حيطان مستقيمة.", fr: "Un poids sur un fil aide les bâtisseurs à faire des murs droits." },
  Writing: { en: "This palette holds the ink and pens used to record ideas.", ar: "اللوحة دي فيها الحبر والأقلام اللي بيسجّلوا بيها أفكارهم.", fr: "Cette palette garde l’encre et les outils pour noter des idées." },
  Government: { en: "The ruler’s decision was put on this stone for people to see.", ar: "قرار الحاكم اتحطّ على الحجر ده علشان الناس تشوفه.", fr: "La décision du dirigeant était sur cette pierre pour que les gens la voient." },
  Trade: { en: "These stone weights help people measure goods fairly.", ar: "الأوزان الحجرية دي بتساعد الناس يقيسوا البضايع بعدل.", fr: "Ces poids en pierre aident à mesurer les marchandises équitablement." },
  Medicine: { en: "Healers used these small tools to care for people.", ar: "المعالجين استخدموا الأدوات الصغيرة دي علشان يعتنوا بالناس.", fr: "Les soignants utilisaient ces petits outils pour aider les gens." },
  Military: { en: "This light cart helped guards travel quickly.", ar: "العربة الخفيفة دي ساعدت الحُرّاس يتحركوا بسرعة.", fr: "Ce char léger aidait les gardes à se déplacer vite." },
};
const teenDetails: Record<Knowledge, Localized> = {
  Agriculture: { en: "Moving Nile water to dry fields helped Egyptians grow reliable crops.", ar: "نقل مية النيل للأرض الناشفة ساعد المصريين يزرعوا باستمرار.", fr: "Amener l’eau du Nil aux champs assurait les récoltes." },
  Religion: { en: "Carved scenes show the rituals that brought communities together.", ar: "المشاهد المحفورة بتورّي الطقوس اللي جمعت الناس.", fr: "Les scènes sculptées montrent les rites qui réunissaient les communautés." },
  Architecture: { en: "Stone columns spread the weight of heavy roofs and made larger buildings possible.", ar: "الأعمدة الحجرية وزّعت وزن السقف وخلّت المباني الأكبر ممكنة.", fr: "Les colonnes répartissaient le poids des toits pour bâtir plus grand." },
  Writing: { en: "Ink on papyrus let people keep ideas and pass them on.", ar: "الحبر على البردي خلّى الناس تحفظ أفكارها وتنقلها لغيرها.", fr: "L’encre sur le papyrus permettait de garder et transmettre les idées." },
  Government: { en: "A royal mark showed that a decision had the ruler’s approval.", ar: "العلامة الملكية كانت بتثبت إن الحاكم وافق على القرار.", fr: "Une marque royale prouvait qu’une décision était approuvée." },
  Trade: { en: "Sailing boats connected villages by carrying food, goods, and ideas along the Nile.", ar: "المراكب ربطت القرى ببعض بنقل الأكل والبضايع والأفكار عبر النيل.", fr: "Les voiliers reliaient les villages en transportant biens et idées sur le Nil." },
  Medicine: { en: "Recorded remedies let healers share what they knew about treating illness.", ar: "تسجيل الوصفات ساعد المعالجين يشاركوا معرفتهم بالعلاج.", fr: "Les remèdes écrits permettaient aux soignants de partager leurs connaissances." },
  Military: { en: "Guards used equipment like this to protect settlements.", ar: "الحُرّاس استخدموا معدات زي دي لحماية المدن.", fr: "Les gardes utilisaient cet équipement pour protéger les cités." },
};
export function artifactDetailForAge(k: Knowledge, lang: Lang, age: Age, alt = false) {
  if (age === "adult") return (alt ? artifactAlt : artifactText)[k].detail[lang];
  return (alt ? simpleAlt : age === "child" ? childDetails : teenDetails)[k][lang];
}
const childReactions: Record<Knowledge, Localized> = {
  Agriculture: { en: "Water reaches the plants. The fields turn green!", ar: "المية وصلت للزرع. الأرض بقت خضرا!", fr: "L’eau arrive ! Les champs deviennent verts !" },
  Religion: { en: "Your town has a place for its temple. Next, it needs supports.", ar: "مدينتك بقى فيها مكان للمعبد. دلوقتي محتاج دعامات.", fr: "Ta ville a une place pour son temple. Il lui faut des supports." },
  Architecture: { en: "The columns are here! The temple still needs its records.", ar: "الأعمدة وصلت! لسه المعبد محتاج سجلاته.", fr: "Les colonnes sont là ! Le temple attend ses textes." },
  Writing: { en: "The temple is ready! Look at its golden pictures.", ar: "المعبد بقى جاهز! شوف صوره الذهبية.", fr: "Le temple est prêt ! Regarde ses images dorées." },
  Government: { en: "A palace appears. Everyone knows their next job!", ar: "القصر ظهر. كل واحد عارف شغله الجاي!", fr: "Un palais apparaît. Chacun sait quoi faire !" },
  Trade: { en: "Boats are sailing! People bring things to the market.", ar: "المراكب بتبحر! الناس بتجيب حاجات للسوق.", fr: "Les bateaux naviguent ! Le marché s’anime." },
  Medicine: { en: "A place to help sick neighbors is open!", ar: "مكان يساعد الجيران التعبانين فتح!", fr: "Un lieu pour soigner les voisins ouvre !" },
  Military: { en: "New walls help keep your town safe!", ar: "الأسوار الجديدة بتحمي مدينتك!", fr: "Les nouveaux murs protègent ta ville !" },
};
export const reactionForAge = (k: Knowledge, lang: Lang, age: Age) => age === "child" ? childReactions[k][lang] : artifactText[k].reaction[lang];
export function identityForAge(discoveries: Knowledge[], lang: Lang, age: Age) {
  const builders = discoveries.includes("Writing") && discoveries.includes("Architecture");
  const identities = age === "child" ? [
    { en: "Your town of builders", ar: "مدينة البنّائين بتاعتك", fr: "Ta ville de bâtisseurs" },
    { en: "Your town by the river", ar: "مدينتك جنب النهر", fr: "Ta ville au bord du fleuve" },
    { en: "Your sleeping town", ar: "مدينتك النايمة", fr: "Ta ville endormie" },
  ] : [
    { en: "The Builders’ Kingdom", ar: "مملكة البنّائين", fr: "Le royaume des bâtisseurs" },
    { en: "The River Civilization", ar: "حضارة النهر", fr: "La civilisation du fleuve" },
    { en: "A Kingdom Forgotten", ar: "مملكة منسيّة", fr: "Un royaume oublié" },
  ];
  return identities[builders ? 0 : discoveries.length ? 1 : 2]?.[lang] ?? "";
}

const civilizationStages: Localized[] = [
  { en: "A sleeping settlement", ar: "مدينة مستنية الحياة", fr: "Une cité endormie" },
  { en: "Life by the Nile", ar: "الحياة جنب النيل", fr: "La vie au bord du Nil" },
  { en: "The builders awaken", ar: "البنّائين رجعوا", fr: "Les bâtisseurs s’éveillent" },
  { en: "A thriving city", ar: "مدينة مليانة حياة", fr: "Une cité florissante" },
  { en: "Egypt lives again", ar: "مصر رجعت للحياة", fr: "L’Égypte revit" },
];
export function civilizationLevel(count: number) {
  return count >= 8 ? 5 : count >= 6 ? 4 : count >= 4 ? 3 : count >= 1 ? 2 : 1;
}
export function civilizationStage(count: number, lang: Lang) {
  return civilizationStages[civilizationLevel(count) - 1]?.[lang] ?? "";
}
const voices: Record<Knowledge, Localized> = {
  Agriculture: { en: "THE FARMER", ar: "الفلاح", fr: "LE CULTIVATEUR" },
  Religion: { en: "YOUR NEIGHBOR", ar: "جارك", fr: "VOTRE VOISIN" },
  Architecture: { en: "THE BUILDER", ar: "البنّاء", fr: "LE BÂTISSEUR" },
  Writing: { en: "THE STORYTELLER", ar: "الحكّاء", fr: "LE CONTEUR" },
  Government: { en: "THE WORKER", ar: "العامل", fr: "LE TRAVAILLEUR" },
  Trade: { en: "THE BOAT KEEPER", ar: "صاحب المركب", fr: "LE BATELIER" },
  Medicine: { en: "YOUR NEIGHBOR", ar: "جارك", fr: "VOTRE VOISIN" },
  Military: { en: "THE GUARD", ar: "الحارس", fr: "LE GARDE" },
};
export const storyVoice = (k: Knowledge, lang: Lang) => voices[k][lang];

/** Narrative rewards belong to the fictional settlement, not museum collection claims. */
export const levelChapters: { level: number; count: number; title: Localized; child: Localized; story: Localized }[] = [
  { level: 1, count: 0, title: { en: "A voice in the sand", ar: "صوت في الرمل", fr: "Une voix dans le sable" }, child: { en: "A little town is waiting. Your first discovery starts its story.", ar: "مدينة صغيرة مستنياك. أول اكتشاف ليك هيبدأ حكايتها.", fr: "Une petite ville t’attend. Ta première découverte commence son histoire." }, story: { en: "A voice reaches you from the quiet settlement: ‘We are here. Help us remember.’ Your story begins.", ar: "صوت من المدينة الهادية بيناديك: «إحنا هنا. ساعدنا نفتكر.» حكايتك بتبدأ.", fr: "Une voix traverse la cité silencieuse : « Nous sommes ici. Aidez-nous à nous souvenir. » Votre histoire commence." } },
  { level: 2, count: 1, title: { en: "The first green shoot", ar: "أول نبتة خضرا", fr: "La première pousse" }, child: { en: "Water reaches the plants. A farmer waves. You helped the town grow!", ar: "المية وصلت للزرع. فلاح بيسلّم عليك. إنت ساعدت المدينة تكبر!", fr: "L’eau atteint les plantes. Un cultivateur te salue. Tu as aidé la ville à grandir !" }, story: { en: "Water slips into the first channel. A farmer kneels beside a green shoot: ‘Look. We can begin again.’", ar: "المية بتجري في أول قناة. فلاح بينحني جنب نبتة خضرا: «شوف. نقدر نبدأ تاني.»", fr: "L’eau rejoint le premier canal. Un cultivateur s’agenouille près d’une pousse : « Regardez. Nous pouvons recommencer. »" } },
  { level: 3, count: 4, title: { en: "The temple speaks", ar: "المعبد بيحكي", fr: "Le temple prend la parole" }, child: { en: "The temple is ready. A writer adds the first words. Now the town can keep its ideas!", ar: "المعبد جاهز. كاتب بيكتب أول كلمات. دلوقتي المدينة تقدر تحتفظ بأفكارها!", fr: "Le temple est prêt. Un scribe écrit les premiers mots. La ville peut garder ses idées !" }, story: { en: "The final inscription catches the light. Beneath the stone roof, a scribe reads aloud. The city has found its voice.", ar: "النور بيلمس آخر نقش. تحت السقف الحجري، كاتب بيقرأ بصوت عالي. المدينة لقت صوتها.", fr: "La dernière inscription capte la lumière. Sous le toit de pierre, un scribe lit à voix haute. La cité trouve sa voix." } },
  { level: 4, count: 6, title: { en: "Across the river", ar: "على الناحية التانية", fr: "De l’autre côté du fleuve" }, child: { en: "A boat brings things to the market. Neighbors meet and share. Your town is busy!", ar: "مركب جاب حاجات للسوق. الجيران بيتقابلوا ويتبادلوا. مدينتك مليانة حركة!", fr: "Un bateau apporte des objets au marché. Les voisins se rencontrent et échangent. Ta ville s’anime !" }, story: { en: "A sail appears beyond the riverbank. At the market, neighbors make room for new arrivals. Your settlement is becoming a city.", ar: "شراع بيظهر ورا ضفة النهر. في السوق، الجيران بيفسحوا مكان للواصلين. مدينتك بتكبر.", fr: "Une voile apparaît au-delà de la rive. Au marché, les habitants accueillent les nouveaux venus. Votre village devient une cité." } },
  { level: 5, count: 8, title: { en: "An Egypt of your own", ar: "مصر بإيديك", fr: "Une Égypte à vous" }, child: { en: "Plants, boats, writers, and helpers fill the town. You brought all eight kinds of knowledge back!", ar: "الزرع والمراكب والكتّاب والمساعدين ملوا المدينة. إنت رجّعت كل المعارف التمانية!", fr: "Plantes, bateaux, scribes et voisins remplissent la ville. Tu as retrouvé les huit savoirs !" }, story: { en: "The gates open onto a living city. Every field, inscription, and busy riverboat carries a memory you restored. This Egypt is yours.", ar: "البوابات بتفتح على مدينة حيّة. كل حقل ونقش ومركب فيه ذكرى إنت رجّعتها. دي مصر بتاعتك.", fr: "Les portes s’ouvrent sur une cité vivante. Chaque champ, inscription et bateau porte un souvenir que vous avez retrouvé. Cette Égypte est la vôtre." } },
];

export function earnedChapters(discoveries: Knowledge[]) {
  const count = new Set(discoveries).size;
  return levelChapters.filter((chapter) => chapter.count <= count);
}
export function chapterForAge(chapter: typeof levelChapters[number], lang: Lang, age: Age) {
  return (age === "child" ? chapter.child : chapter.story)[lang];
}
