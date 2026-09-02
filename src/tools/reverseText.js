/**
 * Reverse Text Tool - Reverse characters with options for Persian/Arabic script
 * Options: reverse whole text, reverse words only, preserve ligatures (for Arabic/Persian)
 */

import { reverseText, reverseWords, reverseLines } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>🔄 Reverse Text</h3>
    <p>Enter your text to reverse it with proper Persian/Arabic ligature support.</p>
    
    <div style="margin:0.5rem 0;display:flex;gap:1rem;flex-wrap:wrap;align-items:center;">
      <label><input type="radio" name="mode" value="chars" checked /> Reverse Characters (full reverse)</label>
      <label><input type="radio" name="mode" value="words" /> Reverse Words Only</label>
      <label><input type="radio" name="mode" value="lines" /> Reverse Lines Order</label>
    </div>
    
    <div style="margin:0.5rem 0;">
      <label><input type="checkbox" id="preserveLigatures" checked /> Preserve Arabic/Persian Ligatures</label>
    </div>

    <textarea id="input" rows="4" placeholder="Enter your text here..." style="width:100%; direction:rtl; padding:8px; font-family:inherit; box-sizing:border-box;">بردن ماهی به اشپزخانه</textarea>
    
    <button id="reverseBtn" style="margin:0.5rem 0; padding:6px 16px; cursor:pointer; background:#007bff; color:white; border:none; border-radius:4px;">Reverse</button>
    
    <div style="margin-top:0.5rem; font-weight:bold;">Output:</div>
    <div id="output" style="background:#f5f5f5; padding:0.75rem; border-radius:4px; white-space:pre-wrap; min-height:50px; direction:rtl; unicode-bidi: embed; font-family:inherit; border: 1px solid #ddd;"></div>
  `;

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');
  const reverseBtn = container.querySelector('#reverseBtn');
  const modeRadios = container.querySelectorAll('input[name="mode"]');
  const preserveLigatures = container.querySelector('#preserveLigatures');

  function getMode() {
    for (const radio of modeRadios) {
      if (radio.checked) return radio.value;
    }
    return 'chars';
  }

  function performReverse() {
    const text = input.value;
    const mode = getMode();
    const preserve = preserveLigatures.checked;
    let result = '';

    try {
      if (mode === 'chars') {
        result = reverseText(text, preserve);
      } else if (mode === 'words') {
        result = reverseWords(text, preserve);
      } else if (mode === 'lines') {
        result = reverseLines(text);
      }
      output.textContent = result;
    } catch (err) {
      output.textContent = `❌ Error: ${err.message}`;
    }
  }

  // Run on button click
  reverseBtn.onclick = performReverse;

  // Auto-run on input change
  input.addEventListener('input', performReverse);

  // Initial run for sample text
  performReverse();
}