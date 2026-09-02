import { findReplace } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>🔍 Find & Replace</h3>
    <textarea id="input" rows="4" placeholder="Enter text..." style="width:100%;"></textarea>
    <div style="margin:0.5rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
      <input id="findInput" placeholder="Find..." style="flex:1;min-width:100px;" />
      <input id="replaceInput" placeholder="Replace..." style="flex:1;min-width:100px;" />
      <label><input type="checkbox" id="regexCheck" /> Regex</label>
      <button id="replaceBtn">Replace All</button>
    </div>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;white-space:pre-wrap;"></div>
  `;

  const input = container.querySelector('#input');
  const findInput = container.querySelector('#findInput');
  const replaceInput = container.querySelector('#replaceInput');
  const regexCheck = container.querySelector('#regexCheck');
  const replaceBtn = container.querySelector('#replaceBtn');
  const output = container.querySelector('#output');

  replaceBtn.onclick = () => {
    const result = findReplace(input.value, findInput.value, replaceInput.value, regexCheck.checked);
    output.textContent = result;
  };
}