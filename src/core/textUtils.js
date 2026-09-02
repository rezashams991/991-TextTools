/**
 * Text utilities with Arabic/Persian ligature preservation
 * Preserves the original shape of each character when reversing using Unicode Presentation Forms.
 */

// ============================================================
// 1. PERSIAN / ARABIC REVERSE LOGIC
// ============================================================

const ARABIC_GLYPH_MAP = {
  // Non-connectors (isolated and final forms only)
  'ا': { iso: '\uFE8D', ini: '\uFE8D', med: '\uFE8E', fin: '\uFE8E' },
  'أ': { iso: '\uFE83', ini: '\uFE83', med: '\uFE84', fin: '\uFE84' },
  'إ': { iso: '\uFE87', ini: '\uFE87', med: '\uFE88', fin: '\uFE88' },
  'آ': { iso: '\uFE81', ini: '\uFE81', med: '\uFE82', fin: '\uFE82' },
  'د': { iso: '\uFEA9', ini: '\uFEA9', med: '\uFEAA', fin: '\uFEAA' },
  'ذ': { iso: '\uFEAB', ini: '\uFEAB', med: '\uFEAC', fin: '\uFEAC' },
  'ر': { iso: '\uFEAD', ini: '\uFEAD', med: '\uFEAE', fin: '\uFEAE' },
  'ز': { iso: '\uFEAF', ini: '\uFEAF', med: '\uFEB0', fin: '\uFEB0' },
  'ژ': { iso: '\uFB8A', ini: '\uFB8A', med: '\uFB8B', fin: '\uFB8B' },
  'و': { iso: '\uFEED', ini: '\uFEED', med: '\uFEEE', fin: '\uFEEE' },
  'ء': { iso: '\uFE80', ini: '\uFE80', med: '\uFE80', fin: '\uFE80' },
  'ؤ': { iso: '\uFE85', ini: '\uFE85', med: '\uFE86', fin: '\uFE86' },
  'ة': { iso: '\uFE93', ini: '\uFE93', med: '\uFE94', fin: '\uFE94' },
  
  // Connectors (4 forms)
  'ب': { iso: '\uFE8F', ini: '\uFE91', med: '\uFE92', fin: '\uFE90' },
  'پ': { iso: '\uFB56', ini: '\uFB58', med: '\uFB59', fin: '\uFB57' },
  'ت': { iso: '\uFE95', ini: '\uFE97', med: '\uFE98', fin: '\uFE96' },
  'ث': { iso: '\uFE99', ini: '\uFE9B', med: '\uFE9C', fin: '\uFE9A' },
  'ج': { iso: '\uFE9D', ini: '\uFE9F', med: '\uFEA0', fin: '\uFE9E' },
  'چ': { iso: '\uFB7A', ini: '\uFB7C', med: '\uFB7D', fin: '\uFB7B' },
  'ح': { iso: '\uFEA1', ini: '\uFEA3', med: '\uFEA4', fin: '\uFEA2' },
  'خ': { iso: '\uFEA5', ini: '\uFEA7', med: '\uFEA8', fin: '\uFEA6' },
  'س': { iso: '\uFEB1', ini: '\uFEB3', med: '\uFEB4', fin: '\uFEB2' },
  'ش': { iso: '\uFEB5', ini: '\uFEB7', med: '\uFEB8', fin: '\uFEB6' },
  'ص': { iso: '\uFEB9', ini: '\uFEBB', med: '\uFEBC', fin: '\uFEBA' },
  'ض': { iso: '\uFEBD', ini: '\uFEBF', med: '\uFEC0', fin: '\uFEBE' },
  'ط': { iso: '\uFEC1', ini: '\uFEC3', med: '\uFEC4', fin: '\uFEC2' },
  'ظ': { iso: '\uFEC5', ini: '\uFEC7', med: '\uFEC8', fin: '\uFEC6' },
  'ع': { iso: '\uFEC9', ini: '\uFECB', med: '\uFECC', fin: '\uFECA' },
  'غ': { iso: '\uFECD', ini: '\uFECF', med: '\uFED0', fin: '\uFECE' },
  'ف': { iso: '\uFED1', ini: '\uFED3', med: '\uFED4', fin: '\uFED2' },
  'ق': { iso: '\uFED5', ini: '\uFED7', med: '\uFED8', fin: '\uFED6' },
  'ک': { iso: '\uFB8E', ini: '\uFB90', med: '\uFB91', fin: '\uFB8F' }, 
  'ك': { iso: '\uFED9', ini: '\uFEDB', med: '\uFEDC', fin: '\uFEDA' }, 
  'گ': { iso: '\uFB92', ini: '\uFB94', med: '\uFB95', fin: '\uFB93' },
  'ل': { iso: '\uFEDD', ini: '\uFEDF', med: '\uFEE0', fin: '\uFEDE' },
  'م': { iso: '\uFEE1', ini: '\uFEE3', med: '\uFEE4', fin: '\uFEE2' },
  'ن': { iso: '\uFEE5', ini: '\uFEE7', med: '\uFEE8', fin: '\uFEE6' },
  'ه': { iso: '\uFEE9', ini: '\uFEEB', med: '\uFEEC', fin: '\uFEEA' },
  'ی': { iso: '\uFBFC', ini: '\uFBFE', med: '\uFBFF', fin: '\uFBFD' }, 
  'ي': { iso: '\uFEF1', ini: '\uFEF3', med: '\uFEF4', fin: '\uFEF2' }, 
  'ئ': { iso: '\uFE89', ini: '\uFE8B', med: '\uFE8C', fin: '\uFE8A' },
  'ى': { iso: '\uFEEF', ini: '\uFEEF', med: '\uFEF0', fin: '\uFEF0' }, 
};

const NON_CONNECTING_CHARS = ['ا', 'أ', 'إ', 'آ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'و', 'ء', 'ؤ', 'ة', 'ى'];

const REVERSE_GLYPH_MAP = {};
for (const [base, forms] of Object.entries(ARABIC_GLYPH_MAP)) {
  REVERSE_GLYPH_MAP[forms.iso] = base;
  REVERSE_GLYPH_MAP[forms.ini] = base;
  REVERSE_GLYPH_MAP[forms.med] = base;
  REVERSE_GLYPH_MAP[forms.fin] = base;
}

export function isArabicChar(char) {
  return (char in ARABIC_GLYPH_MAP) || (char in REVERSE_GLYPH_MAP);
}

function toBaseLetters(word) {
  let result = '';
  for (const char of word) {
    if (char in REVERSE_GLYPH_MAP) {
      result += REVERSE_GLYPH_MAP[char];
    } else {
      result += char;
    }
  }
  return result;
}

function getPresentationForm(baseChar, prevBase, nextBase) {
  if (!(baseChar in ARABIC_GLYPH_MAP)) return baseChar;
  
  const isPrevArabic = isArabicChar(prevBase);
  const isNextArabic = isArabicChar(nextBase);
  
  const connectsToPrev = isPrevArabic && !NON_CONNECTING_CHARS.includes(prevBase);
  const connectsToNext = isNextArabic && !NON_CONNECTING_CHARS.includes(baseChar);
  
  const forms = ARABIC_GLYPH_MAP[baseChar];
  
  if (connectsToPrev && connectsToNext) return forms.med; 
  if (connectsToPrev) return forms.fin;                   
  if (connectsToNext) return forms.ini;                   
  return forms.iso;                                       
}

export function reverseText(text, preserveLigatures = true) {
  if (!text) return '';
  
  if (!preserveLigatures) {
    return text.split('').reverse().join('');
  }
  
  const baseText = toBaseLetters(text);
  
  let reshapedText = '';
  for (let i = 0; i < baseText.length; i++) {
    const char = baseText[i];
    const prevChar = i > 0 ? baseText[i - 1] : '';
    const nextChar = i < baseText.length - 1 ? baseText[i + 1] : '';
    
    reshapedText += getPresentationForm(char, prevChar, nextChar);
  }
  
  return reshapedText.split('').reverse().join('');
}

export function reverseWords(text, preserveLigatures = true) {
  if (!text) return '';
  return text.split(/\s+/).map(word => reverseText(word, preserveLigatures)).join(' ');
}

export function reverseLines(text) {
  if (!text) return '';
  return text.split('\n').reverse().join('\n');
}

export { isArabicChar as isArabicScript };

// ============================================================
// 2. EXISTING FUNCTIONS (DO NOT REMOVE)
// ============================================================

export function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countChars(text, includeSpaces = true) {
  if (!text) return 0;
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
}

export function countLines(text) {
  if (!text) return 0;
  return text.split('\n').length;
}

export function toUpperCase(text) { return text.toUpperCase(); }
export function toLowerCase(text) { return text.toLowerCase(); }
export function toCapitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
export function toTitleCase(text) {
  if (!text) return '';
  return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export function removeDuplicateLines(text) {
  if (!text) return '';
  const lines = text.split('\n');
  const seen = new Set();
  return lines.filter(line => {
    const trimmed = line.trim();
    if (seen.has(trimmed)) return false;
    seen.add(trimmed);
    return true;
  }).join('\n');
}

export function findReplace(text, find, replace, useRegex = false) {
  if (!text) return '';
  if (!find) return text;
  if (useRegex) {
    try {
      const regex = new RegExp(find, 'g');
      return text.replace(regex, replace);
    } catch {
      return text.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
    }
  }
  return text.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
}