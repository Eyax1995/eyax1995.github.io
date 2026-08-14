/* ==========================================================================
   EYAD · site engine
   Plain vanilla JS. No framework, no build step.
   ========================================================================== */
(function(){
'use strict';

/* ---------- tiny helpers ---------- */
var $  = function(s,r){ return (r||document).querySelector(s); };
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
var clamp = function(v,lo,hi){ return Math.min(hi,Math.max(lo,v)); };
var smoothstep = function(p,e0,e1){
  var t = clamp((p-e0)/(e1-e0),0,1);
  return t*t*(3-2*t);
};
/* seeded generator, so "random" offsets are identical on every load */
function rng(seed){
  var s = seed>>>0;
  return function(){ return (s = (s*1664525 + 1013904223)>>>0) / 4294967296; };
}
function seedOf(str){
  var h = 2166136261;
  for(var i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h,16777619); }
  return h>>>0;
}

/* ==========================================================================
   CONTENT
   Every viewer facing line here ships verbatim from the design package.
   ========================================================================== */
var C = {
  proof:[
    { fig:"12+",
      label:{ar:"سنة في قيادة فرق تجارية",en:"Years leading commercial teams"},
      src:{ar:"من 2017 حتى اليوم، عشرة أدوار",en:"2017 to today, ten roles"} },
    { fig:"62%",
      label:{ar:"نمو حصة المنتجات السوقية أمام المنافسين",en:"Product market share growth against competitors"},
      src:{ar:"حلول كير، عبر نون وأمازون وترينديول وسلة",en:"Hulul Care, across Noon, Amazon, Trendyol and Salla"} },
    { fig:"1,500+",
      label:{ar:"صنفًا يُدار تجاريًا",en:"Products managed commercially"},
      src:{ar:"حلول كير، محفظة متعددة العلامات",en:"Hulul Care, multi brand portfolio"} },
    { fig:"4,700+",
      label:{ar:"جهة اتصال، و900+ نشاط تجاري",en:"Business contacts, 900+ active companies"},
      src:{ar:"بُنيت في عقال، وموثقة في عرض EventX",en:"Built at Aqaal, documented in the EventX proposal"} }
  ],

  doing:[
    { img:"assets/img/doing-1.jpg",
      alt:{ar:"إياد في مساحة عمل","en":"Eyad at work"},
      h:{ar:"أفتح سوقًا.",en:"Open a market."},
      p:{ar:"دراسات جدوى ونماذج مالية، والخطة التي تُبنى عليها.",en:"Feasibility, financial models, and the go to market plan that follows from them."} },
    { img:"assets/img/doing-2.jpg",
      alt:{ar:"إياد يقود فريقًا",en:"Eyad leading a team"},
      h:{ar:"أبني الشراكة.",en:"Build the partnership."},
      p:{ar:"هيكلة صفقات يكسب فيها الطرفان، ثم تشغيل أول تسعين يومًا.",en:"Structuring deals where both sides gain, then running the first ninety days."} },
    { img:"assets/img/doing-3.jpg",
      alt:{ar:"إياد في جلسة عمل",en:"Eyad in a working session"},
      h:{ar:"أنمّي العلامة.",en:"Grow the brand."},
      p:{ar:"هوية وقنوات، والمحرك التجاري الذي يحولهما إلى طلبات.",en:"Identity, channels, and the commercial engine that turns them into orders."} }
  ],

  cases:[
    { org:"Aqaal", yr:"2026", study:true,
      name:{ar:"ليالي الرافدين · دراسة استثمارية متكاملة",en:"Rafidain Nights · Full investment study"},
      beats:[
        { h:{ar:"الوضع",en:"The situation"},
          p:{ar:"مستثمر أراد إقامة حفل عراقي كبير في السعودية. الخطة استهدفت الجالية العراقية وحدها، وهي جمهور أصغر من أن يملأ حفلًا تجاريًا.",
             en:"An investor wanted to stage a large Iraqi concert in Saudi Arabia. The plan targeted the Iraqi community alone, a crowd too small to fill a commercial show."} },
        { h:{ar:"ما فعلتُه",en:"What I did"},
          p:{ar:"أعدتُ تموضعه كإنتاج فني عراقي لجمهور عام. بنيتُ نموذجًا ماليًا بأربعة سيناريوهات مع تحليل حساسية، ورتّبتُ الفنانين المرشحين بتقييم موزون، وحسبتُ قمع التسويق كاملًا بتكلفته.",
             en:"Repositioned it as mainstream Iraqi entertainment for a general audience. Built a four scenario financial model with sensitivity analysis, ranked candidate artists on a weighted score, and costed the full marketing funnel."} },
        { h:{ar:"ما خرج منها",en:"What came out"},
          p:{ar:"توصية بالمضي، مشروطة بنموذج شراكة نقل نقطة التعادل من 83% من التذاكر المباعة إلى 42%.",
             en:"A conditional go, through a partnership structure that moved break even from 83% of tickets sold down to 42%."} }
      ],
      figs:[
        { v:"83% → 42%", badge:"doc",
          p:{ar:"نقطة التعادل بعد إعادة الهيكلة",en:"Break even after restructuring"},
          b:{ar:"موثّق",en:"Documented"} },
        { v:"4", badge:"doc",
          p:{ar:"سيناريوهات مالية مع تحليل حساسية",en:"Financial scenarios with sensitivity analysis"},
          b:{ar:"موثّق",en:"Documented"} },
        { v:"89M", badge:"est",
          p:{ar:"زائر فعاليات في السعودية 2025، رقم القطاع المرجعي",en:"Event visitors in Saudi Arabia in 2025, the sector reference figure"},
          b:{ar:"تقديري",en:"Estimated"} }
      ] },

    { org:"Aqaal", yr:"2026", study:false,
      name:{ar:"شراكة EventX الاستراتيجية",en:"EventX · Strategic partnership"},
      beats:[
        { h:{ar:"الوضع",en:"The situation"},
          p:{ar:"شركة فعاليات قوية في التنفيذ الميداني، لكن تسويقها وحضورها الرقمي متأخران عن قدرتها.",
             en:"A strong events company whose on the ground delivery ran ahead of its marketing and digital presence."} },
        { h:{ar:"ما فعلتُه",en:"What I did"},
          p:{ar:"صممتُ شراكة تكمل ولا تنافس. هم ينفذون ميدانيًا، ونحن نتولى التسويق والهوية والمنصات، مع إطار إحالات متبادل عبر قاعدة 4,700 جهة اتصال، وأول تسعين يومًا بمؤشرات حقيقية.",
             en:"Designed a partnership that complements instead of competing. They deliver on the ground, we handle marketing, identity and platforms, with a mutual referral framework across a 4,700 contact network and a first ninety days with real measures on it."} },
        { h:{ar:"ما خرج منها",en:"What came out"},
          p:{ar:"إطار B2B قابل للتنفيذ يفتح لكل طرف سوق الآخر بلا تكلفة استحواذ إضافية.",
             en:"A working B2B framework that opens each side's market to the other at no extra acquisition cost."} }
      ] },

    { org:"Al-Hattal", yr:"", study:false,
      name:{ar:"أونو باك · علامة بُنيت من لا شيء",en:"Ono Pack · A brand built from nothing"},
      beats:[
        { h:{ar:"الوضع",en:"The situation"},
          p:{ar:"شركة توزيع بلا علامة خاصة بها، وهوامش تعكس ذلك.",
             en:"A distribution company with no brand of its own, and margins to match."} },
        { h:{ar:"ما فعلتُه",en:"What I did"},
          p:{ar:"بنيتُ العلامة من طرف إلى طرف، من الهوية إلى التغليف إلى التوزيع، وأدخلتُ ويلز الأردن وبرودكس تركيا السوق السعودي معها.",
             en:"Built the brand end to end, identity through packaging into distribution, while bringing Wells of Jordan and Prodex of Turkey into the Saudi market alongside it."} },
        { h:{ar:"ما خرج منها",en:"What came out"},
          p:{ar:"علامة استهلاكية قائمة في السوق، ومحفظة اتسعت بثلاث وكالات دولية.",
             en:"A live consumer brand, and a portfolio widened by three international agencies."} }
      ] }
  ],

  roles:[
    { when:{ar:"2026 إلى الآن",en:"2026 to present"}, now:true,
      role:{ar:"مدير المشاريع والتطوير",en:"Projects & Development Manager"},
      org:{ar:"وكالة عقال · تابعة لبولد براند · جدة",en:"Aqaal Agency · a Bold Brand company · Jeddah"} },
    { when:{ar:"يونيو 2026 إلى الآن",en:"Jun 2026 to present"}, now:true,
      role:{ar:"مدير التطوير",en:"Development Director"},
      org:{ar:"بولد براند · السعودية",en:"Bold Brand · Saudi Arabia"} },
    { when:{ar:"حتى مايو 2026",en:"Until May 2026"},
      role:{ar:"مدير التسويق",en:"Marketing Director"},
      org:{ar:"شركة حلول كير · جدة",en:"Hulul Care · Jeddah"} },
    { when:{ar:"خبرة سابقة",en:"Previous"},
      role:{ar:"مدير التسويق",en:"Marketing Manager"},
      org:{ar:"شركة الحتال المحدودة · جدة",en:"Al-Hattal Co. Ltd. · Jeddah"} },
    { when:{ar:"ديسمبر 2023 إلى مايو 2024",en:"Dec 2023 to May 2024"},
      role:{ar:"مدير التسويق والمبيعات",en:"Sales & Marketing Manager"},
      org:{ar:"وكالة وسمة التميز للإعلان · جدة",en:"Wasmat Al-Tamayuz Agency · Jeddah"} },
    { when:{ar:"يناير 2022 إلى ديسمبر 2023",en:"Jan 2022 to Dec 2023"},
      role:{ar:"مدير تنفيذي",en:"Executive Manager"},
      org:{ar:"مؤسسة المسار التقني · الطائف",en:"Technical Path Est. · Taif"} },
    { when:{ar:"يناير 2020 إلى ديسمبر 2021",en:"Jan 2020 to Dec 2021"},
      role:{ar:"مدير التسويق والمبيعات",en:"Sales & Marketing Manager"},
      org:{ar:"Art Marketing Agency · الطائف",en:"Art Marketing Agency · Taif"} },
    { when:{ar:"نوفمبر 2018 إلى مايو 2021",en:"Nov 2018 to May 2021"},
      role:{ar:"مدير الخدمات الإلكترونية",en:"E-Services Manager"},
      org:{ar:"مؤسسة دفاتر (زاد) · الطائف",en:"Dfatir Est. (Zad) · Taif"} },
    { when:{ar:"حتى نوفمبر 2018",en:"Until Nov 2018"},
      role:{ar:"مسؤول مشتريات",en:"Procurement Officer"},
      org:{ar:"مطاعم مودو · مجموعة الأحلام · جدة",en:"Modo Restaurants · Al-Ahlam Group · Jeddah"} },
    { when:{ar:"أبريل 2017 إلى أكتوبر 2018",en:"Apr 2017 to Oct 2018"},
      role:{ar:"سكرتير تنفيذي",en:"Executive Secretary"},
      org:{ar:"مجموعة الأحلام القابضة · جدة",en:"Al-Ahlam Holding Group · Jeddah"} }
  ],

  brands:[
    { logo:"assets/img/brands/aqaal.svg", mark:"ع",
      n:{ar:"وكالة عقال",en:"Aqaal"}, t:{ar:"وكالة إبداع وتسويق",en:"Creative & marketing agency"} },
    { logo:"assets/img/brands/boldbrand.png", mark:"B",
      n:{ar:"بولد براند",en:"Bold Brand"}, t:{ar:"إبداع وتسويق متكامل",en:"Integrated creative and marketing"} },
    { logo:"assets/img/brands/hululcare.png", mark:"HC",
      n:{ar:"حلول كير",en:"Hulul Care"}, t:{ar:"محفظة علامات متعددة",en:"Multi brand portfolio"} },
    { mark:"OP", n:{ar:"أونو باك",en:"Ono Pack"}, t:{ar:"بنيتُها من الصفر",en:"Built from scratch"} },
    { mark:"W", n:{ar:"ويلز · الأردن",en:"Wells · Jordan"}, t:{ar:"وكالة أدخلتُها السوق",en:"Agency I brought in"} },
    { mark:"P", n:{ar:"برودكس · تركيا",en:"Prodex · Turkey"}, t:{ar:"وكالة أدخلتُها السوق",en:"Agency I brought in"} },
    { logo:"assets/img/brands/aquasoft.png", mark:"A", plate:true,
      n:{ar:"أكواسوفت",en:"Aquasoft"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/gracias.png", mark:"G",
      n:{ar:"قراسياس",en:"Gracias"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/marigold.png", mark:"M",
      n:{ar:"ماريقولد",en:"Marigold"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/mrm.png", mark:"M", plate:true,
      n:{ar:"Mr.M",en:"Mr.M"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/biadalwaraq.png", mark:"ب", plate:true,
      n:{ar:"بياض الورق",en:"Biad Alwaraq"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/cupak.png", mark:"ك",
      n:{ar:"كوبك",en:"Cupak"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/predocare.png", mark:"P", plate:true,
      n:{ar:"بريدو كير",en:"Predo Care"}, t:{ar:"عملت عليها",en:"Worked on"} },
    { logo:"assets/img/brands/unopack.png", mark:"U",
      n:{ar:"يونو باك",en:"Uno Pack"}, t:{ar:"عملت عليها",en:"Worked on"} }
  ],

  expos:[
    { y:"2016–2025", n:{ar:"معرض الموضة والجمال",en:"Beauty World Expo"}, r:{ar:"جدة · إدارة المشاركة الكاملة وتصميم منصات العرض",en:"Jeddah · Full participation management and booth design"} },
    { y:"2025", n:{ar:"معرض لمسة ملكة بعيون حجازية",en:"Lamsat Malika Expo"}, r:{ar:"جدة · إدارة الحضور التسويقي",en:"Jeddah · Marketing presence"} },
    { y:"2024", n:{ar:"معرض فابكس",en:"FABEX"}, r:{ar:"السعودية · تنظيم وإدارة مشاركة الشركة",en:"KSA · Company participation management"} },
    { y:"2023–2025", n:{ar:"معرض جدة الدولي للزراعة والغذاء",en:"Jeddah Int'l Agriculture & Food Expo"}, r:{ar:"جدة · بناء شراكات مع الموردين والموزعين",en:"Jeddah · Supplier and distributor partnerships"} },
    { y:"2024–2025", n:{ar:"المعرض التجاري الدولي",en:"International Trade Exhibition"}, r:{ar:"السعودية · تمثيل الشركات وبناء علاقات تجارية",en:"KSA · Company representation and business relations"} },
    { y:"2023", n:{ar:"ذي أرينا الرياض",en:"The Arena Riyadh"}, r:{ar:"الرياض · المشاركة التسويقية وعرض المنتجات",en:"Riyadh · Marketing participation and product display"} },
    { y:"2017 · 2023", n:{ar:"معرض جدة الدولي للكتاب",en:"Jeddah Int'l Book Fair"}, r:{ar:"جدة · المشاركة الإعلانية والخدمات التسويقية",en:"Jeddah · Advertising and marketing services"} },
    { y:"2022", n:{ar:"معرض الشرق الأوسط للتعليم والتدريب",en:"Middle East Education & Training Expo"}, r:{ar:"الطائف · إدارة مشاركة المؤسسة",en:"Taif · Institutional participation management"} },
    { y:"2017", n:{ar:"معرض فوديكس",en:"FOODEX"}, r:{ar:"السعودية · إدارة وتنسيق المشاركة",en:"KSA · Participation coordination"} },
    { y:"2016", n:{ar:"مهرجان الورود بالطائف · الدورة الأولى",en:"Taif Rose Festival · 1st Edition"}, r:{ar:"الطائف · إدارة الفعاليات التسويقية المصاحبة",en:"Taif · Accompanying marketing activities"} }
  ],

  faq:[
    { q:{ar:"هل هذه الأرقام حقيقية؟",en:"Are these numbers real?"},
      a:{ar:"كل رقم هنا يذكر مصدره، وما لم أستطع التحقق منه لم أضعه. اطلب مني الدراسة خلف أي منها.",
         en:"Every figure on this page names its source, and the ones I could not verify are not here. Ask me for the study behind any of them."} },
    { q:{ar:"عملتَ في الوكالات والسلع الاستهلاكية والتجارة الإلكترونية. أيّها أنت؟",en:"You have worked across agencies, FMCG and e-commerce. Which are you?"},
      a:{ar:"تجاري. القطاع يتغير، والعمل لا يتغير: اعثر على الفرصة، ابنِ الحالة، أغلقها، ثم شغّلها.",
         en:"Commercial. The category changes, the job does not: find the opening, build the case, close it, run it."} },
    { q:{ar:"هل أنت متاح الآن؟",en:"Are you available now?"},
      a:{ar:"نعم. قيادة تطوير الأعمال، والقيادة التجارية، والنمو والشراكات.",
         en:"Yes. Business development leadership, commercial leadership, growth and partnerships."} },
    { q:{ar:"عربي أم إنجليزي؟",en:"Arabic or English?"},
      a:{ar:"العربية لغتي الأم، وإنجليزيتي متقدمة. المجلسان، والغرفتان.",
         en:"Arabic is my first language and my English is advanced. Both boards, both rooms."} }
  ],

  caps:[
    { g:{ar:"تطوير الأعمال والاستراتيجية",en:"Business development and strategy"},
      i:[{ar:"الشراكات الاستراتيجية وهيكلة الصفقات",en:"Strategic partnerships and deal structuring"},
         {ar:"دراسات الجدوى والنماذج المالية",en:"Feasibility studies and financial modelling"},
         {ar:"استراتيجية دخول السوق",en:"Go to market strategy"},
         {ar:"التوسع في القنوات والأسواق",en:"Channel and market expansion"}] },
    { g:{ar:"التجارة والنمو",en:"Commercial and growth"},
      i:[{ar:"التجارة الإلكترونية · نون وأمازون وترينديول وسلة",en:"E-commerce · Noon, Amazon, Trendyol, Salla"},
         {ar:"السلع الاستهلاكية والتجزئة",en:"FMCG and retail"},
         {ar:"إدارة المبيعات وتمكينها",en:"Sales management and enablement"},
         {ar:"الوكالات والتوزيع الدولي",en:"International agencies and distribution"}] },
    { g:{ar:"العلامة والتسويق",en:"Brand and marketing"},
      i:[{ar:"بناء العلامات من الصفر",en:"Building brands from nothing"},
         {ar:"الحملات الرقمية والإعلانات الممولة",en:"Digital campaigns and paid media"},
         {ar:"المعارض والفعاليات الكبرى",en:"Major expos and events"},
         {ar:"الذكاء الاصطناعي في التسويق",en:"AI in marketing"}] },
    { g:{ar:"القيادة والأدوات",en:"Leadership and tools"},
      i:[{ar:"قيادة فرق متعددة التخصصات",en:"Leading multi disciplinary teams"},
         {ar:"Adobe Creative Suite",en:"Adobe Creative Suite"},
         {ar:"Microsoft Office المتقدم",en:"Advanced Microsoft Office"},
         {ar:"لوحات المؤشرات والتقارير",en:"KPI dashboards and reporting"}] }
  ],

  archive:[
    { n:{ar:"الهوية التجارية",en:"Brand identity"}, u:"https://drive.google.com/drive/folders/1NtgPX6dfMFnA5v1QcJarhz4iybyu5z0c" },
    { n:{ar:"الحملات الإعلانية",en:"Ad campaigns"}, u:"https://drive.google.com/drive/folders/17SzHIVawDM9asnB89jkn0cenMN59DbpJ" },
    { n:{ar:"بوستات السوشيال ميديا",en:"Social media posts"}, u:"https://drive.google.com/drive/folders/1VH0CA2kMCdKGlSbahsnIguw3B1mJojvY" },
    { n:{ar:"أعمال المحتوى",en:"Content work"}, u:"https://drive.google.com/drive/folders/11t1bvbBIuG58LrZmKn8_Dx6y1pbhKIvA" },
    { n:{ar:"الموشن جرافيك",en:"Motion graphics"}, u:"https://drive.google.com/drive/folders/1KjvJbxdtb2EVDFaydisryRX2wFFxBTMt" },
    { n:{ar:"أعمال التصاميم",en:"General design"}, u:"https://drive.google.com/drive/folders/1K0Frls5Vy3XEaCM4uyOMj2borym4GbNe" },
    { n:{ar:"تصاميم المنيو",en:"Menu design"}, u:"https://drive.google.com/drive/folders/1S_kMXX2zJqAexgyDnktVp73iB4pc4jmc" },
    { n:{ar:"بوستات الذكاء الاصطناعي",en:"AI marketing posts"}, u:"https://drive.google.com/drive/folders/1yP5HqEwwPZCR5oCjx_Gqn2P18eIhFD5o" },
    { n:{ar:"قائمة الأصناف",en:"Product catalogues"}, u:"https://drive.google.com/drive/folders/1pJoiRb6C7qiFYc7FU1BsKx8DVBrDF_he" },
    { n:{ar:"تصوير المنتجات للمتاجر",en:"Online product photography"}, u:"https://drive.google.com/drive/folders/1hEb0D9Sog0hSA9NnB0OQrps0IgUP14dw" },
    { n:{ar:"شهادات الأصناف",en:"Product certificates"}, u:"https://drive.google.com/drive/folders/1SDRNow8wNQr6SpMBIGvRKH6rr5enEqgN" },
    { n:{ar:"أعمال الحتال",en:"Al-Hattal work"}, u:"https://drive.google.com/drive/folders/1JPtpZPF18weRGTa-eetud6aek7AZvZ4c" },
    { n:{ar:"مودو والأحلام",en:"Modo and Al-Ahlam"}, u:"https://drive.google.com/drive/folders/1jaGyez1zSLCBLWPL1u309bmf1MvaXrBW" },
    { n:{ar:"مجلد دفاتر",en:"Dfatir portfolio"}, u:"https://drive.google.com/drive/folders/10WBOwJWSsIzHv_x1oyynBTNrDJl3gRlu" }
  ],

  creds:[
    { y:"2018", n:{ar:"بكالوريوس إدارة أعمال",en:"Bachelor of Business Administration"},
      by:{ar:"جامعة السودان",en:"Sudan University"},
      u:"https://drive.google.com/file/d/1fkYdYW6YYHjCPB2zDwRNmzQgDq44FeIJ/view" },
    { y:"2023", n:{ar:"مهارات التسويق الفعّال",en:"Effective marketing skills"},
      by:{ar:"Google Digital Garage",en:"Google Digital Garage"} },
    { y:"2024", n:{ar:"الذكاء الاصطناعي في التسويق",en:"AI in marketing"},
      by:{ar:"برنامج تدريبي متقدم",en:"Advanced training programme"} }
  ],

  direct:[
    { k:"mail", href:"mailto:eyax249@gmail.com", t:{ar:"eyax249@gmail.com",en:"eyax249@gmail.com"} },
    { k:"chat", href:"https://wa.me/966592498289", t:{ar:"واتساب",en:"WhatsApp"} },
    { k:"link", href:"https://www.linkedin.com/in/eyax249", t:{ar:"لينكدإن",en:"LinkedIn"} },
    { k:"doc",  href:"assets/cv/Eyad_CV_AR.html", hrefEn:"assets/cv/Eyad_CV_EN.html", t:{ar:"السيرة الذاتية",en:"Curriculum vitae"} }
  ]
};

var ICON = {
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6.5 9 6.5 9-6.5"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.5A8.4 8.4 0 1 1 21 11.5Z"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5v6M7.5 7.6v.1M11.8 16.5v-6M16.2 16.5v-3.3a2.2 2.2 0 0 0-4.4 0"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h4.5"/></svg>'
};

/* ==========================================================================
   RENDER
   ========================================================================== */
function el(tag, cls, html){
  var e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html != null) e.innerHTML = html;
  return e;
}
function bi(tag, cls, pair){
  var e = el(tag, cls);
  e.setAttribute('data-ar', pair.ar);
  e.setAttribute('data-en', pair.en);
  return e;
}

function render(){
  /* proof */
  var pg = $('#proofGrid');
  C.proof.forEach(function(p){
    var card = el('div','pcard rise');
    card.appendChild(el('div','pfig', p.fig));
    card.appendChild(bi('div','plabel', p.label));
    var src = el('div','psrc');
    src.appendChild(el('span','vmark'));
    src.appendChild(bi('span', null, p.src));
    card.appendChild(src);
    pg.appendChild(card);
  });

  /* what I do */
  var dg = $('#doingGrid');
  C.doing.forEach(function(d){
    var card = el('article','dcard rise');
    var shot = el('div','shot');
    var img = el('img');
    img.src = d.img; img.loading = 'lazy'; img.decoding = 'async';
    img.setAttribute('data-alt-ar', d.alt.ar);
    img.setAttribute('data-alt-en', d.alt.en);
    shot.appendChild(img);
    card.appendChild(shot);
    var body = el('div','body');
    body.appendChild(bi('h3', null, d.h));
    body.appendChild(bi('p', null, d.p));
    card.appendChild(body);
    dg.appendChild(card);
  });

  /* cases */
  var cs = $('#cases');
  C.cases.forEach(function(c, ci){
    var box = el('article','case rise');
    var top = el('div','case-top');
    top.appendChild(el('span','case-org', c.org));
    if(c.yr) top.appendChild(el('span','case-yr', c.yr));
    box.appendChild(top);
    box.appendChild(bi('h3', null, c.name));

    var beats = el('div','beats');
    c.beats.forEach(function(b){
      var bt = el('div','beat');
      bt.appendChild(bi('h4', null, b.h));
      bt.appendChild(bi('p', null, b.p));
      beats.appendChild(bt);
    });
    box.appendChild(beats);

    /* the one interactive moment lives in the first case */
    if(c.study){
      var st = el('div','study');
      var row = el('div','holdrow');
      var btn = el('button','hold');
      btn.type = 'button';
      btn.id = 'holdBtn';
      var lbl = bi('span', null, {ar:'اضغط مع الاستمرار لفتح الدراسة', en:'Hold to open the study'});
      lbl.setAttribute('data-ar-done', 'الدراسة مفتوحة');
      lbl.setAttribute('data-en-done', 'The study is open');
      btn.appendChild(lbl);
      row.appendChild(btn);
      st.appendChild(row);

      var figs = el('div','figs');
      figs.id = 'studyFigs';
      c.figs.forEach(function(f){
        var fg = el('div','fig');
        fg.appendChild(el('b', null, f.v));
        fg.appendChild(bi('p', null, f.p));
        fg.appendChild(bi('span','badge ' + f.badge, f.b));
        figs.appendChild(fg);
      });
      st.appendChild(figs);
      box.appendChild(st);
    }
    cs.appendChild(box);
  });

  /* career */
  var rl = $('#roles');
  C.roles.forEach(function(r){
    var li = el('li','role rise');
    li.appendChild(bi('div','when', r.when));
    var what = el('div','what');
    what.appendChild(bi('strong', null, r.role));
    what.appendChild(bi('span', null, r.org));
    li.appendChild(what);
    if(r.now) li.appendChild(bi('span','now', {ar:'حالي', en:'Now'}));
    rl.appendChild(li);
  });

  /* capabilities */
  var cp = $('#caps');
  C.caps.forEach(function(g){
    var col = el('div','cap rise');
    col.appendChild(bi('h4', null, g.g));
    var ul = el('ul');
    g.i.forEach(function(it){ ul.appendChild(bi('li', null, it)); });
    col.appendChild(ul);
    cp.appendChild(col);
  });

  /* the work archive */
  var ar = $('#archive');
  C.archive.forEach(function(a){
    var link = el('a','arc');
    link.href = a.u; link.target = '_blank'; link.rel = 'noopener';
    link.appendChild(bi('span', null, a.n));
    link.insertAdjacentHTML('beforeend',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>');
    ar.appendChild(link);
  });

  /* credentials */
  var cr = $('#creds');
  C.creds.forEach(function(c){
    var box = el(c.u ? 'a' : 'div','cred rise');
    if(c.u){ box.href = c.u; box.target = '_blank'; box.rel = 'noopener'; }
    box.appendChild(el('span','cred-y', c.y));
    box.appendChild(bi('strong', null, c.n));
    box.appendChild(bi('span','cred-by', c.by));
    if(c.u) box.appendChild(bi('span','cred-see', {ar:'اطّلع على الشهادة', en:'View the certificate'}));
    cr.appendChild(box);
  });

  /* brands */
  var bw = $('#brandWall');
  C.brands.forEach(function(b){
    var cell = el('div','bcell');
    if(b.logo){
      var im = el('img');
      im.src = b.logo; im.loading = 'lazy'; im.decoding = 'async'; im.alt = '';
      if(b.plate) im.className = 'plated';
      im.onerror = function(){
        var m = el('div','bmono', b.mark);
        im.replaceWith(m);
      };
      cell.appendChild(im);
    } else {
      cell.appendChild(el('div','bmono', b.mark));
    }
    cell.appendChild(bi('b', null, b.n));
    cell.appendChild(bi('span', null, b.t));
    bw.appendChild(cell);
  });

  /* expos */
  var ex = $('#expos');
  C.expos.forEach(function(e){
    var li = el('li','expo');
    li.appendChild(el('span','yrs', e.y));
    var d = el('div');
    d.appendChild(bi('b', null, e.n));
    d.appendChild(bi('span', null, e.r));
    li.appendChild(d);
    ex.appendChild(li);
  });

  /* faq */
  var qa = $('#qa');
  C.faq.forEach(function(f, i){
    var item = el('div','qitem');
    var b = el('button','qbtn');
    b.type = 'button';
    b.setAttribute('aria-expanded','false');
    b.setAttribute('aria-controls','qa-' + i);
    b.setAttribute('data-ar', f.q.ar);
    b.setAttribute('data-en', f.q.en);
    var ans = el('div','qans');
    ans.id = 'qa-' + i;
    ans.appendChild(bi('p', null, f.a));
    item.appendChild(b); item.appendChild(ans);
    qa.appendChild(item);
  });

  /* direct links */
  var dr = $('#direct');
  C.direct.forEach(function(d){
    var a = el('a','dlink');
    a.href = d.href;
    if(d.hrefEn){ a.setAttribute('data-href-ar', d.href); a.setAttribute('data-href-en', d.hrefEn); }
    if(/^https?:/.test(d.href)){ a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = ICON[d.k];
    a.appendChild(bi('span', null, d.t));
    dr.appendChild(a);
  });

  /* the contact panel shows the film's resting frame; until that exists, a still stands in */
  var es = $('#endingShot');
  if(es) es.onerror = function(){ es.onerror = null; es.src = 'assets/img/contact-still.jpg'; };

  $('#yr').textContent = new Date().getFullYear();
}

/* ==========================================================================
   LANGUAGE
   ========================================================================== */
var lang = document.documentElement.lang === 'en' ? 'en' : 'ar';

function applyLang(){
  var root = document.documentElement;
  root.lang = lang;
  root.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  $$('[data-ar]').forEach(function(n){
    var v = n.getAttribute('data-' + lang);
    if(v == null) return;
    if(n.classList.contains('split')){ n.setAttribute('data-text', v); return; }
    n.textContent = v;
  });
  $$('[data-alt-ar]').forEach(function(n){
    n.alt = n.getAttribute('data-alt-' + lang) || '';
  });
  $$('[data-href-ar]').forEach(function(n){
    n.href = n.getAttribute('data-href-' + lang);
  });

  document.title = (lang === 'ar')
    ? 'إياد المغيرة · تطوير الأعمال والقيادة التجارية'
    : 'Eyad Al-Mughira · Business Development & Commercial Leadership';

  splitAll();
  if(holdApi) holdApi.repaint();   /* the hold button's label has its own opened state */
  try{ localStorage.setItem('eyad-lang', lang); }catch(e){}
  bands.forEach(function(b){ b.op = -1; b.k = -1; });
  updateCaptions(heroProgress());
}

/* ==========================================================================
   TEXT SPLITTING (once per language change)
   ========================================================================== */
function splitAll(){
  $$('.split').forEach(function(node){
    var text = node.getAttribute('data-' + lang) || node.getAttribute('data-text') || '';
    var band = node.closest('.band');
    var entrance = band ? band.getAttribute('data-entrance') : 'rise';
    var spread = band && band.getAttribute('data-spread') ? parseFloat(band.getAttribute('data-spread')) : 0.42;
    splitEl(node, text, entrance, spread);
  });
}

function splitEl(node, text, entrance, spread){
  node.textContent = '';

  var sr = el('span','sr');
  sr.textContent = text;
  node.appendChild(sr);

  var vis = el('span');
  vis.setAttribute('aria-hidden','true');

  if(entrance === 'blur'){
    var wrap = el('span','blurwrap');
    var soft = el('span','soft'); soft.textContent = text;
    var sharp = el('span','sharp'); sharp.textContent = text;
    wrap.appendChild(soft); wrap.appendChild(sharp);
    vis.appendChild(wrap);
    node.appendChild(vis);
    return;
  }

  var words = text.split(' ');
  var r = rng(seedOf(text));
  words.forEach(function(word, i){
    var w = el('span','w');
    /* threshold ordered by reading position, with a small seeded wobble */
    var th = (i / Math.max(1, words.length)) * spread + r() * 0.05;
    w.style.setProperty('--th', th.toFixed(4));
    /* the landing word of each sentence carries the bigger overshoot */
    if(entrance === 'punch' && /[.。]$/.test(word)) w.classList.add('em');
    w.textContent = word + (i < words.length - 1 ? ' ' : '');
    vis.appendChild(w);
  });
  node.appendChild(vis);
}

/* ==========================================================================
   THE SCRUB HERO
   ========================================================================== */
var VIDEO_URL   = 'assets/hero-scrub.mp4';
var POSTER_URL  = 'assets/hero-poster.jpg';
var VIDEO_BYTES = 2742004;   /* the real encoded size, the fallback when Content-Length is missing */

var hero   = $('#hero');
var stage  = $('#stage');
var video  = $('#hero-video');
var poster = $('#poster');
var loader = $('#loader');
var ring   = $('.ring circle');
var cue    = $('#cue');

var bands = $$('.band').map(function(node){
  return {
    node: node,
    a: parseFloat(node.getAttribute('data-a')),
    b: parseFloat(node.getAttribute('data-b')),
    ramp: node.getAttribute('data-ramp') ? parseFloat(node.getAttribute('data-ramp')) : 0,
    op: -1,
    k: -1
  };
});

function heroProgress(){
  var range = hero.offsetHeight - window.innerHeight;
  if(range <= 0) return 0;
  return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
}

/* ---------- gated seeks ---------- */
var seekBusy = false, pendingTime = null;
function requestSeek(t){
  if(!video.duration) return;
  if(seekBusy){ pendingTime = t; return; }
  seekBusy = true;
  video.currentTime = t;
}
video.addEventListener('seeked', function(){
  seekBusy = false;
  if(pendingTime !== null){
    var t = pendingTime; pendingTime = null;
    requestSeek(t);
  }
});
video.addEventListener('error', function(){
  seekBusy = false; pendingTime = null;
  failVideo();
});

/* ---------- the lerp loop that rests ---------- */
var target = 0, shown = 0, rafId = null, lastTick = 0, heroOnScreen = true;
var loadK = 0, loadStart = 0;

function tick(now){
  var dt = Math.min(100, now - (lastTick || now));
  lastTick = now;
  var k = 0.16;
  shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));

  /* band one's one time load ramp, which hands over to scroll */
  if(loadK < 1){
    if(!loadStart) loadStart = now;
    loadK = clamp((now - loadStart) / 900, 0, 1);
  }

  var settled = Math.abs(target - shown) < 0.0005 && loadK >= 1;
  if(settled){
    shown = target; rafId = null; lastTick = 0;
  } else {
    rafId = requestAnimationFrame(tick);
  }
  if(video.duration) requestSeek(shown * video.duration);
  updateCaptions(shown);
}

function onScroll(){
  target = heroProgress();
  if(rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
}

/* ---------- captions, delta gated ---------- */
function updateCaptions(p){
  for(var i = 0; i < bands.length; i++){
    var B = bands[i];
    var f = Math.min(0.02, (B.b - B.a) / 3);
    var inFade  = (i === 0) ? 1 : smoothstep(p, B.a, B.a + f);
    var outFade = (i === bands.length - 1) ? 1 : (1 - smoothstep(p, B.b - f, B.b));
    var op = inFade * outFade;

    var ramp = B.ramp || Math.min(0.025, (B.b - B.a) * 0.35);
    var k = clamp((p - B.a) / ramp, 0, 1);
    if(i === 0) k = Math.max(k, loadK);

    if(Math.abs(op - B.op) > 0.004){
      B.op = op;
      B.node.style.opacity = op.toFixed(3);
      var on = op > 0.02;
      if(on !== B.node.classList.contains('on')) B.node.classList.toggle('on', on);
    }
    if(Math.abs(k - B.k) > 0.008){
      B.k = k;
      B.node.style.setProperty('--k', k.toFixed(3));
      if(B.node.classList.contains('settle')){
        B.node.style.setProperty('--ks', clamp((k - 0.5) * 2.6, 0, 1).toFixed(3));
        B.node.style.setProperty('--kb', clamp((k - 0.72) * 4, 0, 1).toFixed(3));
      }
    }
  }
  if(cue){
    var hide = p > 0.03;
    if(hide !== cue.classList.contains('hide')) cue.classList.toggle('hide', hide);
  }
}

/* ---------- the streamed blob with an honest ring ---------- */
var heroStarted = false;
function initHeroOnce(){
  if(heroStarted) return;
  heroStarted = true;

  poster.style.backgroundImage = "url('" + POSTER_URL + "')";

  var kicked = false;
  function startBlobFetch(){
    if(kicked) return;
    kicked = true;
    loader.classList.add('on');
    loadHeroBlob().catch(failVideo);
  }
  var pi = new Image();
  pi.onload = startBlobFetch;
  pi.onerror = startBlobFetch;
  pi.src = POSTER_URL;
  setTimeout(startBlobFetch, 4000);
}

function loadHeroBlob(){
  var ctrl = new AbortController();
  var watchdog = setTimeout(function(){ ctrl.abort(); }, 20000);

  return fetch(VIDEO_URL, { priority:'low', signal: ctrl.signal }).then(function(res){
    if(!res.ok) throw new Error('http ' + res.status);
    var total = Number(res.headers.get('Content-Length')) || VIDEO_BYTES;
    var reader = res.body.getReader();
    var chunks = [], got = 0, lastRing = 0;

    function pump(){
      return reader.read().then(function(r){
        if(r.done) return;
        clearTimeout(watchdog);
        watchdog = setTimeout(function(){ ctrl.abort(); }, 20000);
        chunks.push(r.value);
        got += r.value.length;
        var frac = Math.min(1, got / total);
        var now = performance.now();
        if(now - lastRing > 100 || frac === 1){
          lastRing = now;
          ring.style.setProperty('--ld', Math.round(126 * (1 - frac)));
        }
        return pump();
      });
    }

    return pump().then(function(){
      clearTimeout(watchdog);
      ring.style.setProperty('--ld', 0);
      video.src = URL.createObjectURL(new Blob(chunks));
      video.load();
      video.addEventListener('canplay', function(){
        requestSeek(heroProgress() * video.duration);
        stage.classList.add('video-ready');
        loader.classList.remove('on');
      }, { once:true });
    });
  });
}

function failVideo(){
  loader.classList.remove('on');
  stage.classList.add('video-failed');
}

/* ---------- the five static hero gates, kept live ---------- */
var GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];
var MQLS = GATES.map(function(q){ return matchMedia(q); });
var scrubOn = false;

function enableScrub(){
  if(scrubOn) return;
  scrubOn = true;
  initHeroOnce();
  window.addEventListener('scroll', onScroll, { passive:true });
  bands.forEach(function(b){ b.op = -1; b.k = -1; });
  unpinFinalStates();
  updateCaptions(heroProgress());
  onScroll();
}
function disableScrub(){
  if(!scrubOn) return;
  scrubOn = false;
  window.removeEventListener('scroll', onScroll);
  if(rafId !== null){ cancelAnimationFrame(rafId); rafId = null; }
}
function applyHeroMode(){
  if(MQLS.some(function(m){ return m.matches; })){
    disableScrub();
    /* the static hero still needs its picture */
    if(!poster.style.backgroundImage){
      poster.style.backgroundImage = "url('assets/hero-ending.jpg')";
    }
  } else {
    enableScrub();
  }
}
MQLS.forEach(function(m){ m.addEventListener('change', applyHeroMode); });

if(hero){
  new IntersectionObserver(function(es){
    heroOnScreen = es[0].isIntersecting;
    if(heroOnScreen && scrubOn && rafId === null) rafId = requestAnimationFrame(tick);
  }, { rootMargin:'120px' }).observe(hero);
}

/* ==========================================================================
   THE SPINE: a sounding line drawn down the career
   ========================================================================== */
var spine = $('#spine'), spineDraw = $('#spineDraw'), spineNodes = $('#spineNodes');
var YEARS = ['2016','2018','2020','2022','2024','2026'];
var nodeEls = [];

function buildSpine(){
  spineNodes.innerHTML = '';
  nodeEls = [];
  YEARS.forEach(function(y, i){
    var n = el('div','spine-node');
    n.style.top = (8 + (i / (YEARS.length - 1)) * 84).toFixed(2) + '%';
    n.appendChild(el('div','spine-dot'));
    n.appendChild(el('div','spine-year', y));
    spineNodes.appendChild(n);
    nodeEls.push({ el:n, at: 0.08 + (i / (YEARS.length - 1)) * 0.84, lit:false });
  });
}

function placeSpine(){
  if(!spine || !hero) return;
  var foot = $('.foot');
  var top = hero.offsetHeight;
  var bottom = foot ? foot.offsetTop : document.body.scrollHeight;
  spine.style.top = top + 'px';
  spine.style.height = Math.max(0, bottom - top) + 'px';
}

var lastSp = -1;
var spinePinned = false;
function updateSpine(){
  /* while pinned for reduced motion the scroll drive must not write over the final state */
  if(!spine || spinePinned) return;
  var r = spine.getBoundingClientRect();
  var vh = window.innerHeight;
  var sp = clamp((vh * 0.62 - r.top) / Math.max(1, r.height), 0, 1);
  if(Math.abs(sp - lastSp) > 0.004){
    lastSp = sp;
    spine.style.setProperty('--sp', sp.toFixed(3));
    nodeEls.forEach(function(n){
      var lit = sp >= n.at;
      if(lit !== n.lit){ n.lit = lit; n.el.classList.toggle('lit', lit); }
    });
  }
}

/* ==========================================================================
   ENTRANCES
   ========================================================================== */
function initEntrances(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
      /* retire the stagger once the entrance has played */
      setTimeout(function(){ e.target.classList.add('done'); }, 1200);
    });
  }, { rootMargin:'0px 0px -12% 0px', threshold:0.08 });
  $$('.sec').forEach(function(s){ io.observe(s); });
}

/* ==========================================================================
   FAQ
   ========================================================================== */
function initFaq(){
  $$('.qitem').forEach(function(item){
    var btn = $('.qbtn', item), ans = $('.qans', item);
    btn.addEventListener('click', function(){
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      ans.style.height = open ? (ans.scrollHeight + 'px') : '0px';
    });
  });
  window.addEventListener('resize', function(){
    $$('.qitem.open').forEach(function(i){
      $('.qans', i).style.height = $('.qans', i).scrollHeight + 'px';
    });
  });
}

/* ==========================================================================
   THE ONE INTERACTIVE MOMENT: hold to open the study
   ========================================================================== */
var holdV = 0, holding = false, holdRaf = null, holdLast = 0, holdDone = false;
function initHold(){
  var btn = $('#holdBtn'), figsBox = $('#studyFigs');
  if(!btn || !figsBox) return;
  var figs = $$('.fig', figsBox);
  var label = $('span', btn);

  function paint(){
    btn.style.setProperty('--h', holdV.toFixed(3));
    figsBox.style.setProperty('--h', holdV.toFixed(3));
    figs.forEach(function(f, i){
      var lit = holdV >= 0.34 + i * 0.22;
      if(lit !== f.classList.contains('lit')) f.classList.toggle('lit', lit);
    });
    if(holdDone !== btn.classList.contains('done')){
      btn.classList.toggle('done', holdDone);
      btn.setAttribute('aria-pressed', holdDone ? 'true' : 'false');
    }
    var want = label.getAttribute('data-' + lang + (holdDone ? '-done' : ''));
    if(want && label.textContent !== want) label.textContent = want;
  }

  function loop(now){
    var dt = Math.min(64, now - (holdLast || now));
    holdLast = now;
    var dir = holding ? 1 : -1;
    var speed = holding ? 0.00085 : 0.0016;
    holdV = clamp(holdV + dir * speed * dt, 0, 1);
    /* once it is open it stays open: the visitor's effort has to earn something that lasts */
    if(holdV >= 1) holdDone = true;
    paint();
    var keep = holdDone ? false : ((holding && holdV < 1) || (!holding && holdV > 0));
    if(keep){
      holdRaf = requestAnimationFrame(loop);
    } else {
      holdRaf = null; holdLast = 0;
    }
  }
  function start(e){
    if(e.cancelable) e.preventDefault();
    if(holdDone) return;
    holding = true;
    if(holdRaf === null) holdRaf = requestAnimationFrame(loop);
  }
  function end(){
    holding = false;
    if(holdDone) return;
    if(holdRaf === null && holdV > 0) holdRaf = requestAnimationFrame(loop);
  }

  btn.addEventListener('pointerdown', start);
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
  btn.addEventListener('keydown', function(e){
    if(e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); start(e); }
  });
  btn.addEventListener('keyup', function(e){
    if(e.key === ' ' || e.key === 'Enter') end();
  });

  /* reduced motion gets the finished state with no hold required */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){
    holdV = 1; holdDone = true; paint();
  }
  holdApi = {
    set: function(v){ holdV = v; if(v >= 1) holdDone = true; paint(); },
    repaint: paint
  };
}
var holdApi = null;

/* ==========================================================================
   FORM: composes a real email, says so plainly
   ========================================================================== */
function initForm(){
  var f = $('#cform');
  if(!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var name = $('#f-name').value.trim();
    var co   = $('#f-company').value.trim();
    var msg  = $('#f-msg').value.trim();
    if(!name || !msg){
      (!name ? $('#f-name') : $('#f-msg')).focus();
      return;
    }
    var subject = (lang === 'ar' ? 'رسالة من الموقع · ' : 'Message from your site · ') + name + (co ? ' · ' + co : '');
    var body = (lang === 'ar'
      ? ('الاسم: ' + name + '\nالشركة: ' + (co || 'لم تُذكر') + '\n\n' + msg)
      : ('Name: ' + name + '\nCompany: ' + (co || 'not given') + '\n\n' + msg));
    var done = $('#fdone');
    done.hidden = false;
    done.textContent = done.getAttribute('data-' + lang);
    window.location.href = 'mailto:eyax249@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

/* ==========================================================================
   REDUCED MOTION, honored live and in both directions
   ========================================================================== */
function pinToFinalStates(){
  disableScrub();
  document.documentElement.classList.add('pinned');
  $$('.sec').forEach(function(s){ s.classList.add('in','done'); });
  if(spine){
    spinePinned = true;
    spine.style.setProperty('--sp','1');
    nodeEls.forEach(function(n){ n.lit = true; n.el.classList.add('lit'); });
    lastSp = 1;
  }
  if(holdApi) holdApi.set(1);
}
function unpinFinalStates(){
  document.documentElement.classList.remove('pinned');
  spinePinned = false;
  lastSp = -1;
  updateSpine();
}
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e){
  if(e.matches) pinToFinalStates();
  else applyHeroMode();
});

/* ==========================================================================
   BOOT
   ========================================================================== */
function boot(){
  render();
  buildSpine();
  applyLang();
  initEntrances();
  initFaq();
  initHold();
  initForm();
  placeSpine();
  applyHeroMode();

  $('#langbtn').addEventListener('click', function(){
    lang = (lang === 'ar') ? 'en' : 'ar';
    applyLang();
  });

  var topbar = $('#topbar');
  var lastSolid = null;
  function pageScroll(){
    var solid = window.scrollY > 40;
    if(solid !== lastSolid){ lastSolid = solid; topbar.classList.toggle('solid', solid); }
    updateSpine();
  }
  window.addEventListener('scroll', pageScroll, { passive:true });
  pageScroll();

  var rt = null;
  window.addEventListener('resize', function(){
    clearTimeout(rt);
    rt = setTimeout(function(){ placeSpine(); updateSpine(); }, 120);
  });
  window.addEventListener('load', function(){ placeSpine(); updateSpine(); });

  document.addEventListener('visibilitychange', function(){
    document.body.classList.toggle('paused', document.hidden);
  });

  if(matchMedia('(prefers-reduced-motion: reduce)').matches) pinToFinalStates();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
