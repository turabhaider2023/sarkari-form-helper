export function fill(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = data[key]
    return value === undefined || value === null ? '' : String(value)
  })
}

const hi = {
  siteName: 'Sarkari Form Helper',
  tagline: 'फोटो और सिग्नेचर, सही साइज में',
  openTool: 'खोलें',
  homeTitle: 'Sarkari Form Helper | NEET, JEE, SSC फोटो साइज़',
  homeDescription:
    'NEET, JEE, SSC CGL, CHSL, GD, RRB, IBPS, SBI, RBI, Agniveer, UPSC, state PSC और teaching exams का फोटो साइज फोन पर ठीक करें। फोटो अपलोड नहीं होती।',
  homeH1: 'सरकारी फॉर्म के लिए फोटो और सिग्नेचर का साइज ठीक करें',
  homeIntro:
    'NEET, JEE, SSC, रेलवे, बैंक, RBI, Agniveer, UPSC, state PSC, India Post और teaching exams साल भर आते रहते हैं। नीचे अपना exam चुनें। साइज नोटिफिकेशन से मिला लें।',
  privacy:
    'आपकी फोटो कहीं अपलोड नहीं होती। सारा काम इसी ब्राउज़र में होता है, फोन पर और कंप्यूटर के वेब ब्राउज़र में भी। कोई सर्वर फोटो नहीं देखता।',
  noticeTag: 'ध्यान दें',
  notOfficial:
    'यह सरकारी वेबसाइट नहीं है। SSC, UPSC, IBPS या किसी विभाग से जुड़ी नहीं है। फर्जी दस्तावेज न बनाएं।',
  sizeCanChange:
    'पिक्सल साइज समय-समय पर बदल सकते हैं। एक बार अपने सरकारी एग्जाम की नई सूचना पढ़ लें। यहाँ साइज में गलती हो सकती है।',
  chooseTool: 'टूल चुनें',
  searchPlaceholder: 'Exam का नाम लिखें, जैसे NEET, SSC CGL, RBI',
  searchLabel: 'Exam खोजें',
  noMatch: 'इस नाम का exam नहीं मिला। spelling चेक करें।',
  allCategories: 'सभी',
  backToTop: 'ऊपर जाएँ',
  cat: {
    ssc: { label: 'SSC', h1: 'SSC फोटो और सिग्नेचर साइज', description: 'SSC, CGL, CHSL, MTS, GD, CPO और JE का फोटो या सिग्नेचर चुनें। नई सूचना से साइज मिला लें।' },
    railway: { label: 'Railway', h1: 'Railway फोटो और सिग्नेचर साइज', description: 'RRB, NTPC, Group D और ALP का साइज यहाँ से ठीक करें।' },
    defence: { label: 'Defence', h1: 'Defence फोटो और सिग्नेचर साइज', description: 'Agniveer, AFCAT, NDA, CDS और CAPF का साइज यहाँ है।' },
    bank: { label: 'Bank', h1: 'Bank फोटो और सिग्नेचर साइज', description: 'IBPS, SBI, RBI, NABARD, LIC, EPFO, ESIC और FCI का साइज चुनें।' },
    state: { label: 'State', h1: 'State exam फोटो और सिग्नेचर साइज', description: 'UPPSC, BPSC, MPPSC, MPSC, TNPSC, DSSSB और police forms।' },
    teaching: { label: 'Teaching', h1: 'Teaching exam फोटो और सिग्नेचर साइज', description: 'CTET, KVS, NVS, REET, UPTET और UGC NET का साइज।' },
    medical: { label: 'Medical', h1: 'Medical exam फोटो और सिग्नेचर साइज', description: 'NEET, NEET PG, GPAT और FMGE का साइज।' },
    engineering: { label: 'Engineering', h1: 'Engineering exam फोटो और सिग्नेचर साइज', description: 'JEE Main और GATE का फोटो या सिग्नेचर चुनें।' },
    entrance: { label: 'Entrance', h1: 'Entrance exam फोटो और सिग्नेचर साइज', description: 'CUET UG, CUET PG, CMAT और CSIR NET का साइज।' },
    upsc: { label: 'UPSC', h1: 'UPSC फोटो और सिग्नेचर साइज', description: 'UPSC CSE फॉर्म का फोटो और सिग्नेचर। NDA, CDS और CAPF Defence में हैं।' },
    other: { label: 'और भर्ती', h1: 'और सरकारी फॉर्म का साइज', description: 'India Post GDS और बाकी भर्ती का फोटो या सिग्नेचर।' },
    kb: { label: 'सिर्फ KB', h1: 'सिर्फ KB कम करें', description: 'पिक्सल same रहेंगे। फाइल 20, 50, 100 या 200 KB तक करें।' },
  },
  groupSsc: 'SSC',
  groupRrb: 'Railway (RRB)',
  groupGeneral: 'सिर्फ KB कम करनी हो',
  otherTools: 'बाकी टूल',
  guideTitle: 'कैसे करें',
  faqTitle: 'अक्सर पूछे जाने वाले सवाल',
  sizeTable: 'मांगा गया साइज',
  pixelSize: 'पिक्सल',
  cmSize: 'सेमी',
  fileSize: 'फाइल साइज',
  pixelsKeep: 'पिक्सल नहीं बदलेंगे। फोटो का अपना अनुपात रहेगा।',
  cmKeep: 'कोई तय सेमी साइज नहीं।',
  presetLabel: 'कौन सा साइज चाहिए',
  customSize: 'अपना साइज डालें',
  widthPx: 'चौड़ाई (पिक्सल)',
  heightPx: 'ऊँचाई (पिक्सल)',
  minKb: 'कम से कम KB',
  maxKb: 'ज्यादा से ज्यादा KB',
  useCustom: 'इस साइज पर सेट करें',
  clearCustom: 'पेज वाला साइज वापस लें',
  customOn: 'अभी आपका डाला हुआ साइज चल रहा है।',
  choosePhoto: 'फोटो चुनें',
  photoTypes: 'JPG, PNG या WebP। गैलरी या कैमरा, दोनों चलेंगे।',
  changePhoto: 'दूसरी फोटो चुनें',
  zoom: 'ज़ूम',
  resize: 'Resize',
  working: 'बना रहे हैं...',
  download: 'Download',
  tryAnother: 'दूसरी फोटो आज़माएँ',
  resultReady: 'फोटो तैयार है',
  finalKb: 'फाइल साइज',
  finalPixels: 'पिक्सल साइज',
  badType: 'सिर्फ JPG, PNG या WebP चुनें।',
  badCustom: 'चौड़ाई, ऊँचाई और KB सही संख्या में डालें। ज्यादा से ज्यादा KB, कम से कम KB से बड़ी होनी चाहिए।',
  loadError: 'यह फोटो नहीं खुल पाई। दूसरी फोटो चुनें।',
  resizeError: 'फोटो बन नहीं पाई। दूसरी फोटो आज़माएँ।',
  warningOver:
    'यह फोटो मांगी गई KB में पूरी नहीं आ रही। क्वालिटी और कम कर दी है, फिर भी फाइल बड़ी हो सकती है। दूसरी फोटो आज़माएँ।',
  warningUnder:
    'फाइल कम से कम साइज से छोटी रह गई। क्वालिटी बढ़ाते ही वह अधिकतम KB से बड़ी हो जाती है।',
  loading: 'खुल रहा है...',
  photoWord: 'फोटो',
  signatureWord: 'सिग्नेचर',
  pages: {
    photo: {
      title: '{exam} Photo Resize {minKb}KB–{maxKb}KB | {labelHi} साइज़ कैसे करें',
      description:
        '{exam} फॉर्म के लिए फोटो को {cmWidth} × {cmHeight} सेमी ({width}×{height} पिक्सल) और {minKb}–{maxKb} KB की JPEG बनाएँ। फोटो फोन से बाहर नहीं जाती। Resize an {exam} photo to {width}×{height}px, {minKb}–{maxKb} KB, in the browser.',
      h1: '{labelHi} साइज़ कैसे करें',
      steps: [
        'नीचे फोटो चुनें। गैलरी या कैमरा, दोनों चलेंगे।',
        'फोटो को उंगली से खींचें। ज़ूम से चेहरा बॉक्स के अंदर लाएँ।',
        'Resize दबाएँ। फोटो {width}×{height} पिक्सल और {minKb} से {maxKb} KB की JPEG बनेगी।',
        'Download करके वही फाइल फॉर्म में लगाएँ।',
      ],
      faqs: [
        {
          q: '{exam} फोटो कितने पिक्सल की होनी चाहिए?',
          a: '{width} पिक्सल चौड़ी और {height} पिक्सल ऊँची। यह {cmWidth} × {cmHeight} सेमी के बराबर रखा गया है। नई सूचना आ जाए तो साइज मिला लें।',
        },
        {
          q: 'फाइल कितने KB की होनी चाहिए?',
          a: '{minKb} KB से {maxKb} KB के बीच। टूल अधिकतम साइज से थोड़ा नीचे रखने की कोशिश करता है।',
        },
        {
          q: 'क्या मेरी फोटो कहीं अपलोड होती है?',
          a: 'नहीं। फोटो इसी ब्राउज़र में रहती है, फोन पर और कंप्यूटर पर भी। इस साइट का कोई सर्वर फोटो नहीं लेता।',
        },
        {
          q: 'कौन सी फोटो चलती है?',
          a: 'JPG, PNG या WebP चुनें। डाउनलोड हमेशा JPEG में मिलता है, क्योंकि फॉर्म JPEG माँगते हैं।',
        },
        {
          q: 'साइज ठीक नहीं हुआ तो क्या करें?',
          a: 'दूसरी फोटो लें, ज़ूम थोड़ा कम करें, और Resize फिर दबाएँ। फोटो साफ हो और चेहरा बीच में हो।',
        },
      ],
    },
    signature: {
      title: '{exam} Signature Resize {minKb}KB–{maxKb}KB | {labelHi} साइज़ कैसे करें',
      description:
        '{exam} फॉर्म के लिए सिग्नेचर को {width}×{height} पिक्सल और {minKb}–{maxKb} KB की JPEG बनाएँ। {cmNote}सिग्नेचर फोन से बाहर नहीं जाता।',
      h1: '{labelHi} साइज़ कैसे करें',
      steps: [
        'नीचे सिग्नेचर की फोटो चुनें। सफेद कागज पर काले पेन से साइन करें, फिर फोटो लें।',
        'साइन को खींचकर बॉक्स के अंदर लाएँ। ज़ूम से खाली जगह कम करें।',
        'Resize दबाएँ। सिग्नेचर {width}×{height} पिक्सल और {minKb} से {maxKb} KB की JPEG बनेगा।',
        'Download करके वही फाइल फॉर्म में लगाएँ।',
      ],
      faqs: [
        {
          q: '{exam} सिग्नेचर कितने पिक्सल का होना चाहिए?',
          a: '{width} पिक्सल चौड़ा और {height} पिक्सल ऊँचा। {cmNote}नई सूचना आ जाए तो साइज मिला लें।',
        },
        {
          q: 'फाइल कितने KB की होनी चाहिए?',
          a: '{minKb} KB से {maxKb} KB के बीच। टूल अधिकतम साइज से थोड़ा नीचे रखने की कोशिश करता है।',
        },
        {
          q: 'क्या मेरा सिग्नेचर कहीं अपलोड होता है?',
          a: 'नहीं। सिग्नेचर इसी ब्राउज़र में रहता है, फोन पर और कंप्यूटर पर भी। इस साइट का कोई सर्वर फाइल नहीं लेता।',
        },
        {
          q: 'कौन सी फाइल चलती है?',
          a: 'JPG, PNG या WebP चुनें। डाउनलोड हमेशा JPEG में मिलता है।',
        },
        {
          q: 'साइज ज्यादा रह जाए तो क्या करें?',
          a: 'साइन के आसपास की खाली जगह काटें, ज़ूम ठीक करें, और Resize फिर दबाएँ।',
        },
      ],
    },
    compress: {
      title: 'Resize Image to {maxKb}KB | फोटो को {maxKb} KB करें',
      description:
        'फोटो का अनुपात वही रखकर फाइल को {minKb}–{maxKb} KB की JPEG बनाएँ। फोटो फोन से बाहर नहीं जाती। Compress an image to about {maxKb} KB in the browser without uploading it.',
      h1: 'फोटो को {maxKb} KB में करें',
      steps: [
        'नीचे फोटो चुनें। JPG, PNG या WebP चलेंगे।',
        'जरूरत हो तो फोटो को खींचें और ज़ूम करें। अनुपात लॉक रहता है।',
        'Resize दबाएँ। पिक्सल का अनुपात नहीं बदलेगा, फाइल करीब {maxKb} KB की JPEG बनेगी।',
        'Download करके फाइल इस्तेमाल करें।',
      ],
      faqs: [
        {
          q: 'क्या फोटो की चौड़ाई और ऊँचाई बदलती है?',
          a: 'नहीं। यह पेज सिर्फ KB कम करता है। फोटो का अपना चौड़ाई-ऊँचाई अनुपात रहता है।',
        },
        {
          q: 'फाइल कितने KB की बनेगी?',
          a: 'लक्ष्य {minKb} से {maxKb} KB है। टूल अधिकतम साइज से थोड़ा नीचे रखने की कोशिश करता है।',
        },
        {
          q: 'क्या फोटो सर्वर पर जाती है?',
          a: 'नहीं। सारा काम इसी ब्राउज़र में होता है, फोन पर और कंप्यूटर पर भी।',
        },
        {
          q: 'बहुत बड़ी फोटो {maxKb} KB में नहीं आई तो?',
          a: 'टूल क्वालिटी और कम करता है। फिर भी सीमा पार हो तो स्क्रीन पर चेतावनी दिखेगी। ज़ूम करके हिस्सा छोटा करें, या अपना पिक्सल साइज डालें।',
        },
        {
          q: 'कौन सा फॉर्मेट चुनें?',
          a: 'JPG, PNG या WebP। डाउनलोड JPEG में मिलेगा।',
        },
      ],
    },
  },
}

const en = {
  siteName: 'Sarkari Form Helper',
  tagline: 'Photo and signature, exact size',
  openTool: 'Open',
  homeTitle: 'Sarkari Form Helper | NEET, JEE and SSC photo size',
  homeDescription:
    'Resize photos and signatures for NEET, JEE, SSC CGL, CHSL, GD, RRB, IBPS, SBI, RBI, Agniveer, UPSC, state PSC and teaching exams. The picture is not uploaded.',
  homeH1: 'Fix photo and signature size for government forms',
  homeIntro:
    'NEET, JEE, SSC, Railway, bank, RBI, Agniveer, UPSC, state PSC, India Post and teaching exams open through the year. Pick yours below, then match the latest notice.',
  privacy:
    'Your photo is never uploaded. All work happens in this browser, on a phone and on a computer web browser. No server sees the picture.',
  noticeTag: 'Please note',
  notOfficial:
    'This is not a government website and is not linked to SSC, UPSC, IBPS, or any department. Do not make false documents.',
  sizeCanChange:
    'Pixel sizes can change from time to time. Read your government exam notification once. The size shown here can be wrong.',
  chooseTool: 'Choose a tool',
  searchPlaceholder: 'Type an exam, such as NEET, SSC CGL or RBI',
  searchLabel: 'Search exams',
  noMatch: 'No exam found with that name. Check the spelling.',
  allCategories: 'All',
  backToTop: 'Move to top',
  cat: {
    ssc: { label: 'SSC', h1: 'SSC photo and signature size', description: 'SSC, CGL, CHSL, MTS, GD, CPO and JE. Match the latest notice.' },
    railway: { label: 'Railway', h1: 'Railway photo and signature size', description: 'RRB, NTPC, Group D and ALP.' },
    defence: { label: 'Defence', h1: 'Defence photo and signature size', description: 'Agniveer, AFCAT, NDA, CDS and CAPF.' },
    bank: { label: 'Bank', h1: 'Bank photo and signature size', description: 'IBPS, SBI, RBI, NABARD, LIC, EPFO, ESIC and FCI.' },
    state: { label: 'State', h1: 'State exam photo and signature size', description: 'UPPSC, BPSC, MPPSC, MPSC, TNPSC, DSSSB and police forms.' },
    teaching: { label: 'Teaching', h1: 'Teaching exam photo and signature size', description: 'CTET, KVS, NVS, REET, UPTET and UGC NET.' },
    medical: { label: 'Medical', h1: 'Medical exam photo and signature size', description: 'NEET, NEET PG, GPAT and FMGE.' },
    engineering: { label: 'Engineering', h1: 'Engineering exam photo and signature size', description: 'JEE Main and GATE.' },
    entrance: { label: 'Entrance', h1: 'Entrance exam photo and signature size', description: 'CUET UG, CUET PG, CMAT and CSIR NET.' },
    upsc: { label: 'UPSC', h1: 'UPSC photo and signature size', description: 'UPSC CSE photo and signature. NDA, CDS and CAPF are under Defence.' },
    other: { label: 'More jobs', h1: 'More government form sizes', description: 'India Post GDS and other recruitments.' },
    kb: { label: 'KB only', h1: 'Only reduce KB', description: 'Pixels stay the same. Make the file 20, 50, 100 or 200 KB.' },
  },
  groupSsc: 'SSC',
  groupRrb: 'Railway (RRB)',
  groupGeneral: 'Only reduce KB',
  otherTools: 'Other tools',
  guideTitle: 'How to do it',
  faqTitle: 'Common questions',
  sizeTable: 'Required size',
  pixelSize: 'Pixels',
  cmSize: 'Centimetres',
  fileSize: 'File size',
  pixelsKeep: 'Pixels stay in the original ratio. Only the file size changes.',
  cmKeep: 'No fixed centimetre size.',
  presetLabel: 'Which size do you need',
  customSize: 'Enter your own size',
  widthPx: 'Width (pixels)',
  heightPx: 'Height (pixels)',
  minKb: 'Minimum KB',
  maxKb: 'Maximum KB',
  useCustom: 'Use this size',
  clearCustom: 'Use this page’s size',
  customOn: 'Your custom size is on.',
  choosePhoto: 'Choose photo',
  photoTypes: 'JPG, PNG, or WebP. Gallery or camera both work.',
  changePhoto: 'Choose another photo',
  zoom: 'Zoom',
  resize: 'Resize',
  working: 'Working...',
  download: 'Download',
  tryAnother: 'Try another photo',
  resultReady: 'Your file is ready',
  finalKb: 'File size',
  finalPixels: 'Pixel size',
  badType: 'Choose only JPG, PNG, or WebP.',
  badCustom: 'Enter width, height, and KB as numbers. Maximum KB must be higher than minimum KB.',
  loadError: 'This photo could not be opened. Choose another one.',
  resizeError: 'The photo could not be made. Try another photo.',
  warningOver:
    'This photo still cannot fit the KB limit. Quality was reduced further, and the file may still be too big. Try another photo.',
  warningUnder:
    'The file is smaller than the minimum. Raising the quality would push it over the maximum KB.',
  loading: 'Loading...',
  photoWord: 'photo',
  signatureWord: 'signature',
  pages: {
    photo: {
      title: '{exam} Photo Resize {minKb}KB–{maxKb}KB | How to resize {labelEn}',
      description:
        'Make an {exam} photo JPEG of {width}×{height} pixels ({cmWidth} × {cmHeight} cm), between {minKb} and {maxKb} KB. The photo stays on your phone.',
      h1: 'How to resize {labelEn}',
      steps: [
        'Choose a photo below. Gallery or camera both work.',
        'Drag the photo and use zoom so the face sits inside the box.',
        'Tap Resize. You get a {width}×{height} pixel JPEG between {minKb} and {maxKb} KB.',
        'Tap Download and upload that file on the form.',
      ],
      faqs: [
        {
          q: 'How many pixels should the {exam} photo be?',
          a: '{width} pixels wide and {height} pixels tall. {cmNote}Check the latest notice before you apply.',
        },
        {
          q: 'How many KB should the file be?',
          a: 'Between {minKb} KB and {maxKb} KB. The tool aims a little under the maximum.',
        },
        {
          q: 'Is my photo uploaded?',
          a: 'No. The photo stays in this browser, on a phone and on a computer. This site has no server that receives it.',
        },
        {
          q: 'Which file types work?',
          a: 'Choose JPG, PNG, or WebP. The download is always a JPEG, because the forms ask for JPEG.',
        },
        {
          q: 'What if the size is still wrong?',
          a: 'Try another photo, zoom out a little, and tap Resize again. Keep the face in the middle.',
        },
      ],
    },
    signature: {
      title: '{exam} Signature Resize {minKb}KB–{maxKb}KB | How to resize {labelEn}',
      description:
        'Make an {exam} signature JPEG of {width}×{height} pixels, between {minKb} and {maxKb} KB. {cmNote}The file stays on your phone.',
      h1: 'How to resize {labelEn}',
      steps: [
        'Choose a photo of your signature. Sign with a black pen on white paper, then take the photo.',
        'Drag the sign into the box. Zoom to cut extra empty space.',
        'Tap Resize. You get a {width}×{height} pixel JPEG between {minKb} and {maxKb} KB.',
        'Tap Download and upload that file on the form.',
      ],
      faqs: [
        {
          q: 'How many pixels should the {exam} signature be?',
          a: '{width} pixels wide and {height} pixels tall. {cmNote}Check the latest notice before you apply.',
        },
        {
          q: 'How many KB should the file be?',
          a: 'Between {minKb} KB and {maxKb} KB. The tool aims a little under the maximum.',
        },
        {
          q: 'Is my signature uploaded?',
          a: 'No. It stays in this browser, on a phone and on a computer. This site has no server that receives the file.',
        },
        {
          q: 'Which file types work?',
          a: 'Choose JPG, PNG, or WebP. The download is always a JPEG.',
        },
        {
          q: 'What if the file is still too big?',
          a: 'Crop the empty space around the sign, set the zoom again, and tap Resize.',
        },
      ],
    },
    compress: {
      title: 'Resize Image to {maxKb}KB | Compress a photo to {maxKb} KB',
      description:
        'Compress a photo to {minKb}–{maxKb} KB and keep the original aspect ratio. The picture is not uploaded.',
      h1: 'Make a photo {maxKb} KB',
      steps: [
        'Choose a photo below. JPG, PNG, or WebP all work.',
        'Drag and zoom if you need to. The ratio stays locked.',
        'Tap Resize. The ratio stays the same and the JPEG aims for about {maxKb} KB.',
        'Tap Download and use the file.',
      ],
      faqs: [
        {
          q: 'Does this change the width and height?',
          a: 'No. This page only reduces KB. The photo keeps its own width-to-height ratio.',
        },
        {
          q: 'How many KB will the file be?',
          a: 'The target is {minKb} to {maxKb} KB. The tool aims a little under the maximum.',
        },
        {
          q: 'Is the photo uploaded?',
          a: 'No. The work happens in this browser, on a phone and on a computer.',
        },
        {
          q: 'What if a huge photo cannot reach {maxKb} KB?',
          a: 'The tool lowers the quality further and shows a warning if it still cannot fit. Zoom in, or enter your own pixel size.',
        },
        {
          q: 'Which file type should I choose?',
          a: 'JPG, PNG, or WebP. The download is a JPEG.',
        },
      ],
    },
  },
}

export const strings = { hi, en }

export function getPageText(lang, preset) {
  const pack = strings[lang].pages[preset.type]
  const cmWidth = preset.cmWidth == null ? '' : Number(preset.cmWidth).toFixed(1)
  const cmHeight = preset.cmHeight == null ? '' : Number(preset.cmHeight).toFixed(1)
  const cmNote = preset.cmWidth == null
    ? ''
    : (lang === 'hi'
      ? `यह ${cmWidth} × ${cmHeight} सेमी के बराबर रखा गया है। `
      : `That matches ${cmWidth} × ${cmHeight} cm. `)
  const data = {
    ...preset,
    cmWidth,
    cmHeight,
    cmNote,
  }
  return {
    title: fill(pack.title, data),
    description: fill(pack.description, data),
    h1: fill(pack.h1, data),
    steps: pack.steps.map((step) => fill(step, data)),
    faqs: pack.faqs.map((faq) => ({
      q: fill(faq.q, data),
      a: fill(faq.a, data),
    })),
  }
}
