const fs = require('fs');

const toolsRaw = [
  { name: 'JPG to PDF', description: 'Turn a batch of images into one clean PDF.' },
  { name: 'Split PDF', description: 'Extract selected pages into a new PDF.' },
  { name: 'Merge PDF', description: 'Join PDFs in the order you choose.' },
  { name: 'Compress PDF', description: 'Optimize and resave a PDF file.' },
  { name: 'PDF to JPG', description: 'Render a PDF page as a JPG image.' },
  { name: 'Compress Image', description: 'Reduce file size without needless noise.' },
  { name: 'HEIC to JPG', description: 'Convert HEIC photos into JPG.' },
  { name: 'Resize Image', description: 'Change image dimensions with precision.' },
  { name: 'Crop Image', description: 'Crop an image using pixel coordinates.' },
  { name: 'Watermark Image', description: 'Add a text watermark to an image.' },
  { name: 'Blur / Redact Image', description: 'Hide sensitive areas with blur or black boxes.' },
  { name: 'QR Code', description: 'Generate static QR codes instantly.' },
  { name: 'QR Code Scanner', description: 'Read QR code data from an image.' },
  { name: 'JSON Formatter', description: 'Format and validate JSON snippets.' },
  { name: 'URL Encode / Decode', description: 'Encode and decode URL strings.' },
  { name: 'Word Counter', description: 'Count words, characters, and paragraphs.' },
  { name: 'UUID Generator', description: 'Generate UUID v4 values.' },
  { name: 'Timestamp Converter', description: 'Convert Unix timestamps and dates.' },
  { name: 'Image Converter', description: 'Convert between JPG, PNG, and WebP.' },
  { name: 'SVG to PNG', description: 'Render pasted SVG markup as PNG.' },
  { name: 'PNG to SVG', description: 'Trace a PNG image into SVG paths.' },
  { name: 'Base64', description: 'Encode or decode Base64 text.' },
  { name: 'Rotate PDF', description: 'Rotate all PDF pages by a fixed angle.' },
  { name: 'Reorder PDF Pages', description: 'Rebuild a PDF in a custom page order.' },
  { name: 'Add Page Numbers to PDF', description: 'Stamp page numbers into a PDF.' },
  { name: 'PDF Protect / Unlock', description: 'Security workflow status and next step.' },
  { name: 'OCR PDF', description: 'Extract text from the first PDF page.' },
  { name: 'Screenshot to Text', description: 'Run OCR on a screenshot image.' }
];

const zhTranslation = {
  'JPG to PDF': { name: 'JPG转PDF', desc: '将多张图片转换为一个干净的PDF文档。' },
  'Split PDF': { name: '拆分PDF', desc: '将指定的页面提取为新的PDF文档。' },
  'Merge PDF': { name: '合并PDF', desc: '按照你选择的顺序将多个PDF合并。' },
  'Compress PDF': { name: '压缩PDF', desc: '优化并重新保存PDF以减小文件体积。' },
  'PDF to JPG': { name: 'PDF转JPG', desc: '将PDF页面渲染转换为JPG图片。' },
  'Compress Image': { name: '图片压缩', desc: '无损减小图片体积，没有多余的噪点。' },
  'HEIC to JPG': { name: 'HEIC转JPG', desc: '将苹果HEIC照片转换为标准JPG格式。' },
  'Resize Image': { name: '调整图片大小', desc: '精确更改图片的尺寸。' },
  'Crop Image': { name: '裁剪图片', desc: '使用像素坐标精细裁剪图片。' },
  'Watermark Image': { name: '图片加水印', desc: '给图片添加文本水印保护。' },
  'Blur / Redact Image': { name: '图片打码/马赛克', desc: '使用模糊或黑框隐藏敏感区域。' },
  'QR Code': { name: '二维码生成', desc: '即时生成静态二维码。' },
  'QR Code Scanner': { name: '二维码扫描', desc: '从图片中读取二维码数据。' },
  'JSON Formatter': { name: 'JSON格式化', desc: '格式化和校验JSON代码片段。' },
  'URL Encode / Decode': { name: 'URL编码/解码', desc: '对URL字符串进行编码或解码。' },
  'Word Counter': { name: '字数统计', desc: '统计字数、字符数和段落数。' },
  'UUID Generator': { name: 'UUID生成器', desc: '生成随机的UUID v4值。' },
  'Timestamp Converter': { name: '时间戳转换', desc: '转换Unix时间戳和标准日期。' },
  'Image Converter': { name: '图片格式转换', desc: '在JPG、PNG和WebP之间互相转换。' },
  'SVG to PNG': { name: 'SVG转PNG', desc: '将粘贴的SVG代码渲染为PNG图片。' },
  'PNG to SVG': { name: 'PNG转SVG', desc: '将PNG图片转化为SVG矢量路径。' },
  'Base64': { name: 'Base64编码解密', desc: '编码或解密Base64文本。' },
  'Rotate PDF': { name: '旋转PDF', desc: '将所有的PDF页面按固定角度旋转。' },
  'Reorder PDF Pages': { name: '重排PDF页面', desc: '以自定义的页面顺序重新构建PDF。' },
  'Add Page Numbers to PDF': { name: 'PDF添加页码', desc: '在PDF页面底部印上页码。' },
  'PDF Protect / Unlock': { name: 'PDF加密/解锁', desc: '对安全工作流进行状态管理或进行下一步。' },
  'OCR PDF': { name: 'PDF文字识别', desc: '从PDF首页提取纯文字内容。' },
  'Screenshot to Text': { name: '截图转文字(OCR)', desc: '在截图上进行光学字符识别。' }
};

const enResource = {
  translation: {
    "welcome.title": "Your Files, Your Rules.",
    "welcome.subtitle": "The ultimate web-based suite for all your document needs. Free, Fast, and Secure.",
    "welcome.getStarted": "Get Started",
    "welcome.explore": "Explore Tools",
    "nav.pdfTools": "PDF TOOLS",
    "nav.imageTools": "IMAGE TOOLS",
    "nav.allTools": "ALL TOOLS",
    "nav.tools": "All Tools",
    "nav.about": "About Us",
    "nav.privacy": "Privacy Policy",
    "home.title": "Every tool you need to work with files in one place.",
    "home.subtitle": "100% Free and Local. Merge, convert, and compress files directly in your browser without any server uploads.",
    "home.search": "Search for a tool...",
    "home.noMatch": "No tools matched your search for",
    "tab.All": "All Tools",
    "tab.PDF": "PDF Tools",
    "tab.Image": "Image Tools",
    "tab.Utility": "Utility Tools",
    "footer.desc": "Every tool you need to work with PDFs, Images, and more in one place. 100% Free.",
    "footer.solutions": "SOLUTIONS",
    "footer.company": "COMPANY"
  }
};

const zhResource = {
  translation: {
    "welcome.title": "你的文件，由你掌控。",
    "welcome.subtitle": "最全面、最快的在线文档处理套件。安全、免费、纯本地优先。",
    "welcome.getStarted": "立即开始",
    "welcome.explore": "浏览工具库",
    "nav.pdfTools": "PDF 工具",
    "nav.imageTools": "图像 工具",
    "nav.allTools": "所有 工具",
    "nav.tools": "全部工具",
    "nav.about": "关于我们",
    "nav.privacy": "隐私政策",
    "home.title": "所有你需要的文件工具，都在这里。",
    "home.subtitle": "100% 免费且纯本地。直接在浏览器中合并、转换和压缩文件，而无需向服务器上传任何内容。",
    "home.search": "搜索工具...",
    "home.noMatch": "没有匹配您搜索的工具",
    "tab.All": "全部",
    "tab.PDF": "PDF",
    "tab.Image": "图片",
    "tab.Utility": "实用",
    "footer.desc": "在这里找到你需要处理PDF、图片的所有工具。100%免费。",
    "footer.solutions": "解决方案",
    "footer.company": "公司"
  }
};

// Insert tool translations
toolsRaw.forEach(tool => {
  const key = tool.name.replace(/[^a-zA-Z0-9]/g, '');
  enResource.translation[`tool.${key}.name`] = tool.name;
  enResource.translation[`tool.${key}.desc`] = tool.description;
  zhResource.translation[`tool.${key}.name`] = zhTranslation[tool.name]?.name || tool.name;
  zhResource.translation[`tool.${key}.desc`] = zhTranslation[tool.name]?.desc || tool.description;
});

const content = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: ${JSON.stringify(enResource, null, 2)},
  zh: ${JSON.stringify(zhResource, null, 2)}
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
`;

fs.writeFileSync('src/i18n.ts', content);
console.log('Translations generated.');
