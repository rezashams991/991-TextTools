# 991-TextTools

**Client-side text processing tools** – 6 pure JavaScript utilities that run entirely in your browser.  
No data leaves your device. Fast, private, and secure text manipulation.

---

## Features

- **6 Text Tools**: JSON↔CSV, JSON Formatter, Word Counter, Remove Duplicates, Find & Replace, Case Converter
- **100% Client-Side** – All processing happens locally
- **Modular ES Modules** – Import only what you need
- **Framework Agnostic** – Works with any website or framework

---

## File Structure

```
991-TextTools/
├── src/
│   ├── core/
│   │   └── textUtils.js          # Shared text utilities
│   ├── tools/
│   │   ├── jsonCsv.js
│   │   ├── jsonFormatter.js
│   │   ├── wordCounter.js
│   │   ├── removeDuplicates.js
│   │   ├── findReplace.js
│   │   ├── caseConverter.js
│   │   ├── reverseText.js
│   │   └── reverseLine.js
│   └── index.js                  # Exports all tools
├── test.html                     # Test harness
└── README.md
```

---

## Usage

### Local Testing
Open `test.html` in your browser or serve with any static server.

### Integration
```html
<script type="module">
  import { jsonFormatter, wordCounter, caseConverter } from './src/index.js';
  jsonFormatter(document.getElementById('container'));
</script>
```

---

## Tool List

| Tool | Description |
|------|-------------|
| **JSON ↔ CSV** | Convert between JSON and CSV using PapaParse |
| **JSON Formatter** | Pretty-print or minify JSON |
| **Word Counter** | Count words, characters (with/without spaces), and lines |
| **Remove Duplicates** | Remove duplicate lines from text |
| **Find & Replace** | Simple find and replace with regex support |
| **Case Converter** | Convert to UPPER, lower, Capitalize, Title Case |
| **Text Reverser** | Revers input text |
| **Line Reverser** | Revers lines of text |

---

## License

MIT License – see [LICENSE](LICENSE) file.

---

*Built with ❤ by [Reza Shams](https://github.com/rezashams991)*
