import { toUpperCase, toLowerCase } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>📋 JSON Formatter</h3>
    <textarea id="input" rows="6" placeholder='{"name":"test","value":123}' style="width:100%;"></textarea>
    <div style="margin:0.5rem 0;">
      <button id="prettyBtn">Pretty Print</button>
      <button id="minifyBtn">Minify</button>
    </div>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;white-space:pre-wrap;"></div>
  `;

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');
  const prettyBtn = container.querySelector('#prettyBtn');
  const minifyBtn = container.querySelector('#minifyBtn');

  const process = (minify = false) => {
    try {
      const parsed = JSON.parse(input.value);
      output.textContent = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
    } catch (err) {
      output.textContent = `❌ Invalid JSON: ${err.message}`;
    }
  };

  prettyBtn.onclick = () => process(false);
  minifyBtn.onclick = () => process(true);
}